import { useState, useEffect } from 'react'

const Loader = ({ message = "Loading..." }) => {
    const [showWakeup, setShowWakeup] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setShowWakeup(true), 5000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className='w-full min-h-screen flex flex-col justify-center items-center gap-4 bg-gray-900'>
            {/* Spinner */}
            <div className='w-12 h-12 border-4 border-white/10 border-t-blue-300 rounded-full animate-spin'></div>

            {/* Primary message */}
            <p className='text-white text-sm font-medium tracking-wide'>{message}</p>

            {/* Delayed wakeup message — appears after 5s */}
            {showWakeup && (
                <p className='text-gray-400 text-xs text-center max-w-xs px-4 leading-relaxed'>
                    This is taking longer than usual — the server might be waking up from sleep. Hang tight!
                </p>
            )}
        </div>
    )
}

export default Loader
