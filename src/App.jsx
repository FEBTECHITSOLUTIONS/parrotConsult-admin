import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './components/global/NavBar'
import './App.css'
const App = () => {
  return (
    <div className='flex min-h-screen'>
      <nav className='md:relative absolute'>
        <NavBar />
      </nav>
      <main className='flex-1 bg-amber-200/10 p-5 overflow-y-scroll max-h-screen '>
        <Outlet />
      </main>
    </div>
  )
}

export default App
