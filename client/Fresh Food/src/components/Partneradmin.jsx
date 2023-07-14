import React, { useContext, useEffect, useState } from 'react'
import Cards from './Cards'
import Unauth from './Unauth'
import Loading from './Loading'
import Footer from './Footer'


const Partneradmin = () => {

  const [authentication, setauthentication] = useState({
        authenticated : ""
      })
  
  const [admin, setadmin] = useState({data : ""})

  const getData = async () =>{
        try {
          const response = await fetch('/partneradmin', {
            method : "GET",
            headers : {
              "Accept" : "application/json",
              "Content-Type" : "application/json"
            }
          })

          if(response){
            const data = await response.json();
            // console.log("Data recieved",data );
            setauthentication({
              authenticated : data.key
            })
            setadmin({
             data : data.admin
            })
            
           
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

 const {data} = admin;
 const {authenticated} = authentication;
  
  if(authenticated === "")
  {
  return(
        <Loading/>
      )
  }
  else if(authenticated === true){
  return (
        <div className='flex flex-col h-screen w-screen items-center gap-[70px]'>
    <div className='flex mt-5 p-5 flex-col items-center justify-center text-center'>
        <h1 className='md:text-3xl text-lg text-black font-bold'>Welcome <span className='text-red-600'>{data.firstname}</span>, to admin panel</h1>
        <p className='font-semibold'>Our goal is to serve and deliver fresh food</p>
    </div>
    <div className='flex flex-wrap justify-evenly gap-4 w-screen md:px-3'>
      <Cards icon="pajamas:food" title='Add dishes' description='Add food items' calltoaction='Add' perform='/adddish'/>
      <Cards icon="lucide:tag"   title='Edit dishes' description='Add tags and edit food items' calltoaction='Add' perform='/editdish'/>
       <Cards  icon="icon-park-outline:transaction-order"  title='Manage Orders' description='Manage orders' calltoaction='Manage' perform='/manageorders'/>
        <Cards  icon="carbon:user-data" title='Customer data' description='List of cutomers' calltoaction='Lets Check' perform='/customerlist'/>
    </div>
    <Footer/>
    </div>
  )
  }
  else if(authenticated === false)
  {
    return(
      <Unauth/>
    )
  }
  
}

export default Partneradmin