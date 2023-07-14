import React from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Cards = (props) => {

  const{image, title, description,calltoaction,icon, perform} = props;
  return (
    <div className='bg-blue-700 md:w-[200px] max-h-fit rounded-lg p-6 flex flex-col gap-4 items-center shadow-xl hover:shadow-2xl cursor-pointer'>
     <Icon icon={icon} color='white' height='7vh'/>
      <div className='md:text-2xl w-[190px] text-xl font-bold text-white text-center'>
        <h1>{title}</h1>
      </div>
      <p className='text-white w-[190px] text-center font-semibold'>{description}</p>
      <div>
        <Link to={perform}><button className='bg-white text-blue-600 rounded-sm p-1 text-sm font-semibold cursor-pointer hover:shadow-lg'>{calltoaction}</button></Link>
      </div>
    </div>
  )
}

export default Cards