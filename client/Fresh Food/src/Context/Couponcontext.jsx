import React, { createContext, useEffect, useState } from 'react'

const CouponContext = createContext();
const Couponcontext = (props) => {
    
    const [coupons, setCoupons] = useState([]);
    const getCoupons = async () =>{
        try {
            const response = await fetch('/getcoupons', {
                method : "GET",
                headers : {
                    "Content-Type" : "application/json"
                }
            })

            if(response){
            const result = await response.json();
            console.log(result);
            setCoupons(result);
            }else{
                console.log("Data not received");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const info = {getCoupons, coupons}
  
  return (
   <CouponContext.Provider value={info}>
    {props.children}
   </CouponContext.Provider>
  )
}

export default Couponcontext
export {CouponContext};