import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { AppContext } from '../context/AppContext'
import {IoHeartSharp} from 'react-icons/io5'
import {IoClose} from 'react-icons/io5'

  const Profile = () => {
  const [users, setUsers] = useState([])
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const {user} = useContext(AppContext)
  
  const getUsers = async ()=>{
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getUsers`)
    const {data} = await res.data
    console.log(data)
    const filteredUsers = data.filter(
      (u)=>u._id !== user?._id &&
       !user?.disliked?.includes(u._id) &&
       !user?.favourites?.includes(u._id)
    ); 
    setUsers(filteredUsers);
  }

  const nextProfile = () => currentUserIndex < users.length - 1 && setCurrentUserIndex(currentUserIndex + 1);


    const addToFav = async (id) => {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/addTofav/` + id,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.data;
      
      if (data.success === true) {
        toast.success(data.message);
        nextProfile();
      } else {
          toast.error(data.message);
        }
    };
    const addToDis = async (id) => {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/addTodis/` + id,
        
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.data;
      if (data.success === true) {
        nextProfile();
      } else {
        toast.error(data.message);
      }
    };

  useEffect(()=>{
    getUsers()
  },[user])
  return (
    <div className='flex justify-center items-center my-10 sm:my-32 '>
      <div className='w-[75vw] h-[80vw] sm:h-[60vh] sm:w-[25vw] rounded-lg shadow-primaryLight shadow-sm overflow-hidden relative'>
              <img src={users[currentUserIndex]?.profile} alt={users[currentUserIndex]?.profile} className='w-full h-full object-cover object-top rounded-lg transition-all duration-300 hover:scale-105 ease-in-out cursor-pointer' />
              <div className=' p-4 absolute bottom-0 left-0 right-0  bg-gradient-to-t from-black to-transparent'>
                <h1 className='text-white text-2xl font-semibold'>{users[currentUserIndex]?.name}</h1>
                <p className='text-white font-semibold'>{users[currentUserIndex]?.email}</p>
                <div className='flex items-center justify-between  mt-2'>

                <div className="bg-gray-800 rounded-full overflow-hidden hover:bg-red-500 p-2 transition-all duration-300 ease-in-out cursor-pointer">
                <IoClose
                  onClick={() => addToDis(users[currentUserIndex]?._id)}
                  className="text-red-500 text-3xl hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer hover:text-white"
                />
              </div>
              <div className="bg-gray-800 rounded-full overflow-hidden hover:bg-blue-500 p-2 transition-all duration-300 ease-in-out cursor-pointer">
                <IoHeartSharp
                  onClick={() => addToFav(users[currentUserIndex]?._id)}
                  className="text-blue-500 text-3xl hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer hover:text-white"
                />
              </div>
                  
                  </div>
              </div>
      </div>
    </div>
  )
}

export default Profile