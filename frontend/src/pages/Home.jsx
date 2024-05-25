import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div className='flex flex-col h-[80vh] gap-8 items-center justify-center'>
      <h1 className='text-4xl md:text-8xl font-concertOne text-white'>Try Something Epic ...</h1>
      <Link to={'/signup'} className='bg-primary font-ropaSans text-xl text-white px-3 py-2 rounded-full hover:bg-primaryLight transition-all duration-300 ease-in-out'>Please Create Account</Link>
    </div>
  )
}

export default Home