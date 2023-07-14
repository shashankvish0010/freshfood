import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'

const Adminreg = () => {

    const [admin , setAdmin] = useState({
        firstname : "",
        lastname : "",
        email : "",
        contact : "",
        activationkey : "",
        password : "",
        confirmpassword : ""
    })

    const handleInput = (e) =>{

        const name = e.target.name;
        const value = e.target.value;

        setAdmin({
            ...admin, [name] : value
        })
    }

    const sendData = async (e) =>{
        e.preventDefault();

        const { firstname,
        lastname,
        email,
        contact,
        activationkey,
        password,
        confirmpassword } = admin;
       try {

       const response = await fetch('/soft-admin', {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body :JSON.stringify({
                firstname,
                lastname,
                email,
                contact,
                activationkey,
                password,
                confirmpassword
            })
        })

        if(response.ok){
            const data = await response.json();
            console.log("Data send of admin");
        }
        else{
            console.log("Data of admin not sent");
        }
        
       } catch (error) {
        
       }
    }

  

return (
    <div className='w-screen h-screen flex justify-center items-center'>
    <div className='flex flex-wrap justify-evenly gap-2 py-3 bg-red-600 text-white md:w-[50vw] w-[60vw] rounded-md shadow-2xl'>
        <div className='flex flex-col justify-center items-center mt-3 md:mt-0 gap-1 border-white border-solid border-[1.5px] px-5 rounded-md'>
            <div>
                <h1 className='md:text-4xl text-2xl font-bold'>Fresh Food</h1>
            </div>
            <div className='flex gap-1 items-center'>
                <div className='h-0.5 w-5 text-center bg-white mt-1'></div>
                <p className='font-semibold text-sm'> Welcome to the team</p>
                <div className='h-0.5 w-5 text-center bg-white mt-1'></div>

            </div>
        </div>

        <div className='p-3'>
            <form method="POST" className='flex flex-col gap-2'>
                <input
                    className='focus-visible:outline-none text-black placeholder:text-gray rounded md:w-[24vw] w-[48vw] h-[5vh] px-1 placeholder:capitalize'
                    value={admin.firstname}
                    onChange={handleInput}
                    type="text"
                    name='firstname'
                    placeholder='your firstname' />
                <input
                    className='focus-visible:outline-none text-black placeholder:text-gray rounded md:w-[24vw] w-[48vw] h-[5vh] px-1 placeholder:capitalize'
                    value={admin.lastname}
                    onChange={handleInput}
                    type="text"
                    name='lastname'
                    placeholder='your lastname' />
                <input
                    className='focus-visible:outline-none text-black placeholder:text-gray rounded md:w-[24vw] w-[48vw] h-[5vh] px-1 placeholder:capitalize'
                    value={admin.email}
                    onChange={handleInput}
                    type="email"
                    name='email'
                    placeholder='your email' />
                <input
                    className='focus-visible:outline-none text-black placeholder:text-gray rounded md:w-[24vw] w-[48vw] h-[5vh] px-1 placeholder:capitalize'
                    value={admin.password}
                    onChange={handleInput}
                    type="password"
                    name='password'
                    placeholder='enter a password' />
                <input
                    className='focus-visible:outline-none text-black placeholder:text-gray rounded md:w-[24vw] w-[48vw] h-[5vh] px-1 placeholder:capitalize'
                    value={admin.confirmpassword}
                    onChange={handleInput}
                    type="password"
                    name='confirmpassword'
                    placeholder='confirm password' />
                <input
                    className='focus-visible:outline-none text-black placeholder:text-gray rounded md:w-[24vw] w-[48vw] h-[5vh] px-1 placeholder:capitalize'
                    value={admin.contact}
                    onChange={handleInput}
                    type="number"
                    name='contact'
                    placeholder='your contact' />
                <input
                    className='focus-visible:outline-none text-black placeholder:text-gray rounded md:w-[24vw] w-[48vw] h-[5vh] px-1 placeholder:capitalize'
                   
                    value={admin.activationkey}
                    onChange={handleInput}
                    type="text"
                    name='activationkey'
                    placeholder='Activation Key' />
                <hr className='mt-2 bg-white' />
                <div className='text-white flex flex-wrap gap-2 justify-center'>
              <p>Already a admin ?</p><Link to='/admin-login' className='font-bold'>Log in</Link>
              </div>
                <Link to='/admin-login'>
                    <button
                        onClick={sendData}
                        className='bg-white mt-2 p-1 md:w-[24vw] w-[48vw] text-red-600 rounded font-semibold'>Submit</button>
                </Link>
            </form>
        </div>
    </div>
    <Footer/>
</div>
)
}

export default Adminreg