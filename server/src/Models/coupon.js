const mongoose = require('mongoose');

const couponschema = new mongoose.Schema({

    code : {
        type : String,
        required : [true, "Please provide the code"],
        unique : true
    },
    
    discount : {
         type : Number,
         required : [true, "Please provide discount offer"]
    },

    expdate : {
        type : Date,
        required : [true, "Please provide the DATE"]
    },

    offer : {
        type : String,
        required : [true, "Please provide the offer description"]
    }
});

const couponcodes = mongoose.model("couponcodes", couponschema);

module.exports = couponcodes;