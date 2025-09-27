import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './components/global/NavBar'
import './App.css'
import { GrNext } from 'react-icons/gr'
const App = () => {

  const [open, setOpen] = useState(false);


  const handleNavbar = ()=>{
    setOpen(!open)
  }

  const admin = JSON.parse(localStorage.getItem('admin'))
  console.log(admin);
  
  return (
    <div className='flex min-h-screen'>
      <div className={`md:hidden absolute -left-1.5 top-10 z-50 bg-emerald-800 rounded-md shadow-2xl shadow-black cursor-pointer ${open ? 'hidden' : 'block'} ${admin ? 'block' : 'hidden'} cursor-pointer`} >
        <button
          className="py-2  text-white"
          onClick={handleNavbar}
          aria-label="Toggle menu"
        >
          <GrNext size={24} />
        </button>
      </div>
      
        <NavBar  open={open} handleNavbar={handleNavbar} admin={admin} />
    
      <main className='flex-1 bg-amber-200/10  px-1 py-5 md:p-5 overflow-y-scroll max-h-screen '>
        <Outlet />
      </main>
    </div>
  )
}

export default App
