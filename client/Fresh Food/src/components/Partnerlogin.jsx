import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'

const Partnerlogin = () => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        email : "",
        password : ""
    })

    const [status, setStatus] = useState({
        success :"" , message : ""
    })

    const handleInput = (e) =>{

        const name = e.target.name;
        const value = e.target.value;

        setData({
            ...data, [name]:value
        })
    }
   

    const sendLogin = async (e) =>{
        e.preventDefault();

        const { email, password } = data;

        try {

           const response = await fetch('/partnerlogin', {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    email, password
                })
            })

            response ? console.log("Data sent") : console.log("Data not sent");
           
            if(response.ok){
                const data = await response.json();
                console.log(data);
                if(data.token)
                {
                document.cookie = `jwt=${data.token};path=/`;
                console.log("cookie set")
                navigate('/main-panel');
                }
                else{
                setStatus({
                    success : data.success,
                    message : data.message
                })
            }
        }
        else
        {
            console.log("data not recieved");
        }
            
        } catch (error) {
            console.log(error);
        }

    }
      

    return (
        <div className='flex flex-col flex-wrap gap-3 w-screen h-screen justify-center items-center'>
                    <span><p className='text-red-600 font-semibold text-center'>{status.message}</p></span>
            <div className='flex flex-wrap justify-evenly gap-2 py-3 bg-red-600 text-white md:w-[50vw] w-[60vw] rounded-md shadow-2xl'>
                <div className='flex flex-col justify-center items-center mt-3 md:mt-0 gap-1 border-white border-solid border-[1.5px] md:px-5 px-3 rounded-md'>
                    <div>
                        <h1 className='md:text-4xl text-2xl font-bold'>Fresh Food</h1>
                    </div>

                    <div className='flex gap-1 items-center'>
                        <div className='h-0.5 w-5 text-center bg-white mt-1'></div>
                        <p className='font-semibold text-sm'> Welcome back food partner</p>
                        <div className='h-0.5 w-5 text-center bg-white mt-1'></div>

                    </div>
                </div>
                <div className='p-3'>
                <form method="POST" className='flex flex-col gap-2'>
                <input
                        className='focus-visible:outline-none text-black placeholder:text-gray rounded md:w-[24vw] w-[48vw] h-[5vh] px-1 placeholder:capitalize'
                        value={data.email}
                        onChange={handleInput}
                        type="text"
                        name='email'
                        placeholder='Enter registered email' />
                    <input
                        className='focus-visible:outline-none text-black placeholder:text-gray rounded md:w-[24vw] w-[48vw] h-[5vh] px-1 placeholder:capitalize'
                        value={data.password}
                        onChange={handleInput}
                        type="password"
                        name='password'
                        placeholder='password' />
                    <button
                        onClick={sendLogin}
                        className='bg-white mt-2 p-1 md:w-[24vw] w-[48vw] text-red-600 rounded font-semibold'>Submit</button>
                </form>
                </div>
            </div>
        
        </div>

    )
}

export default Partnerlogin