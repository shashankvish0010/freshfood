import React from 'react'
import { Icon } from '@iconify/react'

const Notfound = () => {
  return (
    <div className='h-max w-screen flex justify-center items-center'>
        <div className='flex md:flex-row justify-center items-center flex-col'>
        <Icon icon="ic:baseline-no-food" color='red' height='8vh' />
        <p className='text-base font-semibold text-black'>Not found...</p>
        </div>
    </div>
  )
}

export default Notfound