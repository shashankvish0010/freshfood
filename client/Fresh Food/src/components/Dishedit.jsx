import React, { useEffect,useContext, useState } from 'react'
import Cuisines from './Cuisines'
import { useNavigate } from 'react-router-dom';
import { PartnerDetails } from '../Context/Partnercontext';

const Dishedit = (props) => {

 
    const navigate = useNavigate();
    const { item } = props;

    const [UpdateedDish, setUpdateedDish] = useState({
        id: item._id,
        image: item.image,
        dishname: item.dishname,
        description: item.description,
        cuisine: item.cuisine,
        price: item.price,
        duration: item.duration,
        tag: item.tag,
    })

    const handleInput = (e) => {
        e.preventDefault();
        try {
            if(e.target.name === 'image'){
                   const reader = new FileReader();
                   reader.readAsDataURL(e.target.files[0]);
                   reader.onload = () => {
                    setUpdateedDish({
                           ...UpdateedDish, image: reader.result
                       })
            }
            reader.onerror = () => {
                setDish(
                    {
                        ...UpdateedDish, image: ""
                    }
                )
            }
        }else{    
            const name = e.target.name;
            const value = e.target.value;

            setUpdateedDish({ ...UpdateedDish, [name]: value });
        } }catch (error) {
            console.log(error);
        }
    }

    const saveData = async () => {

        const { id,
            image,
            dishname,
            description,
            cuisine,
            price,
            duration,
            tag, } = UpdateedDish;
        try {
            const response = await fetch('https://freshfood-backend.onrender.com/edit-dish', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id,
                    image,
                    dishname,
                    description,
                    cuisine,
                    price,
                    duration,
                    tag,
                })
            })

            if (response) {
                const data = await response.json();
           
                console.log('Dish saved', data);
  
                setUpdateedDish(data);

                navigate('/editdish')
            }
            else {
                console.log("Dish not saved");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-screen h-screen absolute flex flex-col justify-center items-center'>
            <div className='h-max w-max flex flex-col bg-slate-50 rounded shadow-2xl items-center gap-5 p-3'>
            <div className='flex flex-wrap flex-col items-center justify-center gap-2'>
                        <label id="fileuplaod" className=' bg-white p-1 text-red-600 rounded font-medium'>
                            <span className='cursor-pointer'>Choose File</span>
                            <input className='hidden' id="fileuplaod" type="file" accept='image.*' onChange={handleInput} name="image" /></label>
                        {UpdateedDish.image == "" || UpdateedDish.image == null ? <p className='text-white font-medium px-2'>No File Choosen</p> : <img height={160} width={160} src={UpdateedDish.image}></img>}
                    </div>
                <div>
                    <form method="PUT" className='flex flex-col justify-evenly items-center gap-2'>
                        <h1 className='font-bold text-white text-center p-1'>Add a new dish</h1>
                        <input className='rounded md:w-[25vw] w-[65vw] p-1  focus-visible:outline-none placeholder:capitalize'
                            type="text" placeholder='Dish name' onChange={handleInput}
                          name="dishname" value={UpdateedDish.dishname} />
                        <textarea className='rounded md:w-[25vw]  w-[65vw] p-1 h-max focus-visible:outline-none placeholder:capitalize'
                            type="text" placeholder='Dish description' onChange={handleInput}
                          name="description" value={UpdateedDish.description} />
                        <input className='rounded md:w-[25vw]  w-[65vw] p-1  focus-visible:outline-none placeholder:capitalize'
                            type="number" placeholder='Enter price' onChange={handleInput}
                           name="price" value={UpdateedDish.price} />
                        <input className='rounded md:w-[25vw]  w-[65vw] p-1 uppercase focus-visible:outline-none placeholder:capitalize'
                            type="text" placeholder='Enter tag' onChange={handleInput}
                       name="tag" value={UpdateedDish.tag} />
                        <input className='rounded md:w-[25vw]  w-[65vw] p-1  focus-visible:outline-none placeholder:capitalize'
                            type="number" placeholder='Duration of preparation' onChange={handleInput}
                      name="duration" value={UpdateedDish.duration} />
                        <div className='flex flex-col text-lg gap-2'>
                            <div className='flex gap-2'>
                                <label className='font-medium text-black' for="dish">Category:</label>
                                <select className='rounded focus-visible:outline-none text-center' name="category"
                                    id="category" value={UpdateedDish.category} onChange={handleInput}
                                >
                                    <option value="Dinner">Dinner</option>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Snacks">Snacks</option>
                                    <option value="Dessert">Dessert</option>
                                </select>
                            </div>
                            <div className='flex gap-2 '>
                                <label className='font-medium text-black' for="dish">Cuisine:</label>
                                <Cuisines className='rounded focus-visible:outline-none text-center'
                                    value={UpdateedDish.cuisine}
                                    onChange={handleInput}
                                    name="cuisine"
                                    id="cuisine"
                                />
                            </div>
                        </div>
                        <button onClick={saveData} className='bg-green-600 rounded-md text-md text-white p-1 mt-6 border-none outline-none font-bold'> Save </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Dishedit