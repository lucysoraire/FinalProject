import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import ContactPage from './pages/ContactPage/ContactPage'
import LoginPage from './pages/LoginPage/LoginPage'
import AdminPage from './pages/AdminPage/AdminPage'
import ShiftsPage from './pages/ShiftsPage/ShiftsPage'
import AboutPage from './pages/AboutPage/AboutPage'
import NavBar from './components/NavBar/NavBar'

function App() {

  return (
    <div className='app'>
<NavBar></NavBar>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/contacto' element={<ContactPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/turno' element={<ShiftsPage />} />
        <Route path='/about' element={<AboutPage />} />
      </Routes>
    </div>
  )
}

export default App
