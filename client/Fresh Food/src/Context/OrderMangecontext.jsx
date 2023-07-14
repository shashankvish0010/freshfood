import { useReducer } from 'react';
import { React, useState } from 'react'
import { createContext } from 'react';

export const OrderContext = createContext();

const OrderMangecontext = (props) => {
    const [orders, setOrders] = useState([]);
    const[venue, setVenue] = useState([]);
    const [balance, setBalance] = useState();
    // console.log(orders);

    const fetchOrders = async () => {
        try {
            const response = await fetch('/fetchorder', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response) {
                const data = await response.json();
                    setOrders(data.orders.orders);
                     setBalance(data.orders.orders.reduce((total, order) => {
                        return total = total + order.price
                    }, 0))
                    setVenue(data.orders);
            } else {
                console.log("Data not recieved");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updatestate = async (id) => {
        try {
            const response = await fetch('/dispatchorder', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    state: 'completed'
                })
            });
            if (response) {
                const data = await response.json();
                setOrders(data.orders);
                 setBalance(data.orders.reduce((total, order) => {
                    return total = total + order.price
                }, 0))
                console.log("data receieved");
            } else {
                console.log("Data not recieved");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const reducer = (state, action) => {
        switch (action.type) {

            case 'UPDATE': {
                updatestate(action.payload);
                console.log(orders);
                return orders
            }

            case 'GETORDER' : {
                fetchOrders();
                console.log(orders);
                return orders;
            }
        }
    }

    const [state, dispatch] = useReducer(reducer, [])

   

    const info = {orders,venue,dispatch, state, fetchOrders, balance };

    return (
        <OrderContext.Provider value={info}>
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderMangecontext