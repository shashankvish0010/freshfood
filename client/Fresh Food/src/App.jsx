import React from 'react'
import Home from './components/Home'
import Header from './components/Header'
import About from './components/About'
import Admin from './components/Admin'
import Register from './components/Register'
import Login from './components/Login'
import Adddish from './components/Adddish'
import Partnerreg from './components/Partnerreg'
import Partneradmin from './components/Partneradmin'
import Partnerlogin from './components/Partnerlogin'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Adminlogin from './components/Adminlogin'
import Adminreg from './components/Adminreg'
import Coupon from './components/Coupon'
import Cartcontext from './Context/Cartcontext'
import Cart from './components/Cart'
import Editdish from './components/Editdish'
import Report from './components/Report'
import Paymentsuccess from './components/Paymentsuccess'
import Profile from './components/Profile'
import CustomerOrder from './components/CustomerOrder'
import ManageOrders from './components/ManageOrders'
import Customerlist from './components/Customerlist'
import AdminOrders from './components/AdminOrders'
import AdminCustomers from './components/AdminCustomers'
import AdminPartners from './components/AdminPartners'
import PartnerMenu from './components/PartnerMenu'
import Contact from './components/Contact'
import ProfileEdit from './components/ProfileEdit'


const App = () => {
  return (
    <Cartcontext>
      <div className='flex flex-col min-h-[100vh]'>
        <Router>
     <Header/>
          <main className='flex-grow'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/total-customers" element={<AdminCustomers />} />
              <Route path="/total-partners" element={<AdminPartners />} />
              <Route path="/track-order" element={<AdminOrders />} />
              <Route path="/partnermenu" element={<PartnerMenu />} />
              <Route path="/customerlist" element={<Customerlist />} />
              <Route path="/manageorders" element={<ManageOrders />} />
              <Route path="/orders" element={<CustomerOrder />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/edit" element={<ProfileEdit />} />
              <Route path="/report" element={<Report />} />
              <Route path="/paymentsuccess" element={<Paymentsuccess />} />
              <Route path="/editdish" element={<Editdish />} />
              <Route path="/admin-register" element={<Adminreg />} />
              <Route path="/admin-login" element={<Adminlogin />} />
              <Route path="/create-coupon" element={<Coupon />} />
              <Route path="/partner-register" element={<Partnerreg />} />
              <Route path="/main-panel" element={<Partneradmin />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/adddish" element={<Adddish />} />
              <Route path="/partner-login" element={<Partnerlogin />} />
            </Routes>
          </main>
         
        </Router>
      </div>
    </Cartcontext>
  );
};

export default App