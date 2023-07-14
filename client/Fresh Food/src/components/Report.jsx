import { React, useEffect, useContext } from 'react'
import { Icon } from '@iconify/react'
import { AdminContext } from '../Context/OrdersAdmincontext';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer'

const Report = () => {

    const GlobalTotal = useContext(AdminContext);
    const navigate = useNavigate();
    useEffect(() => {
        GlobalTotal.dispatch({ type: 'TOTAL' });
    }, []);

    const orders = GlobalTotal.TotalOrders;
    const options = {  maximumFractionDigits: 2   }   
    const balance =  Intl.NumberFormat("en-US",options).format(GlobalTotal.Balance); 
    const totalcustomers = GlobalTotal.TotalCustomers;
    const activecustomers = GlobalTotal.ActiveCustomers;
    console.log(totalcustomers, activecustomers);
    const inactivecustomers = totalcustomers.length - activecustomers.length;
    const totalpartners = GlobalTotal.Partners;
    const conversionrate = (activecustomers.length/totalcustomers.length)*100;

    return (
        <div className='h-screen w-screen flex flex-col gap-5 p-2 items-center'>
            <div className='flex h-max w-screen md:flex-row flex-col mt-4 gap-5 justify-evenly items-center'>
                <div className='flex shadow-xl cursor-pointer rounded flex-row items-center h-max w-max p-2 gap-2'>
                    <Icon height='10vh' icon="flat-color-icons:sales-performance" />
                    <div className='h-max w-max flex flex-col'>
                        <p className='text-sm flex items-center gap-1 font-semibold w-max text-gray-500'>Total Revenue</p>
                        <p className=' text-xl font-semibold'>Rs.{balance}</p>
                    </div>
                </div>
                <div onClick={()=>navigate('/track-order')} className='flex cursor-pointer shadow-xl rounded flex-row items-center h-max w-max p-2 gap-2'>
                    <Icon height='10vh' color='orange' icon="icon-park-outline:sales-report" />
                    <div className='h-max w-max flex flex-col'>
                        <p className='text-sm flex items-center gap-1 font-semibold w-max text-gray-500'>Total Sales</p>
                        <p className=' text-xl font-semibold'>{orders.length}</p>
                    </div>

                </div>
                <div onClick={()=>navigate('/total-customers')} className='flex cursor-pointer shadow-xl rounded flex-row items-center h-max w-max p-2 gap-2'>
                    <Icon height='10vh' color='green' icon="material-symbols:person-outline" />
                    <div className='h-max w-max flex flex-col'>
                        <p className='text-sm flex items-center gap-1 font-semibold w-max text-gray-500'>Total Customers</p>
                        <p className=' text-xl font-semibold'>{totalcustomers.length}</p>
                    </div>

                </div>
                <div onClick={()=>navigate('/total-partners')} className='flex cursor-pointer shadow-xl rounded flex-row items-center h-max w-max p-2 gap-2'>
                    <Icon height='10vh' color='red' icon="ion:restaurant" />
                    <div className='h-max w-max flex flex-col'>
                        <p className='text-sm flex items-center gap-1 font-semibold w-max text-gray-500'>Food Partners</p>
                        <p className=' text-xl font-semibold'>{totalpartners.length}</p>
                    </div>

                </div>
            </div>
            <div className='flex h-max w-screen md:flex-row gap-5 p-2 flex-col cursor-pointer items-center justify-evenly'>
                <div className='flex shadow-xl rounded md:flex-row flex-col items-center justify-evenly h-max w-max p-2 gap-10'>
                <div className='h-max w-max flex md:flex-row flex-col gap-3 items-center'>
                <Icon icon="raphael:piechart" color='violet' height='23vh'/>
                <div className='h-max w-max flex flex-col'>
                        <p className='text-sm flex items-center gap-1 font-semibold w-max text-gray-500'>Conversion Rate</p>
                        <p className=' text-2xl font-semibold'>{conversionrate}%</p>
                </div>
                </div>
                <div className='h-max w-max flex md:flex-row flex-col items-center justify-evenly'>
                    <div className='flex flex-row gap-3 p-2 items-center justify-center'>
                    <Icon icon="carbon:intent-request-active" height='10vh' color='lightgreen'/>
                    <div className='h-max w-max flex flex-col'>
                        <p className='text-sm flex items-center gap-1 font-semibold w-max text-gray-500'>Active Customers</p>
                        <p className=' text-2xl font-semibold'>{activecustomers.length}</p>
                </div>
                    </div>
                    <div className='flex flex-row gap-3 p-2 items-center justify-center'>
                    <Icon icon="carbon:intent-request-inactive" height='10vh' color='darkorange'/>
                    <div className='h-max w-max flex flex-col'>
                        <p className='text-sm flex items-center gap-1 font-semibold w-max text-gray-500'>Inactive Customers</p>
                        <p className=' text-2xl font-semibold'>{inactivecustomers}</p>
                </div>
                    </div>
                </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Report