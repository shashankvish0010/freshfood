import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
mongoose.connect(process.env.MONGO_URI).then(()=>
  console.log("FreshFood MongoDB Connected")
).catch((error)=>console.log(error))