import React, { useState, useEffect } from 'react'
import Ordercard from './Ordercard';
import Footer from './Footer'


const CustomerOrder = () => {
    const [orderList, setorderList] = useState([]);
    const getOrder = async () =>{
       try {
        const response = await fetch('/getorders', {
            method : "GET",
            headers : {
                "Content-Type" : "appliaction/json"
            }
        });

        if(response){
            const data = await response.json();
             setorderList(data.orders);
        }else{
            console.log("Data not received");
        }
       } catch (error) {
        console.log(error);
       }
    }

    useEffect(()=>{
        getOrder()
    },[])

    console.log(orderList); 

  return (
    <div className='h-screen w-screen flex flex-col p-5 gap-4 items-evenly'>
        <div className='w-screen flex justify-center h-max p-3'>
            <h1 className='text-xl font-bold text-red-600'>Order List</h1>
        </div>
        <div className='flex flex-col p-4 gap-4 justify-center items-center w-screen h-max'>
   
        {  orderList.map((dish)=>{
          const {dishname,
    description,
    price,
    quantity} = dish;
    return (
    <Ordercard dishname={dishname}
    description={description && description.slice(0,25)}
    price={price}
    quantity={quantity}
    status={dish.status} />
    )
        })}
        </div>
        <Footer/>
    </div>
  )
}

export default CustomerOrder