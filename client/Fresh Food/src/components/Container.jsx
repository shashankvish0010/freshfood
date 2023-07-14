import React, { useContext, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Cart from './Cart';
import { context } from '../Context/Cartcontext';
import {useNavigate} from 'react-router-dom';
const Container = (props) => {

  const globalstate = useContext(context);
  const dispatch = globalstate.dispatch;
  const state = globalstate.state;
  
  const navigate = useNavigate();

  const AddNow = () =>{

    console.log("document.cookie");
    if(document.cookie){
      dispatch({type:"ADD", payload:item});
    }
    else{
    navigate('/login');
    }
  }

  
  const {image, dishname, description, cuisine, price, duration,quantity, id} = props
  const item = {image, dishname,description,quantity, price, id};
  return (
    <div className="hover:shadow-2xl md:w-[20vw] w-[47vw] h-[58vh] flex justify-evenly flex-col shadow-xl rounded-xl bg-slate-30 p-2">
      <div className="h-[25vh] ">
        <img  src={image} alt={dishname} className='h-full w-full rounded object-cover'/>
      </div>
      <div className="w-15vw flex items-center px-3 w-30vw h-[5vh]">
        <h2 className="md:text-base text-xl w-full whitespace-wrap font-bold" id="heading">
          {dishname}
        </h2>
      </div>
      <div className="text-gray-600 flex items-center w-15vw h-5vh px-3 w-30vw text-sm" id="description">
      <p className='w-full h-full whitespace-wrap'>{description && description.slice(0,30)}...</p>
      </div>
      <div className="flex justify-between px-3 gap-5  h-[5vh] items-center">
        <div className="w-max bg-green-300 rounded-2xl capitalize p-1 font-medium text-sm text-green-700">
          {cuisine}
        </div>
        <div id="price" className="md:text-xl w-max text-base font-semibold">
          <p>Rs {price}</p>
        </div>
      </div>
      <div className="flex justify-between px-3 gap-5 h-[5vh] items-center">
        <div className="flex items-center gap-1">
          <Icon icon="radix-icons:timer" color="red" height="3.5vh" />
          <p className="md:text-base text-base font-semibold">{duration}min</p>
        </div>
        <div>
          <button onClick={()=>AddNow()} className="bg-red-600 rounded font-semibold p-1 text-white">Add</button>
        </div>
      </div>
    </div>
  );
};

export default Container;