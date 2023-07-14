import {React, useContext, useEffect} from 'react'
import { AdminContext } from '../Context/OrdersAdmincontext';
import AdminPartnerCard from './AdminPartnerCard';
import Footer from './Footer'

const AdminPartners = () => {

    const GlobalTotal = useContext(AdminContext);
    // const navigate = useNavigate();
    useEffect(() => {
        GlobalTotal.dispatch({ type: 'TOTAL' });
    }, []);

    const totalpartners = GlobalTotal.Partners;


  return (
    <div className='w-screen h-screen flex flex-col gap-5 p-3'>
<div className='h-max w-screen flex justify-center items-center'>
  <h1 className='text-xl font-semibold'>Customers <span className='text-red-600 text-xl font-semibold'>List</span></h1>
</div>
<div className='h-max w-screen gap-5 flex flex-wrap justify-evenly items-center'>
   {
    totalpartners.map((partner)=>(
        <AdminPartnerCard 
        venuename={partner.venuename}
            firstname={partner.firstname}
            lastname={partner.lastname}
            email={partner.email}
            contact={partner.contact}
            address={partner.address}
            orders={partner.orders}
            dishes={partner.dishes}
        />))
   }
</div>
 <Footer/>
    </div>
  )
}

export default AdminPartners