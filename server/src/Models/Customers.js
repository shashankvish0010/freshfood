const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const customerschema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    contact: {
        type: Number,
        required: true,
        unique: true,
        maxlength: 10,
        minlength: 10,
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    conpass: {
        type: String,
        required: true,
        minlength: 4
    },
    address: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
        }
    }
    ],
    coupons : [
        {
                code : {
                    type: String,
                    unique : true
                },
                offer : {
                    type: String,
                },
        }
    ],
    orders: [

        {
            dishname: {
                type: String,
                required: true,
            },

            description: {
                type: String,
                required: true,

            },

            price: {
                type: Number,
                required: true,
            },
            
          quantity : {
            type : Number,
          },
            
          orderTime : {
           type : String,
           required : true
          },
          date : {
            type : Date
          },
            status : {
                type : String,
                default : 'cancelled'
            },
            payment_id: {
                type: String,
            },
            order_id: {
                type: String,
            },
        }
    ]
});

customerschema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.CUSTOMER_SECRET);
    this.tokens = this.tokens.concat({ token: token });
    return token;
}

customerschema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next()
    }
    else {
        const salt =  Number(bcrypt.genSalt(12));
        this.password = await bcrypt.hash(this.password, salt);
        this.conpass = await bcrypt.hash(this.conpass, salt);
        next();
    }
})

const customers = mongoose.model("customers", customerschema);

module.exports = customers;