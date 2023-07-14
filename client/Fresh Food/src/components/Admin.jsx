import React, { Component, useState, useEffect } from 'react'
import Cards from './Cards'
import Loading from './Loading'
import Unauth from './Unauth'
import Footer from './Footer'

  const Admin = () => {

    const [authenticated, setAuthenticated] = useState({authentication : ""})
    const [admin, setAdmin] = useState({data : ""});

    const sendCookie = async () => {
         
      try {
       
        const response = await fetch('/admin-panel', {
          method : 'GET',
          headers: {
            'Accept' : 'appliaction/json',
            'Content-Type': 'application/json'
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          console.log('key recieved');
         
          setAuthenticated({
            authentication : data.key,
          });

          setAdmin({
            data : data.admin
          })
        
        } else {
          console.log('Cookie not sent');
        }
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(()=>{
      sendCookie();
    },[])

    
    const {authentication} = authenticated;
    const {data} = admin;

  if(authentication === "")
  {
    return(
      <Loading/>
    )
  }
  if(authentication === true){
    return (
      <div className='flex flex-col h-screen w-screen items-center gap-[70px]'>
       <div className='flex mt-5 p-5 flex-col items-center justify-center text-center'>
           <h1 className='md:text-3xl text-lg text-black font-bold'>Welcome <span className='text-red-600'>{data.firstname}</span>, to admin panel</h1>
           <p className='font-semibold'>Our goal is to serve and deliver fresh food</p>
       </div>
       <div className='flex flex-wrap justify-evenly gap-4 w-screen md:px-3'>
      
         <Cards 
          icon="mdi:cart-discount" title='Promotions & Discounts' description='Create coupon codes.' calltoaction='Create' perform='/create-coupon'/>
         <Cards 
         icon="icon-park-outline:transaction-order"  title='Order Management' description='Live order details' calltoaction='Manage' perform='/track-order'/>
         <Cards 
         icon="ic:outline-analytics"  title='Performance & Analytics' description='Check the sales and performance of restraunts' calltoaction='Lets Check' perform='/report'/>
       </div>
       <Footer/>
       </div>
     )
  }
  else if(authentication === false)
  {
    return(
      <Unauth/>
    )
  }
}

export  default  Admin;


   



