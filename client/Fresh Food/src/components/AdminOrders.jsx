import React, { useContext,useEffect } from 'react'
import { AdminContext } from '../Context/OrdersAdmincontext'
import Footer from './Footer'
import { Icon } from '@iconify/react';
import PartnerOrderCard from './PartnerOrderCard';
const AdminOrders = () => {

    const GlobalTotal = useContext(AdminContext);

    useEffect(()=>{
        GlobalTotal.dispatch({type : 'TOTAL'});
    },[]);

    const orders = GlobalTotal.TotalOrders;
    const options = {  maximumFractionDigits: 2   }   
    const balance =  Intl.NumberFormat("en-US",options).format(GlobalTotal.Balance); 

    return (
        <div className='w-screen h-screen flex flex-col gap-10 p-4 items-center'>
            <div className='h-max w-screen flex md:flex-row gap-5 flex-col justify-around items-center'>
                <div className='flex flex-col h-max w-max items-start justify-evenly gap-3'>
                    <h1 className='md:text-2xl text-red-600 text-base font-bold'>Fresh Food</h1>
                </div>
                <div className='w-max h-max flex flex-row justify-evenly items-center gap-5'>
                    <div className='flex items-center gap-2 h-max w-max'>
                        <div className='bg-lime-400 rounded h-max w-max p-1'><Icon height='5vh' color='white' icon="ph:bowl-food-bold" /></div>
                        <div className='h-max w-max flex flex-col'>
                            <p className='text-sm flex items-center gap-1 font-semibold w-max text-gray-500'>Food Delivered</p>
                            <p className='text-base font-semibold'>{orders.length}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2 h-max w-max'>
                        <div className='bg-fuchsia-500 rounded h-max w-max p-1'><Icon height='5vh' color='white' icon="ic:round-account-balance" /></div>
                        <div className='h-max w-max flex flex-col'>
                            <p className='text-sm flex items-center gap-1 w-max text-gray-500 font-semibold'>Total Revenue</p>
                            <p className='text-base font-semibold'>Rs.{balance}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-max w-max flex flex-col gap-5 p-3'>
                <div className='h-max w-screen flex justify-center items-center'>
                    <h1 className='text-xl font-semibold h-max'>Orders</h1>
                </div>
                <div className="h-max w-screen flex flex-col p-3 gap-4">
          {orders.map((order) => (
            <PartnerOrderCard 
            id = {order._id}
            firstname={order.customer.name}
            order = {order.dishname}
            quantity={order.quantity}
            date = {order.date}
            time = {order.orderTime}
            price={order.price}
            state = {order.state} />
          ) )}
        </div>
            </div>
            <Footer/>
            </div>
            )

}

export default AdminOrders