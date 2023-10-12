const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Mernfreshfood:Shashank@12@freshfood.wqw4jkq.mongodb.net/?retryWrites=true&w=majority", { 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });