import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import Login from './Login'

// import { withCookies, cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'

const ProfileEdit = () => {

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
        const response = await fetch('/profiledata', {
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
    }, []);

    const handleChange = (e) =>{
      e.preventDefault();
      try {
        const name = e.target.name;
        const value = e.target.value;

        setProfile({...profile, [name] : value});

      } catch (error) {
        console.log(error);
      }
    }

    const UpdateProfile = async () =>{
      const {firstname,
        lastname,
        email,
        contact} = profile;
      try {
        const response = await fetch('/updateprofile', {
          method : 'PUT',
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            firstname,
        lastname,
        email,
        contact}
          )
        });
        if(response){
          const data = await response.json();
          const {success} = data;
          success === true ? navigate('/profile') : console.log("Not Updated");
        }
      } catch (error) {
        console.log(error);
      }
    }



    const { firstname,
        lastname,
        email,
        contact, tokens } = profile;


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
                    <form method='PUT' className='gap-3 flex md:flex-row flex-col p-3'>
                        <input className='focus-visible:outline-none rounded px-2 text-base' type="text" value = {profile.firstname} onChange={handleChange} name='firstname' />
                        <input className='focus-visible:outline-none rounded px-2 text-base' type="text" value = {profile.lastname} onChange={handleChange} name='lastname' />
                        <input className='focus-visible:outline-none rounded px-2 text-base' type="text" value = {profile.email} onChange={handleChange} name='email' />
                        <input className='focus-visible:outline-none rounded px-2 text-base' type="text" value = {profile.contact} onChange={handleChange} name='contact' />
                        {/* <input className='focus-visible:outline-none rounded px-2 text-base' type="text" value = {address} onChange={handleChange} name='address' /> */}
                    </form>
                </div>
            </div>
            <div className='flex items-center h-max w-max justify-evenly gap-1 '><Icon icon="ion:save-sharp" color='green' height='6vh' /><button onClick={()=>UpdateProfile()} className='border-solid capitalize border-[4px] px-1 rounded border-green-500'>save</button></div>
        </div>
    )
}

export default ProfileEdit