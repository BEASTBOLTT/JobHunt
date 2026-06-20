
import { RouterProvider } from 'react-router'
import { router } from './app.routes.jsx'
import { AuthProvider } from './features/auth/auth.context.jsx'


function App() {
  

  return (
    <AuthProvider>
      <div className='bg-gray-900 h-screen w-screen text-white'>
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
    
  )
}

export default App
