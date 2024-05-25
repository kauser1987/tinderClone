import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { io } from "socket.io-client";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Chats from './pages/Chats';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AppContextProvider } from './context/AppContext';
import ProtectedRoute from './components/ProtectedRoute';
const server = io(`${import.meta.env.VITE_BACKEND_URL}`)

const App = () => {
  return (
    <>
    
    <AppContextProvider>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/profile' element={
       <ProtectedRoute>
       <Profile/>
       </ProtectedRoute>}/>
      <Route path='/profile/chats' element={<ProtectedRoute>
                  <Chats />
                </ProtectedRoute>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </AppContextProvider>
    </>
  )
}

export default App
