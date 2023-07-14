import React, { useContext, useEffect, useState } from 'react';
import Loading from './Loading';
import Cuisines from './Cuisines';
import Couponcard from './Couponcard';
import Menusection from './Menusection';
import { Icon } from '@iconify/react';
import { CouponContext } from '../Context/Couponcontext';
import Sort from './Sort';
import { Popup } from '../Context/Popupcontext';
import Sortedmenu from './Sortedmenu';
import { MenuContext } from '../Context/Menucontext';
import Footer from './Footer';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Home = () => {

  const PopupGlobal = useContext(Popup);
  const dispatch = PopupGlobal.dispatch;
  const showSort = PopupGlobal.showSort;
  console.log(showSort);
  const couponglobal = useContext(CouponContext);

  const MenuGlobal = useContext(MenuContext);
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const key = MenuGlobal.key;
  const {showmenu, title} = key;

  useEffect(()=>{ couponglobal.getCoupons() },[])
 
  const coupons = couponglobal.coupons;
  console.log(coupons);
 
  const [Query, setQuery] = useState();

  const HandleQuery = (e) =>{
    const value = e.target.value;
    setQuery(value);
    MenuGlobal.fetchdata(Query)
  }
  return (
    <div className="min-h-screen relative w-screen flex flex-col gap-3">
      <div className="w-screen h-max flex items-center flex-wrap px-5 mt-6 gap-5">
        <div className="w-max h-max flex items-center gap-5">
          <div onClick={()=>dispatch({type : 'SHOW'})} className="border-gray-400 cursor-pointer py-1 px-2 flex text-gray-400 h-max w-max items-center border rounded">
            <Icon icon="clarity:sort-by-line" color="gray-400" height="3vh" />
            Sort
          </div>
        
          <div className="border-gray-400 p-1 flex text-gray-400 h-max w-max items-center border rounded">
          <Cuisines/>
          </div>
        </div>
        <div className="w-max h-max overflow-contain object-cover">
          <div className="border border-gray-500 md:w-[40vw] w-[75vw] rounded-2xl flex items-center p-1 shadow">
            <Icon icon="circum:search" height="3vh" color="gray" />
            <input
              className="rounded-xl px-1 text-base focus-visible:outline-none text-black placeholder:text-gray-400"
              type="text"
              name = 'searchedquery'
              placeholder="Search for your fav Dish"
              value = {Query}
              onChange={HandleQuery}
            />
          </div>
        </div>
        {/* Render Sort component conditionally based on showSort */}

      </div>
      <div className="w-screen p-3 h-max">

      <Slider {...settings}>
   
      {coupons.map((coupon)=>{
        return(
          <Couponcard code={coupon.code} discount={coupon.discount} expiry={coupon.expdate} offer={coupon.offer}/>
        )
      })}
    </Slider>
    {showSort && <div className=' flex absolute justify-center items-center h-max w-screen bg-transparent'>
        <Sort />
        </div> } 
  
      </div>
       {showmenu && <div className='w-screen h-max flex justify-center p-4'>
     
     <Sortedmenu heading={`All the ${title} Dishes`}/>

   </div> }   
      <div className='w-screen h-[100vh] flex flex-grow justify-center p-4'>
     
        <Menusection heading="you will like it"/>
   
      </div>    
    </div>
    
  );
};

export default Home;