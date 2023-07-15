import { Link } from 'react-router-dom'
import {Icon} from '@iconify/react'

const Footer = () => {
  return (
   
    <div className='bg-slate-50 w-screen h-max flex flex-col mt-[100%] gap-5 py-3 items-center'>
        <div className='flex md:flex-row flex-wrap w-screen h-max justify-evenly gap-5 items-center'>
        <div className='h-max w-max'>
        <Link to='/'><h1 className='md:text-2xl text-xl font-bold text-red-600'>Fresh Food</h1></Link>
        </div>
          {/* <div className='flex h-max w-max flex-row flex-wrap justify-evenly gap-10'> */}
          <div className='flex flex-col h-max w-max items-start gap-1'>
                <Link className='text-black capitalize font-medium text-base text-center'>For Employees</Link>
                <Link className='text-gray-700 text-sm hover:font-semibold' to='/admin-register'>Register</Link>
                <Link className='text-gray-700 text-sm hover:font-semibold' to='/admin-login'>Login</Link>
                </div>
                <div className='flex flex-col h-max w-max items-start gap-1'>
                <Link className='text-black capitalize font-medium text-base text-center'>For Food Partners</Link>
                <Link className='text-gray-700 text-sm hover:font-semibold' to='/partner-register'>Become a Partner</Link>
                <Link className='text-gray-700 text-sm hover:font-semibold' to='/partner-login'>Login</Link>
                </div>
                <div className='flex flex-col h-max w-max items-start gap-1'>
                <Link className='text-black capitalize font-medium text-base text-center'>About Fresh Food</Link>
                <Link className='text-gray-700 text-sm hover:font-semibold' to='/about'>About Project</Link>
                <Link className='text-gray-700 text-sm hover:font-semibold' to='/contact'>Contact</Link>
                </div>
                </div>
        {/* </div> */}
        <div className='w-max h-max flex flex-row items-center gap-6'>
        <a href='https://github.com/shashankvish'><Icon className='shadow-xl cursor-pointer hover:shadow-2xl' height='4vh' icon="mdi:github" /></a>
        <a href='https://www.linkedin.com/in/shashank-vishwakarma-650555283/'><Icon className='shadow-xl cursor-pointer hover:shadow-2xl' height='4vh' icon="devicon:linkedin" /></a>
        <a href='https://twitter.com/ShashankVis001'><Icon className='shadow-xl cursor-pointer hover:shadow-2xl' height='4vh' icon="devicon:twitter" /></a>
        </div>
        <div className='flex flex-wrap w-screen h-max items-center justify-center gap-1 mt-3'>
        <h1 className='md:text-base text-sm font-bold'><Link to='/'>Fresh Food</Link></h1>
        <p className='text-center'>&copy; Designed and Developed by <span className='text-blue-600 font-semibold' 
        > <a href="https://www.linkedin.com/in/shashank-vishwakarma-650555283/">Shashank Vishwakarma</a></span></p>
        </div>
    </div>
    
  )
}

export default Footer