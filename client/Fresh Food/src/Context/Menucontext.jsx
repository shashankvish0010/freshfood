import React, { createContext,useState, useReducer } from 'react'

const MenuContext = createContext();
const Menucontext = (props) => {
    const [items, setItems] = useState([]);

    const [sortItems, setsortItems] = useState([]);

   
        const fetchdata = async (query) =>{
        const response = await fetch(`https://freshfood-backend.onrender.com/search?q=${query}`, {
          method : "GET",
          headers : {
            "Content-Type" : "application/json"
          }
        });
  
        if(response){
          const data = await response.json();
          console.log("call");
          setItems(data);
        }else {
          console.log('Data not received');
        }
        }
     

    const getData = async () => {
        try {
          const response = await fetch('https://freshfood-backend.onrender.com/getdata', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if(response.ok) {
            const result = await response.json();
            const dishArr = [];
    
            for (let i = 0; i < result.length; i++) {
              let curr = result[i];
              for (let x = 0; x < curr.dishes.length; x++) {
                dishArr.push(curr.dishes[x]);
              }
            }
            setItems(dishArr)
           
          } else {
            console.log('Data not received');
          }
        } catch (error) {
          console.log('Data not received', error);
        }
      
      };


      const reducer = (state, action) =>{
          switch(action.type){

            case 'GET' : {
              getData();
              return items;
            }

            case 'NEW' : {
              const updatedArr = action.payload.filter((dish) => dish.tag === 'new');
               return updatedArr
               setsortItems(updatedArr)
               break;
            }

            case 'POPULAR' : {
              const updatedArr = action.payload.filter((dish) => dish.tag === 'popular');
              return updatedArr
                setsortItems(updatedArr)
               break;
            }

            case 'SPECIAL' : {
              const updatedArr = action.payload.filter((dish) => dish.tag === "today's special");
              return updatedArr
                setsortItems(updatedArr)             
               break;
            }

            case 'BESTSELLING' : {
              const updatedArr = action.payload.filter((dish) => dish.tag === 'best selling');
              return updatedArr
                setsortItems(updatedArr)          
               break;
            }

            case 'LOWTOHIGH' : {
            const updatedArr = [...action.payload];
            updatedArr.sort((a,b)=> a.price - b.price);
            return updatedArr;
             break;
            }

            case 'HIGHTOLOW' : {
             const updatedArr = [...action.payload];
             updatedArr.sort((a,b)=> b.price - a.price)
             return updatedArr;
              break;
            }

            case 'TIME' : {
              const updatedArr = [...action.payload];
              updatedArr.sort((a,b)=> a.duration - b.duration);
              return updatedArr;
            }
            case 'CUISINE' : {
            console.log(action.cuisinecateg);
            const updatedArr = action.payload.filter((dish)=> dish.cuisine === action.cuisinecateg.toString());
            return updatedArr;
            }

            default : return state;
          }
      }
     
    const setKey = (key, action) =>{
          switch (action.trigger){

            case 'NEW' : {
              return {showmenu : true, title : 'new'}
            }

            case 'BESTSELLING' : {
              return {showmenu : true, title : 'best selling'}
            }

            case 'POPULAR' : {
              return {showmenu : true, title : 'popular'}
            }

            case 'SPECIAL' : {
              return {showmenu : true, title : "today's special"}
            }

            case 'LOWTOHIGH' : {
              return {showmenu : true, title : "low to high"}
            }

            case 'HIGHTOLOW' : {
              return {showmenu : true, title : "high to low"}
            }

            case 'TIME' : {
              return {showmenu : true, title : "takes less time"}
            }
            case 'CUISINE' : {
              return {showmenu : true, title : "desired cuisine"}
            }
          }
    }

    const [state, dispatch] = useReducer(reducer,[]);

    const [key , caller] = useReducer(setKey, {showmenu : false, title : ""});

      const info = {state,items,sortItems,dispatch,key,fetchdata,caller, getData}
  return (
    <MenuContext.Provider value={info}>
        {props.children}
    </MenuContext.Provider>
  )
}

export default Menucontext
export {MenuContext};