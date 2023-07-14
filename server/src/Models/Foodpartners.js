const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const partnerschema = new mongoose.Schema({

    venuename: {
        type: String,
        required: true
    },
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
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new error("Email not valid")
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        minlength: 10,
        maxlength: 10,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
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

            quantity: {
                type: Number,
            },

            orderTime: {
                type: String,

            },
            state: {
                type: String,
                default: 'pending'
            },
            date: {
                type: Date
            },
            customer: {
                name: { type: String },
                email: { type: String },
                contact: { type: Number }
            }
        }
    ],

    tokens: [{
        token: {
            type: String
        }
    }],
    dishes: [{
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
        image: {
            type: String,
            required: true,

        },
        category: {
            type: String,
            required: true,
        },
        cuisine: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
            enum: ['best selling', 'popular', 'new', 'todays special']
        },
        duration: {
            type: Number,
        }
    },]
})

partnerschema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ id: this._id }, process.env.PARTNER_SECRET);
    this.tokens = this.tokens.concat({ token: token });
    return token;
}

partnerschema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    else {
        const salt = Number(bcrypt.genSalt(12));
        this.password = await bcrypt.hash(this.password, salt);
        this.confirmpassword = await bcrypt.hash(this.confirmpassword, salt);
        next();
    }
})
const partner = mongoose.model("partner", partnerschema);

module.exports = partner;