import React from 'react';
import { Icon } from '@iconify/react';
import Footer from './Footer';
const About = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-5 items-center p-3">
      <div>
        <h1 className="text-red-600 font-semibold text-2xl">About Fresh Food</h1>
      </div>
      <div className="h-max w-[90vw] flex flex-col justify-evenly gap-5 shadow-xl rounded p-5">
        <p className="text-base space-y-1 font-normal">
          Fresh Food is a full-stack project developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack, along with React.js for the front end and Tailwind CSS for styling. It leverages modern technologies to create a seamless platform for customers, food partners, and the admin team.
        </p>
        <h1 className="font-semibold text-xl">Features offered :</h1>
        <ul className="pl-5">
          <li className='flex flex-row items-center h-max gap-2'>
          <Icon icon="codicon:activate-breakpoints" height='3vh' color='red'/>
            Acts as a technology platform connecting customers and food partners.
          </li>
          <li  className='flex flex-row items-center h-max gap-2'>
          <Icon icon="codicon:activate-breakpoints" height='3vh' color='red'/>
            Offers multiple roles: Customers, Fresh Food Admin, and Food Partners Admin.
          </li>
          <li  className='flex flex-row items-center h-max gap-2'>
          <Icon icon="codicon:activate-breakpoints" height='3vh' color='red'/>
            Implements authentication using JWT (JSON Web Tokens) for secure access to admin functionalities.
          </li>
          <li  className='flex flex-row items-center h-max gap-2'>
          <Icon icon="codicon:activate-breakpoints" height='3vh' color='red'/>
          Preserving cookies for future data collection and secure requests to confirm users identities at the backend          </li>
          <li  className='flex flex-row items-center h-max gap-2'>
          <Icon icon="codicon:activate-breakpoints" height='3vh' color='red'/>
            Does not rely on third-party APIs; all data is stored within the application.
          </li>
          <li  className='flex flex-row items-center h-max gap-2'>
          <Icon icon="codicon:activate-breakpoints" height='3vh' color='red'/>
            Fresh Food Admin can manage coupon codes for promotional offers and discounts.
          </li>
          <li  className='flex flex-row items-center h-max gap-2'>
          <Icon icon="codicon:activate-breakpoints" height='3vh' color='red'/>
            Utilizes REST APIs for data retrieval and manipulation from database via backend routes, No additional third party Api is used.
          </li>
          <li  className='flex flex-row items-center h-max gap-2'>
          <Icon icon="codicon:activate-breakpoints" height='3vh' color='red'/>
            Enables food partners to easily add, edit, or remove dishes from their menus with CRUD operations.
          </li>
          <li  className='flex flex-row items-center h-max gap-2'>
          <Icon icon="codicon:activate-breakpoints" height='3vh' color='red'/>
            Provides comprehensive analytics for Fresh Food Admin, including sales tracking, customer count, and more.
          </li>
          <li className='flex flex-row items-center h-max gap-2'>
          <Icon icon="codicon:activate-breakpoints" height='3vh' color='red'/>
          Integration of a payment gateway using the Razorpay API to collect payments from customers.
          </li>
          <li className='flex flex-row items-center h-max gap-2'>
          <Icon icon="codicon:activate-breakpoints" height='3vh' color='red'/>
          The admin panel includes promotional offers and vouchers to lower consumers' expenses.
          </li>
          <li className='flex flex-row items-center h-max gap-2'>
          <Icon icon="codicon:activate-breakpoints" height='3vh' color='red'/>
          Customers can sort dishes by new, best selling, most popular, today's special, duration, and price.           </li>
        </ul>
        <p className="text-base font-normal">
          In summary, Fresh Food is a feature-rich project that leverages modern technologies to create a seamless platform for customers, food partners, and the admin team. It enables efficient management of food-related operations while providing valuable insights for business growth and optimization.
        </p>
      </div>
      <Footer/>
    </div>
  );
};

export default About;
