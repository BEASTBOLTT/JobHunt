
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

const Register = () => {

    const { loading, handleRegister } = useAuth()
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({username, email, password})
        navigate("/")
    }

    if (loading) {
        return (<main>Loading.......</main>)
    }



  return (
      <main>
          <div className='h-screen flex flex-col justify-center items-center'>
              <div className='border rounded-2xl w-[35vw]'>
                  <h1 className='ml-11 text-4xl mt-10'>Register</h1>
                  <form className='m-10 mt-5 mb-3 flex flex-col' onSubmit={handleSubmit}>
                      <div className='m-1 flex flex-col'>
                          <label className='m-1' htmlFor="username">Username</label>
                          <input onChange={(e) => { setUsername(e.target.value) }} className="bg-white border rounded-xl text-gray-500 p-2
                        text-xs font-bold" type="text" id="username" name="username" placeholder='Enter Username' />
                      </div>
                      <div className='m-1 flex flex-col'>
                          <label className='m-1' htmlFor="email">Email</label>
                          <input onChange={(e) => { setEmail(e.target.value) }} className="bg-white border rounded-xl text-gray-500 p-2
                        text-xs font-bold" type="email" id="email" name="email" placeholder='Enter Email Address' />
                      </div>
                      <div className='m-1 flex flex-col'>
                          <label className='m-1' htmlFor="password">Password</label>
                          <input onChange={(e) => { setPassword(e.target.value) }} className="bg-white border rounded-xl text-gray-500  p-2
                           text-xs font-bold"  type="password" id="password" name="password" placeholder='Enter Password' />
                      </div>
                      <button type='submit' className='border-0 bg-blue-300 rounded-2xl p-2 w-full mb-5 mt-3 transition-transform active:scale-90 hover:bg-red-500'>Register</button>
                  </form>

                  <p className='m-12 mt-4'>Already have an account ? <Link to={"/login"} className='font-bold text-blue-300 hover:text-red-500'>Login</Link></p>
              </div>
          </div>
      </main>
  )
}

export default Register
