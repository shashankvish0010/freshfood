const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Mernfreshfood:freshfood@freshfood.wqw4jkq.mongodb.net/freshfood?retryWrites=true&w=majority"

// mongoose.connect("mongodb+srv://Mernfreshfood:freshfood@freshfood.wqw4jkq.mongodb.net/freshfood?retryWrites=true&w=majority", { 
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => {
//     console.log("Database connected successfully");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect().then(()=>{
  client.db("admin").command({ ping: 1 }).then(()=>{
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  })
}).catch((error)=>{
  console.log(error);
})

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// } 