const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const customers = require('../Models/Customers');
const partners = require('../Models/Foodpartners');
const admins = require('../Models/Freshfoodadmin');
const coupons = require('../Models/coupon');
const customerdata = require('../Models/Orderdata');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { ObjectId } = require('mongodb')
const crypto = require('crypto')
const Razorpay = require('razorpay');
const { resolve6 } = require('dns');
const { devNull } = require('os');

router.use(bodyParser.json());

router.use(cors());
router.use(cookieParser());

router.get('/', (req, res) => {
  res.send('Backend hello');
});

router.get('/getdata', async (req, res) => {
  try {

    const data = await partners.find();
    console.log(data.length);
    res.json(data)
    const result = data.map((curr, index) => {


      (curr.dishes[index]);


    })
    if (result) {
      res.json(result);
    }
    else {
      res.json({ success: true, message: "data not sent" });
    }

  } catch (error) {
    console.log(error);
  }
})

router.get('/profiledata', async (req, res) => {
  const userToken = req.cookies.jwt;
  const decUserToken = jwt.decode(userToken);
  let userId = decUserToken.id;
  if (!userId) {
    userId = decUserToken._id;
  }
  console.log(userId);
  try {
    let userdata = ""
    const cust = await customers.findOne({ _id: userId });
    if (cust) {
      userdata = cust;
      console.log("from", userdata);
      res.status(200).json({ success: true, userdata });
    } else {
      const part = await partners.findOne({ _id: userId });
      if (part) {
        userdata = part;
        console.log("from", userdata);
        res.status(200).json({ success: true, userdata });
      }
      else {
        const admin = await admins.findOne({ _id: userId });
        if (admin) {
          userdata = admin;
          res.status(200).json({ success: true, userdata });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.put('/updateprofile', async (req, res) => {

  const { firstname,
    lastname,
    email,
    contact } = req.body;

    const userToken = req.cookies.jwt;
    const decUserToken = jwt.decode(userToken);
    let userId = decUserToken.id;
    if (!userId) {
      userId = decUserToken._id;
    }

  try {
    const cust = await customers.findOne({  _id: userId  });
    if (cust) {
      const result = await customers.updateOne({  _id: userId  }, {
        $set: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          contact: contact
        }
      });
     result ? res.json({success : true}) : res.json({success : false})
    } else {
      const part = await partners.findOne({  _id: userId  });
      if (part) {
        const result = await partners.updateOne({  _id: userId  }, {
          $set: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            contact: contact
          }
        });
        result ? res.json({success : true}) : res.json({success : false})
      }
      else {
        const admin = await admins.findOne({  _id: userId  });
        if (admin) {
          const result = await admins.updateOne({  _id: userId  }, {
            $set: {
              firstname: firstname,
              lastname: lastname,
              email: email,
              contact: contact
            }
          });
          result ? res.json({success : true}) : res.json({success : false})
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
})
router.put('/saveorder', async (req, res) => {
  const OrderArr = req.body;
  try {

    const token = req.cookies.jwt;
    const decodeToken = jwt.decode(token);
    const userId = decodeToken._id;
    console.log(userId);
    const user = await customers.findOne({ _id: userId });

    const date = new Date();
    const todaysdate = Date.now();
    const time = `${date.getHours()} : ${date.getMinutes()}`;

    OrderArr.map((dish) => {
      const { dishname,
        description,
        price,
        quantity } = dish;

      const item = {
        dishname,
        description,
        price,
        quantity,
        orderTime: time,
        date: todaysdate,
      };

      user.orders.push(item);
    })
    const result = await user.save();
    result ? console.log("order save") : console.log("order not save")
  } catch (error) {
    console.log(error);
  }
})

router.get('/getorders', async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decodeToken = jwt.decode(token);
    const userId = decodeToken._id;

    const user = await customers.findOne({ _id: userId });
    if (user) {
      res.json({ success: true, orders: user.orders })
    }
  } catch (error) {
    console.log(error);
  }
})

router.get('/getcoupons', async (req, res) => {
  try {
    const result = await coupons.find();
    res.json(result);
  } catch (error) {
    console.log("coupons", error);
  }

})

router.post('/register', async (req, res) => {
  const { firstname, lastname, email, contact, password, conpass, address } = req.body;

  if (!firstname || !lastname || !email || !contact || !password || !conpass || !address) {
    res.json({ success: false, message: 'Please enter data in all fields' });
  }

  try {
    const user = await customers.findOne({ email: email });
    if (user) {
      res.json({ success: false, message: 'Email already in use' });
    }
    const existingContactUser = await customers.findOne({ contact: contact });

    if (existingContactUser) {
      res.json({ success: false, message: 'Contact No. already in use' });
    } else {
      const customer = new customers({
        firstname,
        lastname,
        email,
        contact,
        password,
        conpass,
        address,
      });



      const result = await customer.save();
      console.log(result);
      res.json({ success: true, message: 'Registration Successfull' });

    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
});

router.post('/customerlogin', cors(), async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Fill all the details" });
  }

  try {
    const customer = await customers.findOne({ email: email });

    if (!customer) {
      return res.json({ success: false, message: "Email doesn't exist" });
    }

    const match = await bcrypt.compare(password, customer.password);

    if (!match) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = await customer.generateAuthToken();
    return res.json({ success: true, token });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

router.get('/admin-panel', (req, res) => {
  const token = req.cookies.jwt;
  const ver = async () => {
    if (token) {

      const verify = jwt.verify(token, process.env.ADMIN_SECRET, (err, dec) => {
        console.log('Token  verification stage');
        if (err) {
          console.log("Verfication failed");
          res.json({ key: false });
        }
        else {
          console.log("Verified");
          const fetchdata = async () => {
            const decoded = jwt.decode(token);
            const admin = await admins.findOne({ _id: decoded.id });
            res.json({ key: true, admin });
          }
          fetchdata();
        }
      })

    }
    else {
      res.json({ key: false });
      console.log("Token is null or empty");
    };

  }

  ver();
})




router.post('/addpartner', async (req, res) => {
  const { venuename, firstname, lastname, email, password, confirmpassword, contact, address } = req.body;

  if (!venuename || !firstname || !lastname || !email || !contact || !password || !confirmpassword || !address) {
    res.json({ success: false, message: 'Please enter data in all fields' });
  }
  try {

    const emailExsits = await partners.findOne({ email });

    if (emailExsits) {
      res.json({ success: false, message: "Email already registered" })
    }

    const contactExists = await partners.findOne({ contact });

    if (contactExists) {
      res.json({ success: false, message: "Contact already registered" })
    }
    else {
      const partner = new partners({
        venuename, firstname, lastname, password, confirmpassword, email, contact, address
      })

      const token = await partner.generateAuthToken();

      await partner.save();

      res.json({ success: true, token: token, message: "Registered Successfully" })
    }

  } catch (error) {
    console.log(error);
  }
}
);

router.post('/partnerlogin', async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    res.json({ success: 'false', message: "Please fill all the field.." })
  }

  try {

    const partner = await partners.findOne({ email });
    if (!partner) {
      res.json({ success: 'false', message: "Email doesn't exists" });
    }
    const match = await bcrypt.compare(password, partner.password)
    if (!match) {
      res.json({ success: 'false', message: "Invalid password" });
    }
    else {
      const token = await partner.generateAuthToken();
      console.log(token, "enter here")
      res.json({ token });
    }
  } catch (error) {
    console.log(error);
  }

})


router.get('/partneradmin', async (req, res) => {
  const token = req.cookies.jwt;

  if (token) {

    const verify = jwt.verify(token, process.env.PARTNER_SECRET, (err, dec) => {
      if (err) {
        console.log("Verification failes");
        res.json({ key: false })

      }
      else {
        console.log("Verified");
        const fetchdata = async () => {
          const decoded = jwt.decode(token);
          const admin = await partners.findOne({ _id: decoded.id })
          console.log(decoded.id);
          res.json({ key: true, admin })
        }
        fetchdata();
      }

    })
  }
  else {
    res.json({ key: false })
  }
})

router.put('/add-dish', async (req, res) => {
  const { dishname, description, price, image, category, cuisine, tag } = req.body;

  if (!dishname || !description || !price || !image || !category || !cuisine || !tag) {
    res.json({ sucess: false, message: "please fill all the fields" });
  }

  const token = req.cookies.jwt;
  const decoded = jwt.decode(token);
  const user = await partners.findOne({ _id: decoded.id });

  try {
    const dish = {
      dishname,
      description,
      price,
      image,
      category,
      cuisine,
      tag
    }

    let dishExists = false;
    for (let i = 0; i < user.dishes.length; i++) {

      // console.log(user.dishes[i].dishname);
      if (dishname === user.dishes[i].dishname) {
        dishExists = true;
        break;
      }

    }

    if (dishExists) {
      res.json({ success: false, message: "dish already added" })
    }
    else {
      user.dishes.push(dish);
      const result = await user.save();
      result ?
        res.json({ success: true, message: "dish added successfully" }) :
        res.json({ success: false, message: "sorry, dish not added" })
    }


  } catch (error) {
    console.log(error);
  }
})

router.put('/edit-dish', async (req, res) => {

  const { id,
    image,
    dishname,
    description,
    cuisine,
    price,
    duration,
    tag, } = req.body;

  const token = req.cookies.jwt;
  const decoded = jwt.decode(token);
  const user = await partners.findOne({ _id: decoded.id });

  for (let i = 0; i < user.dishes.length; i++) {
    const dishId = user.dishes[i]._id;

    console.log(dishId);

    const dishObjectId = new ObjectId(id);
    if (dishObjectId.equals(dishId)) {
      await partners.updateOne(
        { _id: decoded.id, 'dishes._id': dishId },
        {
          $set: {
            'dishes.$.image': image,
            'dishes.$.dishname': dishname,
            'dishes.$.description': description,
            'dishes.$.cuisine': cuisine,
            'dishes.$.price': price,
            'dishes.$.duration': duration,
            'dishes.$.tag': tag,
          },
        }
      );


      console.log("Dish updated");
      break;
    }
    else {
      continue;
    }
  }
});

router.get('/search', async (req, res) => {
  const { q } = req.query;
  const wholeData = await partners.find();

  let Totaldishes = [];
  for (let i = 0; i < wholeData.length; i++) {
    const user = wholeData[i];
    for (let x = 0; x < user.dishes.length; x++) {
      let currDish = user.dishes[x];
      Totaldishes.push(currDish);
    }
  }

  const search = () => {
    key = ['dishname', 'description'];

    const finalArr = Totaldishes.filter(item =>
      key.some(keyItem => item[keyItem].toLowerCase().includes(q))
    );

    res.json(finalArr);
  }
  search();
});

router.put('/dispatchorder', async (req, res) => {
  const { id, state } = req.body;
  console.log(id, state);
  try {
    const token = req.cookies.jwt;
    const decodeToken = jwt.decode(token);
    const partnerId = decodeToken.id;

    const venuedata = await partners.findOne({ _id: partnerId });

    venuedata.orders.map(async (order) => {
      if (order._id.toString() === id) {
        order.state = state;
        const res = await venuedata.save();
        res ? console.log("State changed") : console.log("State not");
      }
    })
  } catch (error) {
    console.log(error);
  }
})

router.get('/fetchorder', async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const decodeToken = jwt.decode(token);
    const partnerId = decodeToken.id;

    const venuedata = await partners.findOne({ _id: partnerId });


    res.json({ success: true, orders: venuedata });
  } catch (error) {
    console.log(error);
  }
})

router.get('/totalorders', async (req, res) => {
  try {
    const partnersdata = await partners.find();
    const customerdat = await customers.find();
    const customerconfig = await customerdata.find();
    // const totalcustomers = [];

    const totalorders = [];
    const totalcustomers = [];

    for (let i = 0; i < partnersdata.length; i++) {
      const curr = partnersdata[i];
      console.log(1);
      for (let x = 0; x < curr.orders.length; x++) {
        const currorder = curr.orders[x];
        if (currorder.state === 'completed') {
          totalorders.push(currorder);

        } else {
          continue;
        }

        if (customerconfig.length > 0) {
          const ifFound = customerconfig.find((customer) => customer.contact === currorder.customer.contact)
          if (ifFound) {
            console.log(ifFound);
            continue

          } else {
            console.log('3');
            const newCustomer = new customerdata({
              name: currorder.customer.name,
              email: currorder.customer.email,
              contact: currorder.customer.contact,
            });

            const result = await newCustomer.save();
            result ? console.log("Order data saved") : console.log("Order data couldn't be saved");
            console.log(customerconfig);
          }
        } else {
          const newCustomer = new customerdata({
            name: currorder.customer.name,
            email: currorder.customer.email,
            contact: currorder.customer.contact,
          });

          const result = await newCustomer.save();
          result ? console.log("Order data saved") : console.log("Order data couldn't be saved");
          console.log(customerconfig);
        }
      }
    }

    res.json({ success: true, customerdat, customerconfig, partnersdata, totalorders });
  } catch (error) {
    console.log(error);
  }
});

router.post('/updatecoupon', async (req, res) => {
  const { code, offer } = req.body;

  try {
    const token = req.cookies.jwt;
    const decodedtoken = jwt.decode(token);
    const id = decodedtoken._id;
    const usedcoupon = { code: code, offer: offer };
    const customer = await customers.findOne({ _id: id });

    customer.coupons.push(usedcoupon);
    const result = await customer.save();
    result ? res.json({ success: true, message: "Applied" }) : res.json({ success: false, message: "Already Applied" })
  } catch (error) {
    console.log(error);
  }
})

router.post('/checkout', async (req, res) => {

  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options)
    res.json({ success: true, order, key: process.env.RAZORPAY_KEY })
  } catch (error) {
    console.log(error);
  }
})

router.post('/paymentverification', async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (generated_signature === razorpay_signature) {

    const token = req.cookies.jwt;
    const decodeToken = jwt.decode(token);
    const userId = decodeToken._id;

    const user = await customers.findOne({ _id: userId });
    const date = new Date();
    const time = `${Date.now()} : ${date.getHours()} : ${date.getMinutes()}`;
    user.orders.map((dish) => {

      if (!dish.payment_id) {
        dish.status = 'completed';
        dish.payment_id = razorpay_payment_id;

      }
    });
    const result = await user.save()
    result ?
      res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`) : console.log("Order not fullfilled");
  } else {
    res.json({
      success: false
    })
  }

  console.log(req.body);
})

router.put('/sendorder', async (req, res) => {
  const { referenceno } = req.body;

  try {
    const token = req.cookies.jwt;
    const decodeToken = jwt.decode(token);
    const userId = decodeToken._id;

    const user = await customers.findOne({ _id: userId });
    const cart = [];

    user.orders.forEach((dish) => {
      if (dish.payment_id === referenceno) {
        cart.push(dish);
      }
    });

    const partnerdata = await partners.find();

    for (let i = 0; i < partnerdata.length; i++) {
      const venue = partnerdata[i];
      console.log(venue.venuename);
      for (let x = 0; x < venue.dishes.length; x++) {
        const dishName = venue.dishes[x].dishname;
        const d = new Date();
        const time = `${d.getHours()} : ${d.getMinutes()}`;

        for (let c = 0; c < cart.length; c++) {

          if (cart[c].dishname === dishName) {
            const order = {
              dishname: cart[c].dishname,
              description: cart[c].description,
              price: cart[c].price,
              quantity: cart[c].quantity,
              orderTime: time,
              date: cart[c].date,
              customer: {
                name: user.firstname,
                email: user.email,
                contact: user.contact
              }
            };

            venue.orders.push(order);
            const result = await venue.save();

            break; // Break out of the innermost loop once a match is found
          } else {
            continue
          }
        }
      }
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//  result ? console.log("res upd") : console.log("res not upd");

router.post('/soft-admin', async (req, res) => {
  const { firstname, lastname, email, contact, activationkey, password, confirmpassword } = req.body;

  try {
    const admin = new admins({
      firstname, lastname, email, contact, activationkey, password, confirmpassword
    })

    const token = await admin.generateAuthToken();

    const result = await admin.save();

    console.log("Fresh food admin save");

  } catch (error) {
    res.json({ success: false, message: error });
  }
})

router.post('/softadmin-login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({ success: false, message: "Please fill both the fields" });
  }
  try {

    const admin = await admins.findOne({ email });
    if (!admin) {
      res.json({ success: false, message: "Email doesn't exists" });
    }
    const match = bcrypt.compare(password, admin.password);
    if (!match) {
      res.json({ success: false, message: "Invalid Password" });
    }
    else {
      const token = await admin.generateAuthToken();
      res.json({ token });
    }

  } catch (error) {
    console.log(error);
  }
})

router.post('/createcoupon', async (req, res) => {
  const { code, discount, expdate, offer } = req.body;

  if (!code || !discount || !expdate || !offer) {
    res.json({ success: false, message: "Fill all the fields" });
  }

  try {
    const coupon = await coupons.findOne({ code });

    if (coupon) {
      res.json({ success: false, message: "Coupon code already exists" });
    }
    else {
      const coupon = new coupons({
        code, discount, expdate, offer
      })

      const result = await coupon.save();

      if (result) {
        res.json({ success: true, message: "Coupon code created" })
      }
      else {
        res.json({ success: flase, message: "Coupon code not created" });

      }
    }
  }
  catch (error) {
    console.log(error);
  }
})


router.get('/api/customers', async (req, res) => {
  try {
    const customerdb = await customers.find();
    res.json(customerdb)
    console.log(customerdb);
  } catch (error) {
    console.log(error)
  }
})
module.exports = router;