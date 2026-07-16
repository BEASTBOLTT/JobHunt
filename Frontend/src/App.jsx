
import { RouterProvider } from 'react-router'
import { router } from './app.routes.jsx'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { InterviewProvider } from './features/interview/interview.context.jsx'


function App() {
  

  return (
    <AuthProvider>
      <InterviewProvider>
        <div className='bg-gray-900 min-h-screen w-screen text-white'>
          <RouterProvider router={router} />
        </div>
      </InterviewProvider>
    </AuthProvider>
    
  )
}

export default App
