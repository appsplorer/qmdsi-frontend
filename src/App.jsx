import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navigation from './components/Navigation'
import { Outlet } from 'react-router'

export default function App() {
  return (
    <div className='bg-blue'>
      <Navigation />
      <Outlet />
    </div>
  )
}