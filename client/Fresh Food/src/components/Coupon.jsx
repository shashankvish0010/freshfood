import React, { useEffect, useState } from 'react'
import Unauth from './Unauth'
import Footer from './Footer'

const Coupon = () => {

    const [authentication , setAuthentication] = useState({
        auhenticated : false,
    })
    const [coupon, setCoupon] = useState({
        code: "", discount: "", expdate: "", offer : ""
    })
    
    const [status, setStatus] = useState({success : "", message : ""});

    const auth = async () =>{
        try {

            const response = await fetch ('/admin-panel', {
                method : "GET",
                headers : {
                    "Accept" : "appliaction/json",
                    "Content-Type" : "application/json"
                }
            })

            if(response){
                const data = await response.json();
                setAuthentication({
                    authenticated : data.key
                })
            }
            else{
                console.log("Data not recieved");
            }
            
        } catch (error) {
            console.log(error);
        }
     
    }

    useEffect(()=>{auth()},[])

    const handleInput = (e) => {


        const name = e.target.name;
        const value = e.target.value;
        console.log(value);
        setCoupon({
            ...coupon, [name]: value
        })
    }

    const sendCoupon = async (e) => {
        e.preventDefault();

        const { code, discount, expdate , offer } = coupon;

        try {
            const response = await fetch('/createcoupon', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code, discount, expdate , offer
                })
            })

            if (response.ok) {
                const data = await response.json();
                setStatus({
                    success : data.success,
                    message : data.message
                })
            }
            else {
                console.log("Can't send coupon");
            }
        } catch (error) {
            console.log(error);
        }
    }

   const {authenticated} = authentication;

    if(authenticated === true)
    {
    return (
       
        <div className='w-screen h-screen flex flex-col flex-wrap justify-center items-center p-4'>
            <div className='flex mt-5 p-5 flex-col items-center justify-center text-center'>
                <h1 className='md:text-3xl text-lg text-black font-bold'>Create coupon codes, that's <span className='text-red-600'>excites the customers</span></h1>
            </div>
             
             <span className='text-red-600 font-semibold text-sm'>{status.message}</span>
            
            <div className='flex flex-col justify-center items-center p-3'>
                <form className='bg-red-600 md:h-[55vh] rounded h-max-fit w-[60vw] p-2 flex flex-col justify-center items-center gap-2' method="POST">
                    <span className='text-white font-semibold text-sm'>Coupon Code</span>
                    <input type="text"
                        className='uppercase focus-visible:outline-none text-black placeholder:text-gray rounded md:w-[24vw] w-max-fit h-[5vh] px-1 placeholder:capitalize'

                        placeholder='Enter coupon code'
                        name="code"
                        value={coupon.code}
                        onChange={handleInput}
                    />
                    <span className='text-white font-semibold text-sm'>Discount</span>

                    <input type="number"
                        className='focus-visible:outline-none text-black placeholder:text-gray rounded md:w-[24vw] w-max-fit h-[5vh] px-1 placeholder:capitalize'

                        placeholder='Discount offer'
                        name="discount"
                        value={coupon.discount}
                        onChange={handleInput}
                    />
                    <span className='text-white font-semibold text-sm'>Expiry Date</span>

                    <input type="date"
                        className='focus-visible:outline-none text-black placeholder:text-gray rounded md:w-[24vw] w-max-fit h-[5vh] px-1 placeholder:capitalize'

                        placeholder='Enter coupon code'
                        name="expdate"
                        value={coupon.expdate}
                        onChange={handleInput}
                    />
                                        <span className='text-white font-semibold text-sm'>Describe offer</span>

                     <textarea type='text'
                        className='focus-visible:outline-none text-black placeholder:text-gray rounded md:w-[24vw] w-max-fit h-[5vh] px-1 placeholder:capitalize'
                        placeholder='Describe'
                        name="offer"
                        value={coupon.offer}
                        onChange={handleInput}
                    />
                    <button onClick={sendCoupon} className='bg-white m-2 p-1 md:w-[24vw] w-[48vw] text-red-600 rounded font-semibold'>Create</button>
                </form>
            </div>
            <Footer/>
        </div>
    )
    }
    else
    {
        return( <div>
        <Unauth/> </div> )
    }
}

export default Coupon