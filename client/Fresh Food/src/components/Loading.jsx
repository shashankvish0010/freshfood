import React from 'react'
import {Icon} from '@iconify/react'
const Loading = () => {
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
        <div>
           
            <Icon icon="line-md:loading-loop" color="red" height='10vh'/>
            <p className='text-black font-semibold '>Loading...</p>
        </div>
    </div>
  )
}

export default Loading