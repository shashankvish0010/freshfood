import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer'

const Partnerreg = () => {

    const navigate = useNavigate();

    const [status, setStatus] = useState({
        success: "", message: ""
    })

    const [partner, setPartner] = useState({
        venuename: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmpassword: "",
        contact: "",
        address: "",
    })

    const handleInput = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setPartner({ ...partner, [name]: value })
    }

    const sendData = async (e) => {
        e.preventDefault();

        const { venuename,
            firstname,
            lastname,
            email,
            password,
            confirmpassword,
            contact,
            address } = partner

        try {

            const response = await fetch('https://freshfood-backend.onrender.com/addpartner', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    venuename,
                    firstname,
                    lastname,
                    email,
                    password,
                    confirmpassword,
                    contact,
                    address
                })
            })

            // response.ok ? console.log("Food partner added") : console.log("Food partner not added");

            if (response) {
                const data = await response.json();
                console.log(data);
                document.cookie = `jwt=${data.token} ; path=/`
                if(data.success === true)
                {
                    navigate('/confirm');
                }
                else{
                setStatus({
                    success: data.success,
                    message: data.message
                })
            }
            }
            else {
                 console.log("data not recieved");
            }

        } catch (error) {
            console.log(error);
        }
    }



    return (

        <div className='w-screen h-screen flex flex-col gap-3 justify-center items-center'>
            <span><p className='text-red-600 font-semibold text-center'>{status.message}</p></span>
            <div className='flex flex-wrap justify-evenly gap-2 py-3 bg-red-600 text-white md:w-[50vw] w-[60vw] rounded-md shadow-2xl'>
                <div className='flex flex-col justify-center items-center mt-3 md:mt-0 gap-1 border-white border-solid border-[1.5px] px-5 rounded-md'>
                    <div>
                        <h1 className='md:text-4xl text-2xl font-bold'>Fresh Food</h1>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <div className='h-0.5 w-5 text-center bg-white mt-1'></div>
                        <p className='font-semibold text-sm'> Become our food partner</p>
                        <div className='h-0.5 w-5 text-center bg-white mt-1'></div>

                    </div>
                </div>

                <div className='p-3'>
                    <form method="POST" className='flex flex-col gap-2'>
                        <input
                            className='focus-visible:outline-none text-black placeholder:text-gray rounded md:w-[24vw] w-[48vw] h-[5vh] px-1 placeholder:capitalize'
                            value={partner.venuename}
                            onChange={handleInput}
                            type="text"
                            name='venuename'
                            placeholder='Restauraunt / cafe name' />
                        <input
                            className='focus-visible:outline-none text-black placeholder:text-gray rounded md:w-[24vw] w-[48vw] h-[5vh] px-1 placeholder:capitalize'
                            value={partner.firstname}
                            onChange={handleInput}
                            type="text"
                            name='firstname'
                            placeholder='your firstname' />
                        <input
                            className='focus-visible:outline-none text-black placeholder:text-gray rounded md:w-[24vw] w-[48vw] h-[5vh] px-1 placeholder:capitalize'
                            value={partner.lastname}
                            onChange={handleInput}
                            type="text"
                            name='lastname'
                            placeholder='your lastname' />
                        <input
                            className='focus-visible:outline-none text-black placeholder:text-gray rounded md:w-[24vw] w-[48vw] h-[5vh] px-1 placeholder:capitalize'
                            value={partner.email}
                            onChange={handleInput}
                            type="email"
                            name='email'
                            placeholder='your email' />
                        <input
                            className='focus-visible:outline-none text-black placeholder:text-gray rounded md:w-[24vw] w-[48vw] h-[5vh] px-1 placeholder:capitalize'
                            value={partner.password}
                            onChange={handleInput}
                            type="password"
                            name='password'
                            placeholder='enter a password' />
                        <input
                            className='focus-visible:outline-none text-black placeholder:text-gray rounded md:w-[24vw] w-[48vw] h-[5vh] px-1 placeholder:capitalize'
                            value={partner.confirmpassword}
                            onChange={handleInput}
                            type="password"
                            name='confirmpassword'
                            placeholder='confirm password' />
                        <input
                            className='focus-visible:outline-none text-black placeholder:text-gray rounded md:w-[24vw] w-[48vw] h-[5vh] px-1 placeholder:capitalize'
                            value={partner.contact}
                            onChange={handleInput}
                            type="number"
                            name='contact'
                            placeholder='your contact' />
                        <input
                            className='focus-visible:outline-none text-black placeholder:text-gray rounded md:w-[24vw] w-[48vw] h-[5vh] px-1 placeholder:capitalize'

                            value={partner.address}
                            onChange={handleInput}
                            type="text"
                            name='address'
                            placeholder='Address' />
                        <hr className='mt-2 bg-white' />
                        <div className='text-white flex flex-wrap gap-2 justify-center'>
                            <p>Already have a account</p><Link to='/partner-login' className='font-bold'>Log in</Link>
                        </div>
                        <Link to='/partner-login'>
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

export default Partnerreg