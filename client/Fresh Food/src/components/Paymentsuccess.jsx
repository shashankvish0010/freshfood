import { React, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Icon } from '@iconify/react';


const Paymentsuccess = () => {

  const searchquery = useSearchParams()[0];
  const referenceno = searchquery.get('reference');
  
  const giveOrder = async () =>{
    try {
      const response = await fetch('https://freshfood-backend.onrender.com/sendorder', {
        method : 'PUT',
        headers : {
          'Content-Type' : 'application/json'
        },
        body :JSON.stringify({
referenceno
        })
      });
      if(response){
        const data = await response.json();
        console.log(data);
      }else{
        console.log("data not");
      }
    } catch (error) {
      console.log(error);
    }
  }

 useEffect(()=>{giveOrder()});

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <div>
        <div className='h-max flex flex-col w-max'>
          <Icon icon="ep:success-filled" color='green' height='[1vh]' />
        </div>
        <div className='text-center'>
          <p className='text-base font-semibold'>Order Successfull.</p>
          <p className='text-base'>
            Refrence No :  {referenceno}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Paymentsuccess