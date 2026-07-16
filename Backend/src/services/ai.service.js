const { GoogleGenAI, Type } = require('@google/genai');
const { z } = require('zod');

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
});

const geminiResponseSchema = {
    type: Type.OBJECT,
    required: ["title", "matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"], // ← add this
    properties: {
        title: { type: Type.STRING },
        matchScore: { type: Type.INTEGER },
        technicalQuestions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                required: ["question", "intention", "answer"],
                properties: {
                    question: { type: Type.STRING },
                    intention: { type: Type.STRING },
                    answer: { type: Type.STRING }
                }
            }
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                required: ["question", "intention", "answer"],
                properties: {
                    question: { type: Type.STRING },
                    intention: { type: Type.STRING },
                    answer: { type: Type.STRING }
                }
            }
        },
        skillGaps: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                required: ["skill", "severity"], // ← add this
                properties: {
                    skill: { type: Type.STRING },
                    severity: { type: Type.STRING }
                }
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                required: ["day", "focus", "tasks"],
                properties: {
                    day: { type: Type.INTEGER },
                    focus: { type: Type.STRING },
                    tasks: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
            }
        },
        title: { type: Type.STRING }
    }
};

async function generateInterviewReport({resume,selfDescription,jobDescription}) {

    const prompt = `Generate a comprehensive interview report for a candidate with the following details:
                    Resume: ${resume},
                    Self Description: ${selfDescription},
                    Job Description: ${jobDescription},

                    Requirements:
                    - Generate AT LEAST 10 technical questions relevant to the job description and candidate's background.
                    - Generate AT LEAST 10 behavioral questions that assess soft skills and cultural fit.
                    - Generate a preparation plan of AT LEAST 7 days, one day per entry, each with a clear focus and actionable tasks.
                    - For each question provide the interviewer's intention and a detailed model answer.
                    `

    const response = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            responseSchema:geminiResponseSchema 
        }
    })

    
    return JSON.parse(response.text);
}

module.exports = generateInterviewReport;