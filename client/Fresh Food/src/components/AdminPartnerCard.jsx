import { React, useContext } from 'react'
import { Icon } from '@iconify/react'
import { AdminContext } from '../Context/OrdersAdmincontext';
import { useNavigate } from 'react-router-dom';


const AdminPartnerCard = (props) => {

    const navigate = useNavigate();

    const { venuename, firstname, lastname, email, contact, address, dishes, orders } = props;
    const GlobalTotal = useContext(AdminContext);

    const handleMenu = () => {
        const Menu = {
            venuename, firstname, lastname, email, contact, address, dishes, orders
        }
        GlobalTotal.dispatch({ type: 'MENU', payload: Menu });
        navigate('/partnermenu')
    }

    return (
        <div onClick={() => handleMenu()}  className='w-screen cursor-pointer h-max flex md:flex-row flex-col gap-5 shadow md:justify-evenly justify-center p-3 items-center'>
            <div className='h-max md:w-[15vw] w-[70vw] flex flex-row md:justify-start justify-center gap-4 items-center'>
                <Icon icon="ri:restaurant-2-fill" height='6vh' color='red' />
                <div className='h-max w-max'>
                    <p className=' text-base font-semibold'>{venuename}</p>
                    <p className='text-sm w-max flex items-center gap-1 text-gray-500'><Icon height='4vh' icon="ic:baseline-verified" color='blue' />Verified Account</p>
                </div>
            </div>
            <div className='h-max md:w-[22vw] w-[70vw] flex flex-row md:justify-start justify-center gap-4 items-center'>
                <Icon icon="iconamoon:profile-fill" height='4vh' color='red' />

                <p className=' md:text-base text-sm font-semibold'>{firstname} {lastname}</p>

            </div>
            <div className='h-max  md:w-[24vw] w-[70vw] flex flex-wrap flex-col gap-2 p-3 justify-center items-start'>

                <div className='h-max w-max flex flex-row items-center justify-start gap-2'>
                    <Icon icon="ic:outline-email" color='darkviolet' height='4vh' />
                    <p className='text-gray-600'>{email}</p>
                </div>
                <div className='h-max w-max flex flex-wrap flex-row items-center justify-start gap-2'>
                    <Icon icon="bi:phone" color='darkorange' height='4vh' />
                    <p className='text-gray-600'>{contact}</p>
                </div>
            </div>
            <div className='h-max  md:w-[10vw] w-[70vw] flex flex-col gap-2 p-3 justify-center items-start'>

                <div className='h-max w-max flex flex-row items-center justify-start gap-2'>
                    <Icon icon="bxs:dish" color='darkviolet' height='4vh' />
                    <p className='text-gray-600'>Dishes : {dishes.length}</p>
                </div>
                <div className='h-max w-max flex flex-row items-center justify-start gap-2'>
                    <Icon icon="icon-park-outline:transaction-order" color='darkorange' height='4vh' />
                    <p className='text-gray-600 h-max w-max'>Orders : {orders.length}</p>
                </div>
            </div>
            <div className='h-max  md:w-[33vw] w-[70vw] flex flex-wrap flex-row justify-start items-center'>
                <div className='h-max w-max p-3 flex flex-row items-center gap-2'>
                    <Icon icon="material-symbols:home-outline" color='lime' height='6vh' />
                    <p className='text-gray-600 p-3'>{address}</p>
                </div>
            </div>
        </div>
    )
}

export default AdminPartnerCard