const mongoose = require('mongoose');

const dataschema = new mongoose.Schema({

              name : {
                type : String,
                unique : true
              },
              email : {
                type : String,
                unique : true
              },
              contact : {
                type : Number,
                unique : true
              }
    
})

const Customerdata = mongoose.model("Customerdata", dataschema);

module.exports = Customerdata;