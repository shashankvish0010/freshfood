import React, { useState, useEffect, useContext, createContext } from 'react'
import Container from './Container';
import Cart from './Cart';
import { MenuContext } from '../Context/Menucontext';
import Footer from './Footer';


const Menusection = (props) => {
    const { heading } = props;

    const globalMenu = useContext(MenuContext);
   
    
    useEffect(()=>{globalMenu.dispatch({type:'GET'})},[])
    const items = globalMenu.items;
    const state = globalMenu.state;
    useEffect(()=>console.log(state),[])
    

    return (
      
            <div className='w-screen h-max gap-4'>
            
  
            <div className='capitalize text-black px-5 font-semibold md:text-2xl text-xl'>
                {heading}
            </div>
           
            <div className='h-max w-screen flex flex-wrap justify-evenly md:gap-5'>
                {items.map((item)=>{
                  item.quantity=1
                    return (
                  
          <Container
            id={item._id}
            image={item.image}
            dishname={item.dishname}
            description={item.description}
            cuisine={item.cuisine}
            price={item.price}
            quantity = {item.quantity}
            duration={item.duration}
          />
        );          
                })}
                </div>
               
                <footer className='mt-10 bottom-0 h-max'>
            <Footer />
          </footer>
            </div>

        
    )
}

export default Menusection
