import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from './Footer'

const Login = () => {

    const [status, setStatus] = useState({message : ""})
    const navigate = useNavigate();

    const [credentials, setcredentials] = useState({
        email: "",
        password: ""
    });
    const [password, setpassword] = useState();

    const handleInput = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setcredentials({
            ...credentials, [name]: value,
        })
    }

    const verifydata = async (e) => {

        e.preventDefault();

        const { email, password } = credentials;
        try {
            const response = await fetch('/customerlogin', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                }),
            })

            if (response) {
                const data = await response.json();
                if(data.success === true){
                const { token } = data;
                document.cookie = `jwt = ${token} ; path=/`;
                console.log("cookie set");
                navigate('/')
                }
                else{
                    const {success , message} = data;
                    setStatus({message : message})
                }

            }
            else {
                console.log("Data not receieved");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (

        <div className='h-screen w-screen flex flex-col gap-4 justify-center items-center'>
                            <span><p className='text-red-600 font-semibold text-center'>{status.message}</p></span>

            <div className='bg-red-600 flex flex-col items-center w-[60vw] md:w-[40vw] md:max-h-fit p-5 gap-3 rounded-lg shadow-2xl'>
                <div className='md:text-2xl text-xl font-bold text-center text-white'>
                    <h1>Log In</h1>
                </div>
                <div>
                    <form method='POST' className='flex flex-col gap-3 overflow-hidden'>
                        <input
                            className='focus-visible:outline-none h-[2rem] md:w-[30vw]  w-[45vw] rounded px-1 placeholder:text-gray text-black placeholder:capitalize'
                            type="text"
                            placeholder='Enter email'
                            id="email"
                            name='email'
                            value={credentials.email}
                            onChange={handleInput}
                        />
                        <input className='focus-visible:outline-none h-[2rem] md:w-[30vw]  w-[45vw] rounded px-1 placeholder:text-gray text-black placeholder:capitalize'
                            type="text"
                            placeholder='Enter password'
                            id="password"
                            name='password'
                            value={credentials.password}
                            onChange={handleInput}
                        />
                        <div className='text-white flex flex-wrap gap-2 justify-center'>
                            <p>Create a new account</p><Link className='font-bold' to='/register'>Register</Link>
                        </div>
                        <button onClick={verifydata} className='h-[2.5rem] md:w-[30vw]  w-[45vw] rounded px-1 uppercase hover:shadow-2xl bg-white text-red-600 font-bold'>
                            Log in</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login