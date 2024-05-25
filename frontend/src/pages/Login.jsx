import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
const Login = () => {
 const navigate = useNavigate();
const {setUser, setProgress} = useContext(AppContext);  

  const handleLogin =async (e)=>{
    e.preventDefault()
    setProgress(0)
    const email = e.target.email.value;
    const password = e.target.password.value;
    if(!email || !password){
      toast.error("All fields required")
    }
    if(!email.includes("@")||!email.includes(".")){
      toast.error("invalid email")
    }
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`,
      {email, password});
      const data = await res.data
      setUser(data.data)
      localStorage.setItem("token",data.token)
      setProgress(100)
      if(data.success===true){
        toast.success(data.message)
        e.target.reset()
        navigate("/profile")
      }else{
        toast.error(data.message)
      }
        };
  return (
    <div className='flex flex-col items-center justify-center my-32'>
      <h4 className='font-bold text-3xl text-white'>Login</h4>
      <form onSubmit={handleLogin}>
        <div className='flex flex-col gap-5 mt-5'>
          <label htmlFor="email" className='text-white'>Email</label>
          <input type="email" name="email" id="email" className='p-2 border text-black border-gray-700 rounded-md' required />
          
        </div>
        <div className='flex flex-col gap-5 mt-5'>
          <label htmlFor="password" className='text-white'>Password</label>
          <input type="password" name="password" id="password" className='p-2 text-black border border-gray-700 rounded-md' required />
        </div>
        <div className='flex gap-8 justify-between items-center mt-5'>
          <button type='submit' className='p-2 bg-primary text-white rounded-md'>Login</button>
        </div>
        <Link to="/signup" className='text-primary text-sm '>Don't have an account? Sign up</Link> 
      </form>
      
    </div>
  )
}

export default Login