import { createContext, useReducer, useState } from "react";
import Cart from "../components/Cart";

export const context = createContext();

const Cartcontext = (props) => {

  const checkstatus = () =>{
    const cookie = document.cookie.jwt;
    console.log(document.cookie.jwt);
    if(cookie){
      setAuthentication(true);
    }
    else{
      setAuthentication(false);
    }
  }

  const reduce = (state, action) => {
    
    switch (action.type) {

      case 'ADD': {
        const isExist = state.some((dish) => dish.id === action.payload.id);
        if (isExist) {
          return state;
        } else {
          return [...state, action.payload];
        }
      }
      case 'INCREMENT': {

        const tempstate = state.map((dish)=>{

          if(dish.id === action.payload.id)
          {
            return {...dish, quantity : dish.quantity + 1}
          }
          else{
            return dish;
          }
        })

        return tempstate;
      }
      case 'DECREMENT': {
       const tempstate = state.map((dish)=>{
        if(dish.id === action.payload.id){
          if(dish.quantity > 0){
           return {...dish, quantity : dish.quantity-1}
          }
          else{
            return {...dish, quantity : 0}
          }
        }
        else{
          return dish;
        }
       })

       return tempstate;
      }

      case 'REMOVE': {
       const tempstate = state.filter((dish)=> dish.id != action.payload.id);
       return tempstate;
      }

      default:
        return state;

    }
  }

  const [state, dispatch] = useReducer(reduce, []);
  const [authentication, setAuthentication] = useState(false);

  const info = { state, dispatch, authentication , checkstatus};
  const name = 8;
  return (
    <context.Provider value={info}>
      {props.children}
    </context.Provider>
  )
}

export default Cartcontext;

