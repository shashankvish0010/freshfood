import React, { useContext, useState, useEffect } from 'react'
import { Icon } from '@iconify/react';
import { context } from '../Context/Cartcontext';
import { CouponContext } from '../Context/Couponcontext';
import Footer from './Footer'


const Cart = () => {

  const [status, setStatus] = useState({success : "", message :""})
  const [code, setCode] = useState({ offercode: '' });

  const couponglobal = useContext(CouponContext);

  const coupons = couponglobal.coupons;

  const sendOrder = async () => {
    try {
      const OrderArr = state;
      const response = await fetch('https://freshfood-backend.onrender.com/saveorder', 
      { method: 'PUT',
       headers: { "Content-Type": "application/json" },
       body : JSON.stringify(OrderArr)
     });
      if (response) { const data = await response.json(); console.log("Orders saved"); }
      else { console.log("Orders can't be saved"); }

    } catch (error) {
      console.log(error);

    }
  }

    const handleInput = (e) => {

      const name = e.target.name;
      const value = e.target.value;

      setCode({ ...code, [name]: value })
    }
    const globalstate = useContext(context);
    const state = globalstate.state;
    const dispatch = globalstate.dispatch;

    useEffect(() => {
      globalstate.checkstatus();
    }, [])

    const authentication = globalstate.authentication;
    console.log(authentication);

    let initiantotalAmount = state.reduce((total, dish) => {
      return total = total + dish.quantity * dish.price;
    }, 0)

    const [totalAmount, setTotalAmount] = useState(initiantotalAmount);
    const [discountedAmount, setDiscountedAmount] = useState(0);


    useEffect(() => {
      const calculateTotalAmount = () => {
        let total = 0;
        state.map((dish) => {
          total += dish.quantity * dish.price;
        });
        setTotalAmount(total);
      };
      calculateTotalAmount();
    }, [state]);

    const todayDate = new Date(Date.now());
    const datetoday = `${todayDate.getFullYear()}-${todayDate.getMonth()}-${todayDate.getDate()}`;
    const applyCoupon = async () => {
      const expiry = coupons.find((coupon) => coupon.expdate.slice(0, 10));
      const matchedCoupon = coupons.find((coupon) => coupon.code === code.offercode && expiry >= datetoday);

      if (matchedCoupon) {
        // const usedcoupon = {code : matchedCoupon.code, offer : matchedCoupon.offer};
        const res = await fetch('https://freshfood-backend.onrender.com/updatecoupon', {
          method : 'POST',
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            code : matchedCoupon.code, offer : matchedCoupon.offer
          })
        });
        if(res){
          const data = await res.json();
         
         if(data.success === false){ setStatus({success : false, message : "Cannot Apply"}); setDiscountedAmount(0);}else{
        const discount = matchedCoupon.discount;
        const newDiscountedAmount = totalAmount - discount;
        setDiscountedAmount(newDiscountedAmount);
        setStatus({success : true, message : "Coupon Applied"})
        console.log(data.message);
        }
        // Move setButtonDisable here
       }else{console.log("Data not recieved");}
      }else {
        setDiscountedAmount(0);
        // Move setButtonDisable here as well
      }
    };

    const sendAmount = async (amount) => {
      sendOrder();
      try {
        console.log(amount);
        const data = await fetch('https://freshfood-backend.onrender.com/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
          }),
        });

        if (data) {
          const result = await data.json();
          console.log(result);
          const { success, order,key } = result;
          const options = {
            key:  key, // Enter the Key ID generated from the Dashboard
            amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: 'INR',
            name: 'Fresh Food',
            description: 'Test Transaction',
            image: 'https://example.com/your_logo',
            order_id: order.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: '/paymentverification',
            prefill: {
              name: 'Gaurav Kumar',
              email: 'gaurav.kumar@example.com',
              contact: '9000090000',
            },
            notes: {
              address: 'Razorpay Corporate Office',
            },
            theme: {
              color: '#3399cc',
            },
          };
          const razor = new window.Razorpay(options);
          razor.open();


        } else {
          console.log('Failed to receive data');
        }
      } catch (error) {
        console.log(error);
      }
    };


    if (state.length > 0) {

      return (

        <div className='w-screen h-screen flex flex-col items-center p-5 gap-7'>
          <div className='h-max w-max'>
            <p className='md:text-2xl text-base text-black font-medium'>Your cart has {state.length} dishes..</p>
          </div>

          <div className='h-max w-max flex flex-col items-center gap-5'>
            {state.map((dish) => {

              return (
                <div className='w-[80vw] hover:shadow-2xl h-max flex p-5 flex-row justify-between items-center gap-5' key={dish.id}>
                  <div className='h-[15vh] md:w-[15vw]'>
                    <img src={dish.image} alt="" className='h-full w-full object-cover' />
                  </div>
                  <div className=' md:w-[30vw] flex md:flex-row flex-col justify-between'>
                    <div>
                      <div className='text-base font-semibold'>{dish.dishname}</div>
                    </div>
                    <div>
                      <div className='text-base'>Rs.{dish.quantity * dish.price}/-</div>
                    </div>
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                    <div>
                      <Icon onClick={() => dispatch({ type: 'INCREMENT', payload: dish })} icon="zondicons:add-solid" color='red' height='3vh' />
                    </div>
                    <div className='text-base'>{dish.quantity}</div>
                    <div>
                      <Icon onClick={() => dispatch({ type: 'DECREMENT', payload: dish })} icon="zondicons:minus-solid" color='red' height='3vh' />
                    </div>
                  </div>
                  <div>
                    <Icon onClick={() => dispatch({ type: 'REMOVE', payload: dish })} icon="mdi:remove-box" color='red' height='3vh' />
                  </div>
                </div>
              );

            })}
          </div>
          <div className='text-base font-semibold flex justify-between items-center w-[80vw] p-5'>
            <p>Total</p>
            <p>Dishes {state.length}</p>
            <p>Amount</p>


            <p>Rs.{discountedAmount > 0 ? discountedAmount : totalAmount}/-</p>

          </div>
          <span><p className='text-red-600 font-semibold capitalize text-center'>{status.message}</p></span>
          <div className='h-max w-max flex md:flex-row flex-col gap-5'>
            <input type="text" placeholder='APPLY OFFER CODE' name='offercode' value={code.value} onChange={handleInput}
              className='p-2 bg-green-300 rounded md:w-[40vw] w-[60vw] placeholder:text-green-600 text-green-600 text-center border border-1 focus-visible:outline-none uppercase' />
            <button onClick={applyCoupon} className='bg-green-300 p-2 uppercase rounded text-green-600'>apply</button>
          </div>
          <div>
            <button onClick={() => { sendAmount(discountedAmount || totalAmount) }} className='bg-green-300 p-2 uppercase rounded text-green-600'>checkout</button>
          </div>
          <Footer/>
        </div>
      )

    }
    else {
      return (
        <div className='h-screen flex justify-center p-5 w-screen '>
          <p className='md:text-2xl text-base text-black font-medium'>Your cart has {state.length} dishes..</p>
        </div>
      )
    }
  }


  export default Cart