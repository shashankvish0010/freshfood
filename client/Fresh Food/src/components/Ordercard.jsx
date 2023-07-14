import React from 'react'

const Ordercard = (props) => {
    const {dishname,
    description,
    price,
    quantity,
    status} = props
  return (
    <div className='flex flex-row w-screen justify-evenly gap-3 p-2 h-max items-center shadow-2xl'>
       <span className="md:w-15vw flex items-center px-3 w-30vw text-base font-semibold  h-[5vh]">{dishname}</span>
       <span className="text-gray-600 flex items-center md:w-15vw h-5vh px-3 w-30vw text-sm">{description}</span>
       <span className=" w-max text-base md:w-15vw w-20vw">Rs.{price}</span>
       <span className=" text-base md:w-15vw w-20vw">Qty. {quantity}</span>
       <span className='text-base uppercase text-green-500 font-semibold md:w-15vw w-20vw'>{status}</span>
    </div>
  )
}

export default Ordercard