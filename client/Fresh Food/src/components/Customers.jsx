import React from 'react'
import { Icon } from '@iconify/react';

const Customers = (props) => {
    const{firstname,email,contact} = props;
  return (
    <div className='h-max w-max flex md:flex-row flex-col md:justify-evenly shadow-2xl items-center gap-4 p-3'>
       <div className='flex md:flex-row flex-col md:justify-evenly items-center '>
       <div className='flex flex-row gap-1 p-3 items-center'>
        <Icon icon="iconoir:profile-circle" height='4vh' color='red' />
        <p className='text-lg font-semibold text-gray-600'>{firstname} </p>
      </div>
      <div className='flex flex-row gap-1 p-3 items-center'>
        <Icon icon="ic:outline-email" height='4vh' color='red' />
        <p className='text-lg font-semibold text-gray-600'>{email} </p>
      </div>
      <div className='flex flex-row gap-1 p-3 items-center'>
        <Icon icon="bi:phone" height='4vh' color='red' />
        <p className='text-lg font-semibold text-gray-600'>{contact} </p>
      </div>
       </div>
    </div>
  )
}

export default Customers