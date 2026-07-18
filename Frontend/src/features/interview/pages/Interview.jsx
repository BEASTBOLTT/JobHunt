import React, { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useinterview'
import { useParams, useNavigate } from 'react-router'

// ── Mock Data ─────────────────────────────────────────────────────────────────
const mockReport = {
    matchScore: 85,
    technicalQuestions: [
        {
            question: 'How do you optimize the performance of a React application, especially for complex UIs with large datasets?',
            intention: "To assess the candidate's practical experience with frontend performance optimization techniques and understanding of React's rendering lifecycle.",
            answer: 'Expected answers would include using React.memo, useCallback, useMemo to prevent unnecessary re-renders. Discussing lazy loading, code splitting, virtualization for large lists, optimizing state management with Redux Toolkit, and identifying performance bottlenecks using React DevTools.'
        },
        {
            question: 'Describe your approach to designing a scalable and secure RESTful API for a real-time collaboration tool. What considerations would you make for authentication and real-time updates?',
            intention: 'To evaluate API design principles, security implementation, scalability considerations, and understanding of real-time technologies for the backend (Node.js/Express.js).',
            answer: 'Expected answers would cover resource-based API design, versioning, using JWT for authentication and authorization. For real-time updates, mention WebSockets alongside REST for data integrity. Discuss input validation, rate limiting, error handling, and database selection.'
        },
        {
            question: "You've deployed a Node.js application, and users report intermittent slow responses. How would you diagnose and troubleshoot this issue across your full stack?",
            intention: 'To assess practical troubleshooting skills, understanding of common performance bottlenecks, and ability to debug across frontend, backend, and database layers.',
            answer: 'Expected answers would detail checking frontend performance, monitoring backend logs, profiling Node.js processes, analyzing database query performance, checking network latency, and infrastructure monitoring.'
        },
        {
            question: "While your resume doesn't explicitly mention it, have you had any exposure to deploying applications on cloud platforms like AWS or GCP? Which services would you use for a MERN stack application?",
            intention: "To probe for experience or theoretical knowledge in cloud deployment, which is a key aspect of building cloud-native platforms as mentioned in the job description.",
            answer: 'Expected answers should mention services like EC2/ECS/Lambda for hosting Node.js, RDS or DocumentDB for databases, S3 for static assets, Load Balancers, and CI/CD services like AWS CodePipeline or GitHub Actions.'
        }
    ],
    behavioralQuestions: [
        {
            question: "Tell me about a time you had to deliver a feature under a tight deadline. How did you manage your time and prioritize tasks to ensure successful delivery?",
            intention: 'To assess time management, prioritization skills, ability to work in a fast-paced environment, and ownership mindset.',
            answer: 'Expected answers would use the STAR method, detailing the situation, tasks involved, actions taken (e.g., breaking down tasks, delegating, communicating roadblocks early), and the positive result.'
        },
        {
            question: 'Describe a situation where you disagreed with a team member or a product decision. How did you handle it, and what was the outcome?',
            intention: 'To evaluate communication skills, ability to collaborate respectfully, conflict resolution, and focus on team goals in an Agile environment.',
            answer: "Expected answers would show professional communication, active listening, presenting a reasoned argument, willingness to compromise, and prioritizing the project's success over personal opinions."
        },
        {
            question: 'The job involves working in a consulting environment. Describe a situation where you had to adapt quickly to a new technology, project, or client requirement. How did you approach it?',
            intention: 'To assess adaptability, continuous learning attitude, and ability to handle diverse client-facing scenarios which are common in consulting.',
            answer: 'Expected answers would highlight a situation where they learned a new skill or adapted to a change, explaining their learning process, problem-solving approach, and how they successfully integrated the new requirement.'
        }
    ],
    skillGaps: [
        { skill: 'Years of experience (2+ vs 3-5 required)', severity: 'medium' },
        { skill: 'Cloud platforms (AWS / Azure / GCP)', severity: 'medium' },
        { skill: 'Microservices architecture', severity: 'low' },
        { skill: 'Docker & containerization', severity: 'low' },
        { skill: 'Consulting environment experience', severity: 'low' },
        { skill: 'In-depth CI/CD pipeline contribution', severity: 'low' }
    ],
    preparationPlan: [
        {
            day: 1,
            focus: 'React Performance & Advanced State Management',
            tasks: [
                'Review React.memo, useCallback, useMemo concepts and practical applications.',
                'Practice implementing lazy loading and code splitting for components and routes.',
                'Explore advanced Redux Toolkit features like RTK Query for data fetching and caching.',
                'Solve HackerRank/LeetCode problems involving optimal data structure usage in React.'
            ]
        },
        {
            day: 2,
            focus: 'Backend Scalability & Security',
            tasks: [
                'Study best practices for Node.js application performance (event loop, clustering, worker threads).',
                'Deep dive into API security: OAuth 2.0, OpenID Connect, input validation, rate limiting.',
                'Review database indexing strategies for both MongoDB and PostgreSQL.',
                'Design a simplified microservices architecture for a common use case.'
            ]
        },
        {
            day: 3,
            focus: 'Cloud Fundamentals (AWS/GCP) & DevOps',
            tasks: [
                'Learn core AWS/GCP services for MERN stack deployment (EC2, RDS, S3, Load Balancers).',
                'Understand basic Docker and containerization concepts; containerize a simple Node.js app.',
                'Review CI/CD pipeline concepts and how they integrate with cloud platforms.',
                'Watch tutorials on deploying a sample MERN stack application to a cloud provider.'
            ]
        },
        {
            day: 4,
            focus: 'System Design & Problem Solving',
            tasks: [
                'Practice whiteboarding system design problems, focusing on scalability and security.',
                'Review common design patterns in software development.',
                'Work on 2-3 medium-difficulty algorithm problems on LeetCode/HackerRank.',
                'Simulate discussing a technical challenge with a team.'
            ]
        },
        {
            day: 5,
            focus: 'Behavioral & Communication Refinement',
            tasks: [
                'Prepare detailed STAR method answers for common behavioral questions.',
                'Practice explaining complex technical concepts in simple terms.',
                'Research the company and prepare questions to ask the interviewer.',
                'Conduct a mock interview focusing on both technical depth and clear communication.'
            ]
        }
    ]
}

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions' },
    { id: 'behavioral', label: 'Behavioral Questions' },
    { id: 'roadmap', label: 'Road Map' },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => (
    <div className='border border-white/10 rounded-lg bg-[#1a1f27] p-4 flex flex-col gap-3'>

        <p className='text-sm font-semibold text-white leading-relaxed m-0'>
            <span className='text-blue-300 mr-1'>Q{index + 1}:</span>
            {item.question}
        </p>

        <div className='flex flex-col gap-1'>
            <p className='text-sm text-gray-300 leading-relaxed m-0'>
                <span className='text-blue-300 font-semibold'>Intent: </span>
                {item.intention}
            </p>
        </div>

        <div className='flex flex-col gap-1'>
            <p className='text-sm text-gray-300 leading-relaxed m-0'>
                <span className='text-blue-300 font-semibold'>Answer: </span>
                {item.answer}
            </p>
        </div>

    </div>
)

const RoadMapDay = ({ day }) => (
    <div className='flex flex-col gap-2 pb-6 pl-14 relative'>

        {/* Timeline dot */}
        <div className='absolute left-6.5 top-1 w-3.5 h-3.5 rounded-full border-2 border-blue-300 bg-[#161b22]'></div>

        <div className='flex items-center gap-2'>
            <span className='text-xs font-bold text-blue-300 bg-blue-300/10 border border-blue-300/25 rounded-full px-2.5 py-0.5'>
                Day {day.day}
            </span>
            <h3 className='text-sm font-semibold text-white m-0'>{day.focus}</h3>
        </div>

        <ul className='flex flex-col gap-1.5 list-none m-0 p-0'>
            {day.tasks.map((task, i) => (
                <li key={i} className='flex items-start gap-2 text-sm text-gray-400 leading-relaxed'>
                    <span className='shrink-0 w-1.5 h-1.5 rounded-full bg-gray-500 mt-2'></span>
                    {task}
                </li>
            ))}
        </ul>

    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { report, getReportById, loading, generateResume } = useInterview()
    const { interviewId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [interviewId])


    if(loading || !report){
        return (
            <div className='w-full min-h-screen flex justify-center items-center'>
                <p className='text-white text-lg'>Loading Report...</p>
            </div>
        )
    }

    const scoreColor = report.matchScore >= 80 ? 'text-green-400' : report.matchScore >= 60 ? 'text-yellow-400' : 'text-red-400'

    return (
        <main className='w-full min-h-screen flex flex-col justify-center items-center gap-6 p-6'>

            {/* Page Heading */}
            <div className='text-center flex flex-col items-center gap-3'>
                <h1 className='text-4xl font-bold text-white'>Interview Report</h1>
                <p className='text-gray-400 text-sm m-0'>Review your AI-generated insights below</p>
                {/* Match Score Pill */}
                <span className={`border border-white/20 rounded-full px-5 py-1.5 text-sm font-semibold ${scoreColor}`}>
                    Match Score: <span className='text-white font-bold'>{report.matchScore}%</span>
                </span>
            </div>

            {/* 3-Column Card */}
            <div className='flex items-stretch w-full max-w-6xl border border-white/10 rounded-xl bg-[#161b22] min-h-[70vh]'>

                {/* Left Nav */}
                <nav className='w-52 shrink-0 flex flex-col justify-between p-4 gap-1'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-xs font-semibold uppercase tracking-widest text-gray-500 px-3 mb-2'>Sections</p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveNav(item.id)}
                                className={`text-left w-full px-3 py-2.5 rounded-lg text-sm cursor-pointer border-0 transition-colors flex flex-col gap-0.5
                                    ${activeNav === item.id
                                        ? 'border-l-2 border-blue-300 bg-[#1a1f27] text-white rounded-l-none'
                                        : 'bg-transparent text-gray-400 hover:bg-[#1a1f27] hover:text-white'
                                    }`}
                            >
                                <span className={activeNav === item.id ? 'font-semibold' : ''}>{item.label}</span>
                                {activeNav === item.id && (
                                    <span className='text-xs text-blue-300 font-semibold uppercase tracking-wider'>Active</span>
                                )}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => generateResume({interviewReportId: interviewId})} className='border-0 bg-blue-300 rounded-2xl p-2 w-full transition-transform active:scale-90 hover:bg-red-500 text-sm font-medium flex items-center justify-center gap-2'>Download AI Resume
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <g fill="none">
                                <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                                <path fill="currentColor" d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM19 2a1 1 0 0 1 .898.56l.048.117l.35 1.026l1.027.35a1 1 0 0 1 .118 1.845l-.118.048l-1.026.35l-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117l-.35-1.026l-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048l1.026-.35l.35-1.027A1 1 0 0 1 19 2" />
                            </g>
                        </svg>

                    </button>
                </nav>

                {/* Vertical Divider */}
                <div className='w-px bg-white/10 shrink-0'></div>

                {/* Center Content */}
                <div className='flex-1 p-6 overflow-y-auto max-h-[70vh] no-scrollbar'>

                    {activeNav === 'technical' && (
                        <section>
                            <div className='flex items-baseline gap-3 mb-6 pb-4 border-b border-white/10'>
                                <h2 className='text-lg font-bold text-white m-0'>Technical Questions</h2>
                                <span className='text-xs text-gray-400 bg-[#1a1f27] border border-white/10 px-3 py-0.5 rounded-full'>{report.technicalQuestions.length} questions</span>
                            </div>
                            <div className='flex flex-col gap-3'>
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className='flex items-baseline gap-3 mb-6 pb-4 border-b border-white/10'>
                                <h2 className='text-lg font-bold text-white m-0'>Behavioral Questions</h2>
                                <span className='text-xs text-gray-400 bg-[#1a1f27] border border-white/10 px-3 py-0.5 rounded-full'>{report.behavioralQuestions.length} questions</span>
                            </div>
                            <div className='flex flex-col gap-3'>
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className='flex items-baseline gap-3 mb-6 pb-4 border-b border-white/10'>
                                <h2 className='text-lg font-bold text-white m-0'>Preparation Road Map</h2>
                                <span className='text-xs text-gray-400 bg-[#1a1f27] border border-white/10 px-3 py-0.5 rounded-full'>{report.preparationPlan.length}-day plan</span>
                            </div>
                            <div className='flex flex-col relative'>
                                {/* Timeline vertical line */}
                                <div className='absolute left-8.25 top-0 bottom-0 w-0.5 bg-blue-300/20'></div>
                                {report.preparationPlan.map(day => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}

                </div>

                {/* Vertical Divider */}
                <div className='w-px bg-white/10 shrink-0'></div>

                {/* Right Sidebar — Skill Gaps */}
                <aside className='w-56 shrink-0 flex flex-col gap-4 p-5'>

                    <p className='text-xs font-semibold uppercase tracking-widest text-gray-500 m-0'>Skill Gaps</p>

                    <div className='flex flex-wrap gap-2'>
                        {report.skillGaps.map((gap, i) => (
                            <span
                                key={i}
                                className={`text-xs font-medium px-3 py-1 rounded-full border ${gap.severity === 'high' ? 'text-red-400 bg-red-500/10 border-red-500/25' :
                                        gap.severity === 'medium' ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/25' :
                                            'text-green-400 bg-green-500/10 border-green-500/25'
                                    }`}
                            >
                                {gap.skill}
                            </span>
                        ))}
                    </div>

                    {/* Legend */}
                    <div className='flex flex-col gap-1.5 mt-1'>
                        <div className='flex items-center gap-2'>
                            <span className='w-2 h-2 rounded-full bg-red-400 shrink-0'></span>
                            <span className='text-xs text-gray-400'>High</span>
                            <span className='w-2 h-2 rounded-full bg-yellow-400 shrink-0 ml-2'></span>
                            <span className='text-xs text-gray-400'>Medium</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='w-2 h-2 rounded-full bg-green-400 shrink-0'></span>
                            <span className='text-xs text-gray-400'>Low</span>
                        </div>
                    </div>

                </aside>

            </div>

        </main>
    )
}

export default Interview
