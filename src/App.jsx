import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/user/Signup'
import Login from './pages/user/Login'
import Error from './pages/error/Error'
import NotFound from './pages/error/NotFound'

function App() {

  return (
    <>
    <Navbar/>
    <hr />    
        <h3>RIDEROUTE</h3>
        <br />


        <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          






          {/* //Error Routes */}
          <Route path="/error" element={<Error/>}/>
          <Route path='*' element={<NotFound/>}/>

        </Routes>
      
    </>
  )
}

export default App
