import React from 'react'
import { Icon } from '@iconify/react';


const Couponcard = (props) => {
    const {code, offer} = props;
  return (
    <div className='bg-blue-700 flex flex-col justify-center items-center md:w-max w-[80vw] h-max gap-1 p-3 rounded shadow'>
        <div className='flex gap-1 justify-center items-center'>
            <span><Icon className='text-white h-6 w-6' icon="bxs:offer" /></span>
            <h1 className='text-white font-bold text-xl md:text-2xl uppercase'>{code}</h1>
        </div>
        <div >
            <p className='text-white text-center font-normal text-sm'>{offer}</p>
        </div>
    </div>
  )
}

export default Couponcard