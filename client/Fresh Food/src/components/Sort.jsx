import React, { useContext } from 'react'
import { Icon } from '@iconify/react'
import { Popup } from '../Context/Popupcontext';
import {MenuContext} from '../Context/Menucontext';

const Sort = () => {

    const PopupGlobal = useContext(Popup);
    const dispatchpop = PopupGlobal.dispatch;
    const showSort = PopupGlobal.showSort;

    const MenuGlobal = useContext(MenuContext);
    const items = MenuGlobal.items;
    const dispatchMenu = MenuGlobal.dispatch;
    const caller = MenuGlobal.caller;

    const HandleClicks = (title) =>{
      dispatchMenu({type : title, payload : items});
      caller({trigger : title});
      dispatchpop({type : 'CLOSE'})
    }

  return (
    <div className='flex justify-center items-center w-screen h-[100vh]'>
        <div className='h-max w-[80vw] md:w-[35vw] gap-3 opacity-100 text-black bg-white rounded text-base font-semibold flex flex-col justify-evenly p-5'>
            <span onClick={()=>dispatchpop({type : 'CLOSE', payload : items })} className='cursor-pointer ml-[95%]'><Icon icon="mdi:remove-box" color='red' height='5vh'/></span>
            <span className='hover:text-red-600 cursor-pointer
            ' onClick={()=>HandleClicks('NEW') }>New</span>
            <span className='hover:text-red-600 cursor-pointer
            ' onClick={()=>HandleClicks('SPECIAL') }>Today's Special</span>
            <span className='hover:text-red-600 cursor-pointer
            ' onClick={()=>HandleClicks('BESTSELLING') }>Best Selling</span>
            <span className='hover:text-red-600 cursor-pointer
            ' onClick={()=>HandleClicks('POPULAR') }>Popularity</span>
            <span className='hover:text-red-600 cursor-pointer
            ' onClick={()=>HandleClicks('TIME')}>Takes less time</span>
            <span>Price</span><span className='hover:text-red-600 cursor-pointer
            ' onClick={()=>HandleClicks('LOWTOHIGH') } >Low to High</span>
            <span className='hover:text-red-600 cursor-pointer
            ' onClick={()=>HandleClicks('HIGHTOLOW') } >High to Low</span>
        </div>
    </div>
  )
}

export default Sort