import React, { useState , useHistory} from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer'

const Register = () => {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    contact: '',
    password: '',
    conpass: '',
    address: ''
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const sendData = async (e) => {
    e.preventDefault();

    const { firstname, lastname, email, contact, password, conpass, address } = user;

    try {
      const response = await fetch('https://freshfood-backend.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          contact,
          password,
          conpass,
          address
        })
      });

      if (response.ok) {
        // Registration successful, handle the response accordingly
        console.log('Registration successful');
      } else {
        // Registration failed, handle the response accordingly
        console.log('Registration failed');

      }
    } catch (error) {
      // Network or other error occurred, handle the error accordingly
      console.log(error);
    }
  };

  return (
    <div className='h-screen w-screen flex flex-col justify-evenly items-center'>
      <div className='bg-red-600 flex flex-col items-center w-[60vw] md:w-[40vw] md:max-h-fit p-5 gap-3 rounded-lg shadow-2xl'>
        <div className='md:text-2xl text-xl font-bold text-center text-white'>
          <h1>Register</h1>
        </div>
        <div>
          <form method="POST" className='flex flex-col gap-3 overflow-hidden'>
            {/* Input fields */}
            <input
              className='h-[2rem] md:w-[30vw] w-[45vw] rounded px-1 placeholder:text-gray text-black placeholder:capitalize'
              id='firstname'
              
              value={user.firstname}
              onChange={handleInput}
              type='text'
            
              placeholder='Enter firstname'
              name='firstname'
            />
            <input
              className='h-[2rem] md:w-[30vw] w-[45vw] rounded px-1 placeholder:text-gray text-black placeholder:capitalize'
              id='lastname'
              
              value={user.lastname}
              onChange={handleInput}
              type='text'
              placeholder='Enter lastname'
              name='lastname'
            />
            <input
              className='h-[2rem] md:w-[30vw] w-[45vw] rounded px-1 placeholder:text-gray text-black placeholder:capitalize'
              id='email'
              
              value={user.email}
              onChange={handleInput}
              type='text'
            
              placeholder='Enter email'
              name='email'
            />
            <input
              className='h-[2rem] md:w-[30vw] w-[45vw] rounded px-1 placeholder:text-gray text-black placeholder:capitalize'
              id='contact'
              
              value={user.contact}
              onChange={handleInput}
              type='number'
            
              placeholder='Enter contact'
              name='contact'
            />
            <input
              className='h-[2rem] md:w-[30vw] w-[45vw] rounded px-1 placeholder:text-gray text-black placeholder:capitalize'
              id='password'
              
              value={user.password}
              onChange={handleInput}
              type='password'
            
              placeholder='Enter password'
              name='password'
            />
            <input
              className='h-[2rem] md:w-[30vw] w-[45vw] rounded px-1 placeholder:text-gray text-black placeholder:capitalize'
              id='conpass'
              
              value={user.conpass}
              onChange={handleInput}
              type='password'
            
              placeholder='Confirm password'
              name='conpass'
            />
            <input
              className='h-[2rem] md:w-[30vw] w-[45vw] rounded px-1 placeholder:text-gray text-black placeholder:capitalize'
              id='address'
              
              value={user.address}
              onChange={handleInput}
              type='text'
            
              placeholder='Enter address'
              name='address'
            />
              <div className='text-white flex flex-wrap gap-2 justify-center'>
              <p>Already have a account</p><Link to='/login' className='font-bold'>Log in</Link>
              </div>
            <button
              onClick={sendData}
              className='h-[2.5rem] md:w-[30vw]  w-[45vw] rounded px-1 uppercase hover:shadow-2xl bg-white text-red-600 font-bold'
            >
              Register Me
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;