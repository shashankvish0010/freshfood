import React from 'react'
import Cuisines from './Cuisines'
import { useState } from 'react'
import Footer from './Footer'
const Adddish = () => {

    const [dish, setDish] = useState({
        dishname: "", description: "", price: "", image: "", category: "", cuisine: "", tag: "", duration: ""
    })

    const [status, setStatus] = useState({
        success: "", message: ""
    })

    const handleInput = (e) => {
        if (e.target.name == "image") {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                setDish({
                    ...dish, image: reader.result
                })
            }
            reader.onerror = () => {
                setDish(
                    {
                        ...dish, image: ""
                    }
                )
            }
        }
        else {
            const name = e.target.name;
            const value = e.target.value;

            setDish({
                ...dish, [name]: value
            })
        }
    }


    const sendData = async (e) => {
        e.preventDefault();
        const { dishname, description, price, image, category, cuisine, tag, duration } = dish;
        try {
            const response = await fetch('https://freshfood-backend.onrender.com/add-dish', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    dishname, description, price, image, category, cuisine, tag, duration
                })

            })

            if (response.ok) {
                const data = await response.json();
                console.log("Dish data added");
                setStatus({
                    success: data.success,
                    message: data.message
                })
            }
            else {
                console.log("Dish not added");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-screen h-screen flex flex-col gap-3 justify-center items-center'>
            <span><p className='text-red-600 font-semibold capitalize text-center'>{status.message}</p></span>
            <div className='bg-red-600 flex flex-wrap gap-4 h-max p-4 w-[80vw] md:w-[55vw] rounded-md justify-evenly '>
                <div className='flex flex-col gap-2 items-center justify-center rounded-md border-dotted border-white border-[2px] md:w-[25vw] w-[65vw] p-10'>
                    <div className='flex flex-wrap flex-col items-center justify-center gap-2'>
                        <label id="fileuplaod" className=' bg-white p-1 text-red-600 rounded font-medium'>
                            <span className='cursor-pointer'>Choose File</span>
                            <input className='hidden' id="fileuplaod" type="file" accept='image.*' onChange={handleInput} name="image" /></label>
                        {dish.image == "" || dish.image == null ? <p className='text-white font-medium px-2'>No File Choosen</p> : <img height={160} width={160} src={dish.image}></img>}
                    </div>
                </div>
                <form method="PUT" className='flex flex-col justify-evenly items-center gap-2'>
                    <h1 className='font-bold text-white text-center p-1'>Add a new dish</h1>
                    <input className='rounded md:w-[25vw] w-[65vw] p-1  focus-visible:outline-none placeholder:capitalize'
                        type="text" placeholder='Dish name' onChange={handleInput} name="dishname" value={dish.value} />
                    <textarea className='rounded md:w-[25vw]  w-[65vw] p-1 h-max focus-visible:outline-none placeholder:capitalize'
                        type="text" placeholder='Dish description' onChange={handleInput} name="description" value={dish.value} />
                    <input className='rounded md:w-[25vw]  w-[65vw] p-1  focus-visible:outline-none placeholder:capitalize'
                        type="number" placeholder='Enter price' onChange={handleInput} name="price" value={dish.value} />
                    <input className='rounded md:w-[25vw]  w-[65vw] p-1 uppercase focus-visible:outline-none placeholder:capitalize'
                        type="number" placeholder='Enter tag' onChange={handleInput} name="tag" value={dish.value} />
                    <input className='rounded md:w-[25vw]  w-[65vw] p-1  focus-visible:outline-none placeholder:capitalize'
                        type="number" placeholder='Duration of preparation' onChange={handleInput} name="duration" value={dish.value} />
                    <div className='flex flex-col text-lg gap-2'>
                        <div className='flex gap-2'>
                            <label className='font-medium text-white' for="dish">Category:</label>
                            <select className='rounded focus-visible:outline-none text-center' name="category"
                                id="category" value={dish.value} onChange={handleInput}>
                                <option value="Dinner">Dinner</option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Snacks">Snacks</option>
                                <option value="Dessert">Dessert</option>
                            </select>
                        </div>
                        <div className='flex gap-2 '>
                            <label className='font-medium text-white' for="dish">Cuisine:</label>
                            <Cuisines className='rounded focus-visible:outline-none text-center'
                                value={dish.cuisine}
                                onChange={handleInput}
                                name="cuisine"
                                id="cuisine"
                            />
                        </div>
                    </div>
                    <button onClick={sendData} className='bg-green-600 rounded-md text-md text-white p-1 mt-6 border-none outline-none font-bold'> Add Dish </button>

                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default Adddish