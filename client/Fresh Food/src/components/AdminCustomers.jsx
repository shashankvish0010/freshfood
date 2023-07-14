import {React, useContext, useEffect} from 'react'
import Admincustomercard from './Admincustomercard';
import { AdminContext } from '../Context/OrdersAdmincontext';
import Footer from './Footer'

const AdminCustomers = () => {

    const GlobalTotal = useContext(AdminContext);
    // const navigate = useNavigate();
    useEffect(() => {
        GlobalTotal.dispatch({ type: 'TOTAL' });
    }, []);

    const totalcustomers = GlobalTotal.TotalCustomers;
    const activecustomers = GlobalTotal.ActiveCustomers;

  return (
    <div className='w-screen h-screen flex flex-col gap-5 p-3'>
<div className='h-max w-screen flex justify-center items-center'>
  <h1 className='text-xl font-semibold'>Customers <span className='text-red-600 text-xl font-semibold'>List</span></h1>
</div>
<div className='h-max w-screen flex flex-col items-center'>
   {
    totalcustomers.map((customer)=>(
        <Admincustomercard firstname={customer.firstname}
            lastname={customer.lastname}
            email={customer.email}
            contact={customer.contact}
            address={customer.address}
        />))
   }
</div>
 <Footer/>
    </div>
  )
}

export default AdminCustomers