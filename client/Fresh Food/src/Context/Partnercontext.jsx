import React, { useState, createContext, useEffect, useReducer } from 'react';

const PartnerDetails = createContext();

const Partnercontext = (props) => {
  

  const reduce = async (state, action)=>{
      
    switch(action.type){

      case 'LOAD' : {
        try {
          const response = await fetch('/partneradmin', {
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            }
          });
    
          if (response) {
            const data = await response.json();
            console.log("Data received", data);
            return [data.admin];
          } else {
            console.log("Data not received");
            return state;
          }
        } catch (error) {
          console.log(error);
        }
      
       return state;
      }

      case 'UPDATE' : {
         try {
          
         } catch (error) {
          console.log(error);
         }
         break;
      }

      default : return state;
    }
  }


  const [state, dispatch ] = useReducer(reduce, []);

  const info = {
    dispatch,
    
    state,
  };

  return (
    <PartnerDetails.Provider value={info}>
      {props.children}
    </PartnerDetails.Provider>
  );
};

export default Partnercontext;
export { PartnerDetails };