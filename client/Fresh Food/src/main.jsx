import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Footer from './components/Footer.jsx'
// import Cart from './components/Cart.jsx'
import './index.css'
import Cartcontext  from './Context/Cartcontext.jsx'
import Couponcontext from './Context/Couponcontext.jsx'
import Menucontext from './Context/Menucontext.jsx'
import Popupcontext from './Context/Popupcontext.jsx'
import Partnercontext from './Context/Partnercontext.jsx'
import OrderMangecontext from './Context/OrderMangecontext.jsx'
import OrdersAdmincontext from './Context/OrdersAdmincontext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  
<Cartcontext>
<Couponcontext>
<Menucontext>
<Popupcontext>
<Partnercontext>
<OrderMangecontext>
<OrdersAdmincontext>
<App />
</OrdersAdmincontext>
</OrderMangecontext>
</Partnercontext>
</Popupcontext>
</Menucontext>
</Couponcontext>
</Cartcontext>

  // {/* </React.StrictMode>, */}
)
