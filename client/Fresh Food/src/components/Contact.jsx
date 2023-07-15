import React from 'react'
import { Icon } from '@iconify/react'


const Contact = () => {
  return (
    <>
    <div className='flex flex-col h-screen w-screen justify-evenly items-center'>
      <div className='bg-slate-50 flex md:flex-row flex-col gap-5 shadow-2xl rounded md:w-max w-[75vw] p-3 items-center'>
        <div>
          <img
            className='rounded-full shadow-xl border-2 border-blue-500 hover: hover:shadow-2xl cursor-pointer' src="https://media.licdn.com/dms/image/D4E03AQEutysDmmKD9Q/profile-displayphoto-shrink_400_400/0/1689167832524?e=1694649600&v=beta&t=XPC0wTrU4VRZdJt0M9uCM8qR_Vrwgd2XSGTFVnkUv-Q" alt="" height='200px' width='200px' />
        </div>
        <div className='flex flex-col h-max gap-3 p-2 md:w-[65vw] w-[50vw]'>
          <h1 className='md:text-xl text-base font-semibold'>Shashank Vishwakarma</h1>
          <p className='text-sm text-gray-600 font-medium'>I am a MERN full-stack developer who designed and developed Fresh Food, a
           seamless platform connecting customers with food partners, utilizing MongoDB, Express.js, React.js, Tailwind CSS,
            and Node.js to create a modern and scalable application.
          </p>
        </div>
      </div>

      <div className='flex flex-col h-max shadow-2xl w-max items-center'>
        <div className='p-2 flex h-max w-max justify-center items-center'>
          <h1 className='text-red-600 font-semibold md:text-xl capitalize text-base'>Let's connect on</h1>
        </div>
        <div className='flex md:flex-row flex-col items-center h-max w-max gap-5 p-2'>
          <div className='flex flex-row gap-2 p-1 h-max w-max'>
          <Icon icon="ic:baseline-email" color='orange' height='4vh'/>
          <p className='text-gray-600 font-medium'>shashankvishwakarma001@gmail.com</p>
          </div>
        <a href="https://github.com/shashankvish"><div className='flex flex-row gap-2 p-1 h-max w-max'>
          <Icon icon="icon-park:github" height='4vh'/>
          <p className='text-gray-600 font-medium'>GitHub</p>
          </div></a>
          

           <a href="https://www.linkedin.com/in/shashank-vishwakarma-650555283/"><div className='flex flex-row gap-2 p-1 h-max w-max'>
          <Icon icon="devicon:linkedin" height='4vh'/>
          <p className='text-gray-600 font-medium'>Linkedin</p>
          </div></a>
          <a href="https://twitter.com/ShashankVis001">
          <div className='flex flex-row gap-2 p-1 h-max w-max'>
          <Icon icon="devicon:twitter" height='4vh'/>
          <p className='text-gray-600 font-medium'>Twitter</p>
          </div></a>
        </div>
      </div>
     
    </div>
    </>
  )
}

export default Contact