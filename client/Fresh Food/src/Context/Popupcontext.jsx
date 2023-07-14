import React, { createContext , useReducer, useState} from 'react'

const Popup = createContext();
const Popupcontext = (props) => {

    
    const reducer = (showSort, action) =>{

        switch(action.type){
            case 'SHOW' : {
               return !showSort;
            };

            case 'CLOSE' : {
               return !showSort;
            };

            default : return showSort;
        }
       
    }


    const [showSort, dispatch] = useReducer(reducer, false)
    const info = {
        dispatch,
        showSort
    }
  return (
    <Popup.Provider value={info}>
        {props.children}
    </Popup.Provider>
  )
}

export default Popupcontext
export {Popup}