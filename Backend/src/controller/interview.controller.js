const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")



async function generateInterviewReportController(req, res) {
    

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const {selfDescription, jobDescription} = req.body

    const interviewReportByAI = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })
    if (interviewReportByAI.skillGaps) {
        interviewReportByAI.skillGaps = interviewReportByAI.skillGaps.map(gap => ({
            ...gap,
            severity: gap.severity.toLowerCase()
        }))
    }

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAI
    })

    res.status(201).json({
        message:"Interview Report Generated Successfully",
        interviewReport
    })
}



module.exports = {generateInterviewReportController}