
# Fresh Food


![20230715_022025](https://github.com/shashankvish0010/freshfood/assets/140178357/2d1d6611-79e2-475e-b7a0-53e8e1141ee7)

Fresh Food is a full-stack project developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack, along with React.js for the front end and Tailwind CSS for styling. It leverages modern technologies to create a seamless platform for customers, food partners, and the admin team.



![20230715_022838](https://github.com/shashankvish0010/freshfood/assets/140178357/78988288-b02d-44bb-9aea-8cd7fe3eda7b)

## Features

- Acts as a technology platform connecting customers and food partners.
- Offers multiple roles: Customers, Fresh Food Admin, and Food Partners Admin.
- Implements authentication using JWT (JSON Web Tokens) for secure access to admin functionalities.
- Preserving cookies for future data collection and secure requests to confirm users' identities at the backend.
- Does not rely on third-party APIs; all data is stored within the application.
- Fresh Food Admin can manage coupon codes for promotional offers and discounts.
- Utilizes REST APIs for data retrieval and manipulation from the database via backend routes. No additional third-party API is used.
- Enables food partners to easily add, edit, or remove dishes from their menus with CRUD operations.
- Provides comprehensive analytics for Fresh Food Admin, including sales tracking, customer count, and more.
- Integration of a payment gateway using the Razorpay API to collect payments from customers.
- The admin panel includes promotional offers and vouchers to lower consumers' expenses.
- Customers can sort dishes by new, best-selling, most popular, today's special, duration, and price.



 
![20230715_023314](https://github.com/shashankvish0010/freshfood/assets/140178357/e769f44c-216e-45d4-9f69-263421211045)


## Technologies Used![20230715_023759](https://github.com/shashankvish0010/freshfood/assets/140178357/f321a630-7716-4136-ad2a-4e4386aedd16)


- MongoDB: Database for storing data
- Express.js: Backend framework for handling server-side logic
- Vite + React.js: Frontend library for building user interfaces
- Node.js: JavaScript runtime environment for server-side development
- Tailwind CSS: Utility-first CSS framework for styling

  

![20230715_024212](https://github.com/shashankvish0010/freshfood/assets/140178357/bcf33122-fd15-4a04-9a8c-d7043e06bcad)



![20230715_024523](https://github.com/shashankvish0010/freshfood/assets/140178357/59d85be0-2593-44e0-a002-af2b68291156)

## Getting Started
1. Clone the repository.
2. Install the necessary dependencies using "npm install"
3. Set up environment variables, such as MongoDB connection URL and API keys.
To run the project, you'll need to set up the following environment variables:

- `PORT`: Port number for the server (e.g., 8000).
- `CUSTOMER_SECRET`: Secret key for customer authentication.
- `PARTNER_SECRET`: Secret key for food partners authentication.
- `ADMIN_SECRET`: Secret key for admin authentication.
- `RAZORPAY_KEY`: API key for integrating with the Razorpay payment gateway.
- `RAZORPAY_KEY_SECRET`: Secret key for the Razorpay API.
- `MONGODB_URI`: MongoDB connection URL.
4. Run the development server using the provided scripts.

 For Client side : 
- 1> cd client
- 2> cd "Fresh Food"
- 3> npm run dev

 For Server side : 
- 1> cd server
- 2> npm run dev

5. Access the application in your browser.

Front end of Fresh Food will run on - http://localhost:5173/

Back end of Fresh Food will run on - http://localhost:8000/



![20230715_025734](https://github.com/shashankvish0010/freshfood/assets/140178357/1744b4f8-4333-43ab-91a1-89bdadc5775b)



![20230715_025226](https://github.com/shashankvish0010/freshfood/assets/140178357/d0101a0d-87a7-497a-974f-d55351614a58)
## Usage

## Instructions for Customers:

1. Register or log in: As a customer, you can register a new account or log in using your credentials.

2. Browse available dishes: Once logged in, you can browse the available dishes. Use the search or filtering options to find specific types of dishes or explore the entire menu.

3. Place an order: Select the desired dishes and add them to your cart. Proceed to the checkout process and provide any necessary details such as coupon code and payment information.

4. Track your order: After placing an order, you can track its status through your profile whether your order is completed or not.

## Instructions for Food Partners:

1. Register as a food partner: Food partners can register their restaurants or food businesses through the registration process provided in the application.

2. Manage menu items: Once registered and logged in, food partners can manage their menu items. They can add new dishes, edit existing ones, and update their tags when necessary.

3. Track orders: Food partners can track and manage incoming orders through a dedicated dashboard. They can view order details, update the status (completed).

4. Manage account settings: Food partners can update their account information, including contact details, menu.

5. Manage customer data & balance: Food Partners can access their customers and check their revenue.

## Instructions for the Admin Team:

1. Access the admin panel: The admin team can access a separate admin panel with enhanced functionalities and privileges.

2. Manage food partners: The admin team can manage the list of food partners, approving new registrations, or suspending/deleting existing accounts when necessary.

3. Analyze sales and customer data: The admin panel provides comprehensive analytics and reports. The team can track sales, customer count, popular dishes, and other key performance indicators to gain insights and make data-driven decisions.

4. Manage promotional offers: The admin team can create and manage promotional offers, including coupon codes, discounts, and special deals, to attract customers and encourage orders.

5. Monitor and resolve issues: The admin team can monitor the platform for any issues, such as customer complaints or technical glitches, and take appropriate actions to resolve them promptly.


In summary, Fresh Food is a feature-rich project that leverages modern technologies to create a seamless platform for customers, food partners, and the admin team. It enables efficient management of food-related operations while providing valuable insights for business growth and optimization.

# freshfood
Fresh Food is a feature-rich project that leverages modern technologies to create a seamless platform for customers, food partners, and the admin team. It enables efficient management of food-related operations while providing valuable insights for business growth and optimization.

