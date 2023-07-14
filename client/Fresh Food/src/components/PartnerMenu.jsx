import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../Context/OrdersAdmincontext';
import { Icon } from '@iconify/react';
import Footer from './Footer'

const PartnerMenu = () => {

    const GlobalTotal = useContext(AdminContext);
    const Menu = GlobalTotal.Menu.dishes;
 
  return (
        <div className='flex flex-col h-screen w-screen items-center gap-[70px]'>
    <div className='flex mt-5 p-5 flex-col items-center justify-center text-center'>
        <h1 className='md:text-3xl text-lg text-black font-bold'>Welcome to <span className='text-red-600'>{GlobalTotal.Menu.venuename}</span></h1>
        <p className='font-semibold'>Our goal is to serve and deliver fresh food</p>
    </div>
    <div className='w-screen h-[100vh] flex flex-wrap flex-grow justify-evenly p-4'>

    {  Menu.map((dish)=>(<div className="hover:shadow-2xl md:w-[20vw] w-[47vw] h-[58vh] flex justify-evenly flex-col shadow-xl rounded-xl bg-slate-30 p-2">
      <div className="h-[25vh] ">
        <img  src={dish.image} alt={dish.dishname} className='h-full w-full rounded object-cover'/>
      </div>
      <div className="w-15vw flex items-center px-3 w-30vw h-[5vh]">
        <h2 className="md:text-base text-xl w-full whitespace-wrap font-bold" id="heading">
          {dish.dishname}
        </h2>
      </div>
      <div className="text-gray-600 flex items-center w-15vw h-5vh px-3 w-30vw text-sm" id="description">
      <p className='w-full h-full whitespace-wrap'>{dish.description && dish.description.slice(0,30)}...</p>
      </div>
      <div className="flex justify-between px-3 gap-5  h-[5vh] items-center">
        <div className="w-max bg-green-300 rounded-2xl capitalize p-1 font-medium text-sm text-green-700">
          {dish.cuisine}
        </div>
        <div id="price" className="md:text-xl w-max text-base font-semibold">
          <p>Rs {dish.price}</p>
        </div>
      </div>
      <div className="flex justify-between px-3 gap-5 h-[5vh] items-center">
        <div className="flex items-center gap-1">
          <Icon icon="radix-icons:timer" color="red" height="3.5vh" />
          <p className="md:text-base text-base font-semibold">{dish.duration}min</p>
        </div>
      </div>
    </div>))
    
    }
   </div>   
   <Footer/>
    </div>
  )
  
}

export default PartnerMenu