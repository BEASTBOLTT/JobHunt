import React, { useRef, useState, useEffect } from 'react'
import { useInterview } from '../hooks/useinterview'
import { useNavigate } from 'react-router'

const Home = () => {

    const { loading, generateReport, reports, getReports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    useEffect(() => {
        getReports()
    }, [])

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }


    if (loading) {
        return (
            <div className='w-full min-h-screen flex justify-center items-center'>
                <p className='text-white text-lg'>Generating Report...</p>
            </div>
        )
    }




    return (
        <main className='w-full min-h-screen flex flex-col justify-center items-center gap-6'>

            {/* Page Heading */}
            <div className='text-center mt-4'>
                <h1 className='text-4xl font-bold text-white'>Generate Your Interview Report</h1>
                <p className='text-gray-400 mt-2 text-sm'>Paste a job description, upload your resume and let AI do the rest</p>
            </div>

            {/* Form Card */}
            <div className='flex justify-center items-stretch gap-0 border border-white/10 rounded-xl bg-[#161b24] p-6 w-full max-w-5xl min-h-[65vh]'>

                {/* Left Column - Job Description */}
                <div className='self-stretch w-1/2 flex flex-col gap-3 pr-6'>
                    <label htmlFor='jobDescription'>Job Description</label>
                    <textarea onChange={(e) => { setJobDescription(e.target.value) }} className='h-full w-full border border-white/10 outline-0 px-4 py-3 rounded-lg bg-[#1a1f27] resize-none' name='jobDescription' id='jobDescription' placeholder='Enter job description here'></textarea>
                </div>

                {/* Vertical Divider */}
                <div className='border-l border-white/10'></div>

                {/* Right Column */}
                <div className='flex flex-col gap-4 w-1/2 justify-self-start self-stretch pl-6'>

                    {/* Resume Upload */}
                    <div className='flex flex-col gap-2'>
                        <p>Resume <small className='text-[#d20d3b]'>(Use resume and self description for best results)</small></p>
                        <label className='flex flex-col items-center justify-center p-6 border border-dashed border-white/20 bg-[#1a1f27] text-gray-400 rounded-lg cursor-pointer hover:border-white/40 transition-colors' htmlFor='resume'>
                            <span className='text-xl mb-1'>↑</span>
                            <span>Upload Resume</span>
                        </label>
                        <input ref={resumeInputRef} hidden type='file' name='resume' id='resume' accept='.pdf' />
                    </div>

                    {/* Self Description */}
                    <div className='h-full flex flex-col gap-2'>
                        <label htmlFor='selfDescription'>Self Description</label>
                        <textarea onChange={(e) => { setSelfDescription(e.target.value) }} className='h-full w-full border border-white/10 outline-0 px-4 py-3 rounded-lg bg-[#1a1f27] resize-none' name='selfDescription' id='selfDescription' placeholder='Describe Yourself'></textarea>
                    </div>

                    {/* Submit Button */}
                    <button onClick={handleGenerateReport} className='border-0 bg-blue-300 rounded-2xl p-2 w-full mt-3 transition-transform active:scale-90 hover:bg-red-500'>Generate Interview Report</button>

                </div>

            </div>

            {/* Previous Reports */}
            <div className='min-w-150 mt-4 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Previous Reports</h2>
                <div className='flex flex-col gap-3'>
                    {reports && reports.length > 0 ? reports.map((report) => (
                        <div key={report._id} onClick={() => navigate(`/interview/${report._id}`)} className='p-4 border border-white/10 rounded-lg bg-[#1a1f27] cursor-pointer hover:bg-[#222831] transition-colors flex justify-between items-center'>
                            <p className='text-white font-medium'>{report.title}</p>
                            <p className='text-gray-400 text-sm'>{new Date(report.createdAt).toLocaleDateString()}</p>
                        </div>
                    )) : (
                        <p className='text-gray-400 text-sm'>No previous reports found.</p>
                    )}
                </div>
            </div>

        </main>
    )
}

export default Home
