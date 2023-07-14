import React from 'react'


const Unauth = () => {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
    <div className='bg-red-600 shadow-2xl p-5 flex flex-col justify-center items-center rounded'>
    <div>
    <h1 className='md:text-4xl text-2xl font-bold text-white'>Fresh Food</h1>
    </div>
    <div>
    <p className='md:text-xl font-semibold text-white'>You are unauthorized to access this page</p>
    </div>
    </div>
    </div>
  )
}

export default Unauth