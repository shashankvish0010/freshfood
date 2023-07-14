import React from 'react'
import { Icon } from '@iconify/react'


const Admincustomercard = (props) => {
    const { firstname, lastname, email, contact, address } = props;
    return (
        <div className='w-[100vw] cursor-pointer h-max flex md:flex-row flex-col justify-evenly p-3 items-center'>
            <div className='h-max w-[30vw] flex flex-row justify-start gap-4 items-center'>
                <Icon icon="iconamoon:profile-fill" height='6vh' color='red' />
                <div className='h-max w-max'>
                    <p className=' text-base font-semibold'>{firstname} {lastname}</p>
                </div>
            </div>
            <div className='h-max w-[30vw] flex flex-col gap-2 p-3 justify-center items-start'>

                <div className='h-max w-max flex flex-row items-center justify-start gap-2'>
                <Icon icon="ic:outline-email" color='darkviolet' height='6vh' />
                    <p className='text-gray-600'>{email}</p>
                </div>
                <div className='h-max w-max flex flex-row items-center justify-start gap-2'>
                <Icon icon="bi:phone" color='darkorange' height='6vh' />
                    <p className='text-gray-600'>{contact}</p>
                </div>
            </div>
            <div className='h-max w-[33vw] flex flex-row justify-start items-center'>
                <div className='h-max w-max p-3 flex flex-row items-center gap-2'>
                <Icon icon="material-symbols:home-outline" color='lightgreen' height='6vh' />
                    <p className='text-gray-600'>{address}</p>
                </div>
            </div>
        </div>
    )
}

export default Admincustomercard