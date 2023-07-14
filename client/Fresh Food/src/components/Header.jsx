import React, { useContext , useEffect} from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import '../App.css'
import { context } from '../Context/Cartcontext'

const Header = () => {

  const globalstate = useContext(context);
  const state = globalstate.state;
  const dispatch = globalstate.dispatch;

  return (

    <div className='bg-red-600 w-screen'>
      <nav className=' flex justify-between items-center flex-wrap p-8 text-white'>
        <div>
          <h1 className='md:text-4xl text-2xl font-bold'><Link to='/'>Fresh Food</Link></h1>
        </div>

        <ul className='flex gap-2 items-center'>
          <Link className='md:block hidden' to='/'>Home</Link>
          <Link to='/cart' className='flex flex-col items-end'>
          
           <p >{state.length}</p>
            <Icon icon="ion:cart" height='5vh' />
          </Link>

          {
   
            document.cookie ? 
            <Link to='/profile'>
              <Icon className='cursor-pointer' icon="gg:profile" height='5vh' />
              </Link>
        :
          <Link to='/register'>
            <button className='bg-white text-red-600 rounded-md p-1.5 font-semibold'>LogIn/SignUp</button></Link>
   
          }
        </ul>
      </nav>
    </div>

  )
}

export default Header