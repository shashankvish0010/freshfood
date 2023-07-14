import React, { useState, useEffect, useContext, createContext } from 'react'
import Container from './Container';
import Cart from './Cart';
import { MenuContext } from '../Context/Menucontext';
import Notfound from './Notfound';


const Sortedmenu = (props) => {
  const { heading } = props;

  const globalMenu = useContext(MenuContext);



  const items = globalMenu.state;
  console.log(items);




  return (

    <div className='w-screen h-max gap-4'>


      <div className='capitalize text-black px-5 font-semibold md:text-2xl text-xl'>
        {heading}
      </div>

      <div className='h-max w-screen flex flex-wrap justify-evenly md:gap-5'>

        {items.length === 0 ? <Notfound /> : items.map((item) => {
          item.quantity = 1
          return (

            <Container
              id={item._id}
              image={item.image}
              dishname={item.dishname}
              description={item.description}
              cuisine={item.cuisine}
              price={item.price}
              quantity={item.quantity}
              time="20"
            />
          );
        })}
      </div>


    </div>


  )
}

export default Sortedmenu
