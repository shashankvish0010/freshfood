import React, { useContext, useEffect, useState } from 'react'
import Container from './Container'
import { PartnerDetails } from '../Context/Partnercontext'
import {Icon} from '@iconify/react'
import Dishedit from './Dishedit'
import Footer from './Footer'

const Editdish = () => {
  
  const [dishes, setDishes] = useState([]);
  const getData = async () =>{
    try {
      const response = await fetch('https://freshfood-backend.onrender.com/partneradmin', {
        method : "GET",
        headers : {
          "Accept" : "application/json",
          "Content-Type" : "application/json"
        }
      })

      if(response){
        const data = await response.json();
        console.log("Data recieved",data );
        const user = data.admin;
        setDishes(
         (user.dishes)
        )
        
       
      }
      else{
        console.log("Data not recieved");
      }
    } catch (error) {
      console.log(error);
    }

}
useEffect(()=>{
getData();
},[])


  const[info, setinfo] = useState();
  const[showEdit, setShow] = useState(false);

  const showEditor = (item) =>{
     setShow(!showEdit)
     console.log(item);
     setinfo(item)
    }
    
  return (
    <div className='h-screen w-screen flex flex-col gap-5'>
     <div className='flex mt-5 p-5 flex-col items-center justify-center text-center'>
        <h1 className='md:text-3xl text-lg text-black font-bold'>Welcome <span className='text-red-600'></span>, to admin panel</h1>
        <p className='font-semibold'>Our goal is to serve and deliver fresh food</p>
    </div>
    <div className='h-screen w-screen flex justify-evenly md:gap-5 gap-2 flex-wrap'>
    { dishes.map((item)=>{
      
   return(
      <div className='h-max w-max flex rounded flex-col flex-wrap'>
      <span className='ml-auto cursor-pointer px-2'><Icon onClick={()=>showEditor(item)} icon="bx:edit" height='3vh' color='red'/></span>
     <Container
            id={item._id}
            image={item.image}
            dishname={item.dishname}
            description={item.description}
            cuisine={item.cuisine}
            price={item.price}
            quantity = {item.quantity}
            duration={item.duration}
            tag={item.tag}
          />
        </div>
   )
    })
    }
    </div>
    {showEdit && <Dishedit item={info}/>}
    <Footer/>
    </div>
  )
}

  


export default Editdish