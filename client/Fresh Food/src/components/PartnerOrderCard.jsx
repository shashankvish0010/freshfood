import React, { useContext } from 'react'
import { Icon } from '@iconify/react'
import { OrderContext } from '../Context/OrderMangecontext';

const PartnerOrderCard = (props) => {

  const OrderGlobal = useContext(OrderContext);
  // const dispatch = OrderGlobal.dispatch();

  const getorderdata = async () => {
    OrderGlobal.dispatch({ type: 'UPDATE', payload: id });
    OrderGlobal.dispatch({ type: 'GETORDER'});
  }


  const { id, firstname,
    order,
    quantity,
    date,
    time,
    price,
    state } = props;


  return (
    <div className='h-max  w-screen flex md:flex-row flex-col md:justify-evenly items-center'>
      <div className='flex flex-row gap-4 p-3 items-center'>
        <Icon icon="iconoir:profile-circle" height='7vh' />
        <p className='text-xl font-semibold text-gray-600'>{firstname} </p>
      </div>
      <div className='flex md:flex-row flex-col w-max p-3 gap-4 md:justify-evenly items-center'>
        <p className='text-base font-semibold text-gray-600'>{order} x {quantity}</p>
        <p className='text-base font-semibold text-green-600'>Rs.{price}</p>
      </div>
      <div className='flex flex-row gap-2 p-3'>
        <p className='text-base font-semibold text-gray-600'>{date.slice(0, 10)}</p>
        <div className='flex items-center gap-1'>  <p className='text-base font-semibold text-blue-600'>{time}</p>
          {(`${time[0]}:${time[1]}}`)> '12:00' ? <p className='text-base font-semibold text-blue-600'>PM</p> : <p className='text-base font-semibold text-blue-600'>AM</p>}</div>
      </div>
      <div className='flex  flex-row items-center gap-4 p-3'>
        {state === 'completed' ? <Icon icon="fluent-mdl2:completed-solid" height='6vh' color='green' /> :
          <Icon icon="mdi:account-pending-outline" height='6vh' color='red' />
        }
        {state === 'completed' ? <p className='text-base uppercase font-semibold text-green-600'>{state}</p>
          :
          <p className='text-base uppercase font-semibold text-red-600'>{state}</p>
        }
      </div>
      {state === 'completed' ? null :
        <div id='btn'>
          <button onClick={() => getorderdata()} className='bg-violet-700 flex gap-1 rounded items-center cursor-pointer text-white font-semibold p-1'><Icon icon="pajamas:task-done" />Dispath</button>
        </div>
      }
    </div>
  )
}

export default PartnerOrderCard