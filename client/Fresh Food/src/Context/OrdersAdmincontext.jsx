import React, { createContext, useReducer, useState, useEffect } from 'react';

export const AdminContext = createContext();

const OrdersAdmincontext = (props) => {
  const [TotalOrders, setTotalOrders] = useState([]);
  const [TotalCustomers, setTotalCustomers] = useState([]);
  const [ActiveCustomers, setActiveCustomers] = useState([]);
  const [Partners, setPartners] = useState([]);
  const [Balance, setBalance] = useState();
  const [Menu, setMenu] = useState([]);

  useEffect(() => {
    totalorder();
  }, []);

  const totalorder = async () => {
    try {
      const response = await fetch('/totalorders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.totalorders);
        setTotalOrders(data.totalorders);
        setTotalCustomers(data.customerdat);
        setActiveCustomers(data.customerconfig);
        setPartners(data.partnersdata);
        const totalBalance = data.totalorders.reduce((total, order) => total + order.price, 0);
        setBalance(totalBalance);
      } else {
        console.log('Data not received');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlepartmenu = (Menu) =>{
     setMenu(Menu);
     console.log(Menu); 
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'TOTAL': {
        totalorder();
        console.log(TotalOrders);
        return TotalOrders;
      }
      case 'CUSTOMERS': {
        totalorder();
        return TotalCustomers;
      }

      case 'MENU' : {
        handlepartmenu(action.payload);
        return Menu;
      }

      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, []);

  const info = {
    dispatch,
    TotalCustomers,
    TotalOrders,
    ActiveCustomers,
    Balance,
    Partners,
    Menu
  };

  return (
    <AdminContext.Provider value={info}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default OrdersAdmincontext;
