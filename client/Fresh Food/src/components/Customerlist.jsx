import React, { useContext, useEffect } from 'react'
import { OrderContext } from '../Context/OrderMangecontext'
import Customers from './Customers';
import Footer from './Footer'

const Customerlist = () => {

    const OrderGlobal = useContext(OrderContext);
    useEffect(()=>OrderGlobal.dispatch({type:'GETORDER'}),[])
    const customers =[];
    const array = OrderGlobal.orders;
    
    
  for (let i = 0; i < array.length; i++) {
    const customer = {
      name: array[i].customer.name,
      email: array[i].customer.email,
      contact: array[i].customer.contact,
    };

    let duplicate = false;

    for (let j = 0; j < customers.length; j++) {
      if (customers[j].contact === customer.contact) {
        duplicate = true;
        break;
      }
    }

    if (duplicate = false) {
      customers.push(customer);
    }
  }

  return (
    <div className='flex flex-col w-screen h-screen p-4 gap-5'>
     <div className='h-max w-screen flex justify center items-center'>
        <h1 className='text-xl font-semibold'>Customer <span className='text-red-600 text-xl font-semibold'>List</span></h1>
     </div>
     <div className='h-max w-screen flex flex-col items-center'>
     {array.map((customer) => (

        <Customers
          firstname={customer.customer.name}
          email={customer.customer.email}
          contact={customer.customer.contact}
        />
      ))}
    </div>
    <Footer/>
    </div>
  )
}

export default Customerlist