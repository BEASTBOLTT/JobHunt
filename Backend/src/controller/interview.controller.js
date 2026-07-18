const pdfParse = require("pdf-parse")
const {generateInterviewReport, generateResumePdf} = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")


/**
 * @description generate new interview report on the basis of user's self description, resume pdf and job description
 * @access private
 */
async function generateInterviewReportController(req, res) {
    

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const {selfDescription, jobDescription} = req.body

    const interviewReportByAI = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })
    if (interviewReportByAI.skillGaps) {
        const VALID_SEVERITIES = ['low', 'medium', 'high']
        interviewReportByAI.skillGaps = interviewReportByAI.skillGaps.map(gap => {
            const normalized = gap.severity.toLowerCase()
            return {
                ...gap,
                severity: VALID_SEVERITIES.includes(normalized) ? normalized : 'medium'
            }
        })
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


/**
 * @description get interview report by interviewId
 * @access private
 */
async function getInterviewReportByIdController(req, res) {
    const {interviewId} = req.params

    const interviewReport = await interviewReportModel.findOne({_id: interviewId, user: req.user.id})

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview Report Not Found"
        })
    }

    res.status(200).json({
        message: "Interview Report Found",
        interviewReport
    })
}


/**
 * @description get all interview reports of the user
 * @access private
 */
async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({user: req.user.id}).sort({createdAt: -1}).select("-resume -selfDescription -jobDescription -_v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview Reports Found",
        interviewReports
    })
}


/**
 * @description generate resume pdf on the basis of user's self description, resume pdf and job description
 * @access private
 */
async function generateResumePdfController(req, res) {
    const {interviewReportId} = req.params
    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview Report Not Found"
        })
    }

    const {resume, selfDescription, jobDescription} = interviewReport

    const pdfBuffer = await generateResumePdf({resume, selfDescription, jobDescription})

    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=resume_${interviewReportId}.pdf`,
    })
    res.send(pdfBuffer)
}


module.exports = {generateInterviewReportController,
getInterviewReportByIdController,
getAllInterviewReportsController,
generateResumePdfController
}