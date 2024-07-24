import React from 'react'
import { Link } from 'react-router-dom'

const ErorrPage = () => {
  return (
    <div className='w-100 min-h-[100vh] flex flex-col items-center justify-center' >
        <h1 className='text-9xl text-white'>404</h1>
        <h2 className='text-5xl text-secondary'>Page Not Found</h2>
        <Link to="/" className='p-4 px-8 mt-5 bg-primary rounded-sm hover:bg-secondary'>Back to Homepage</Link>
    </div>
  )
}

export default ErorrPage