const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminschema = new mongoose.Schema({

    firstname : {
        type : String,
        required : [true, "Please fill your firstname"]
    },
    lastname : {
        type : String,
        required : [true, "Please fill your lastname"]
    },
    email : {
        type : String,
        unique : true,
        required : [true, "Please fill your email"]
    },
    contact : {
        type : Number,
        minlength : 10,
        maxlength : 10,
        unique : true,
        required : [true, "Please fill your contact"]
    },
    activationkey : {
        type : String,
        required : [true, "Please fill your activation key"],
        enum : ['AXCYBH1', 'ZXCVBH2', 'GHFDSA3', 'HJDSAE4', 'JKLHTY5', 'LOIJUR6'],
    },
    password : {
        type : String,
        required : [true, "Enter a password"]
    },
    confirmpassword : {
        type : String,
        required : [true, "Confirm password"]
    },
    tokens : [
        {
        token : {
            type : String,
        }
    }
    ]
});


adminschema.methods.generateAuthToken =  function(){
    const token = jwt.sign({id : this._id}, "THISISASECRETKEYFORADMINS");
    this.tokens = this.tokens.concat({token : token});
    return token;
}


adminschema.pre("save",  function (next){
    if(!this.isModified("password")){
        next();
    }
    else{
        const salt = Number(bcrypt.genSalt(12));
        this.password = bcrypt.hash(this.password,salt);
        this.confirmpassword = bcrypt.hash(this.confirmpassword, salt);
        next();
    }
})

const admins = mongoose.model("admins", adminschema);

module.exports = admins;