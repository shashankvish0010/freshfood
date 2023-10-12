import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import Login from './Login'

// import { withCookies, cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'

const Profile = () => {

    const [profile, setProfile] = useState({
        firstname: "",
        lastname: "",
        email: "",
        contact: "",
        tokens: ""
    })

    const navigate = useNavigate();

    useEffect(() => {
        const getprofile = async () => {
  try {
        const response = await fetch('https://freshfood-backend.onrender.com/profiledata', {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });

    let { firstname = "", lastname = "", email = "", contact = "", tokens = "" } = {};

    if (response) {
      const data = await response.json();
      console.log(data);
      const {userdata} = data;
      setProfile({
        firstname : userdata.firstname,
        lastname : userdata.lastname,
        email : userdata.email,
        contact : userdata.contact,
        tokens : userdata.tokens
      });
    }
  } catch (error) {
    console.log("Data not received");
  }
};
        getprofile();
    }, [])



    const { firstname,
        lastname,
        email,
        contact, tokens } = profile;

    const logout = () => {
        const cookie = document.cookie;
        document.cookie = cookie + ";max-age=0";
        // cookies.remove(tokens[0].token);

    }
    return (
        <div className='w-screen h-screen p-5 justify-evenly items-center flex flex-col gap-4'>
            <div className='flex flex-col items-center gap-4'>
                <p className='text-2xl font-semibold text-black'>Profile</p>
                <Icon className='cursor-pointer' icon="gg:profile" height='8vh' color='red' />
                <p className='text-xl capitalize font-semibold text-black'>{firstname}</p>
            </div>
            <div className='flex flex-col h-max w-max justify-evenly bg-white shadow-2xl rounded gap-5 p-4 items-start'>
                <div className='flex flex-col md:w-[45vw] w-[75vw] items-start justify-evenly gap-4'>
                    <div className='flex gap-4 w-max items-center'>
                        <Icon height='4vh' color='red' icon="ic:outline-info" />
                        <p className='md:text-2xl text-base font-medium text-black'>Personal Info.</p>
                    </div>
                    <div className='gap-3 flex md:flex-row flex-col p-3'>
                        <p className='text-sm text-gray-600 capitalize'><span className='text-base font-medium text-black'>Firstname : </span> {firstname}</p>
                        <p className='text-sm text-gray-600 capitalize'><span className='text-base font-medium text-black'>Lastname : </span> {lastname}</p>
                        <p className='text-sm text-gray-600 '><span className='text-base font-medium text-black'>Email : </span> {email}</p>
                        <p className='text-sm text-gray-600 capitalize'><span className='text-base font-medium text-black'>Contact No : </span> {contact}</p>
                    </div>
                </div>
                <div onClick={() => navigate('/orders')} className='flex items-center justify-evenly gap-4'>
                    <Icon icon="icon-park-outline:transaction-order" height='4vh' color='red' />
                    <p className='cursor-pointer md:text-2xl text-base font-medium text-black'>My Order</p>
                </div>
                <a href="/"><div onClick={() => logout()} className='cursor-pointer flex items-center justify-evenly gap-4'>
                    <Icon icon="material-symbols:logout" height='4vh' color='red' />
                    <p className='md:text-2xl text-base font-medium text-black'>Logout</p>
                </div></a>
            </div>
            <div onClick={()=>navigate('/edit')} className='flex items-center h-max w-max justify-evenly gap-1 '><Icon icon="bx:edit" color='red' height='6vh' /><button  className='border-solid border-[4px] px-1 rounded border-red-500'>Edit</button></div>
        </div>
    )
}

export default Profile