import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import axios from 'axios'

const Navbar = () => {
  const navigate = useNavigate();
  const {user,setUser} = useContext(AppContext)
  // console.log(import.meta.env.VITE_BACKEND_URL)
  const handleLogout = ()=>{
    localStorage.removeItem("token")
    toast.success("Logout Successfully")
    navigate("/login")
    setUser(null)
  }

  const checkAuth = async () =>{
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/checkAuth`, {
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    const data = await res.data
    if(data.success === true){
      setUser(data.data)
    }
  }

  useEffect(()=>{
    checkAuth()
  },[])


  return (
    <div className='bg-primary flex p-5 flex-col md:flex-row justify-between items-center'>
        <div className='flex gap-3'>
          <img src={user?.profile} alt={user?.name} width={30} height={30} className={`rounded-full shadow-inner ${user?.profile?"block":"hidden"}`} />
        <Link to={'/'} className='text-3xl font-concertOne text-white'>Tinder-Clone</Link>
        </div>
        {
          !user?.name?
          <ul className='flex gap-3 text-white font-ropaSans text-2xl'>
          <li className='hover:underline cursor-pointer transition-all duration-300'>About</li>
          <li className='hover:underline cursor-pointer transition-all duration-300'>Download</li>
          <li className='hover:underline cursor-pointer transition-all duration-300'>Privacy</li>
      </ul>
      :
      <ul className='flex gap-3 text-white font-ropaSans text-2xl'>
      <Link to="/profile" className='hover:underline cursor-pointer transition-all duration-300'>New</Link>
      <Link to="/profile/chats" className='hover:underline cursor-pointer transition-all duration-300'>Chats</Link>
      <Link className='hover:underline cursor-pointer transition-all duration-300'>Friends</Link>
  </ul>
        }

        {
          !user?.name?
          <Link to="/login" className='font-ropaSans text-2xl text-black px-5 py-1 rounded-full bg-white hover:bg-black hover:text-white transition-all duration-300 ease-in-out'>Log In</Link>
          :
          <button onClick={handleLogout} className='font-ropaSans text-2xl text-black px-5 py-1 rounded-full bg-white hover:bg-black hover:text-white transition-all duration-300 ease-in-out'>Log Out</button>
        }


    </div>
  )
}

export default Navbar