
import { RouterProvider } from 'react-router'
import { router } from './app.routes.jsx'


function App() {
  

  return (
    <div className='bg-gray-900 h-screen w-screen text-white'>
      <RouterProvider router = {router} />
    </div>
  )
}

export default App
