import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
mongoose.connect('mongodb+srv://Mernfreshfood:Shashank@12@freshfood.wqw4jkq.mongodb.net/?retryWrites=true&w=majority').then(()=>
  console.log("FreshFood MongoDB Connected")
).catch((error)=>console.log(error))
