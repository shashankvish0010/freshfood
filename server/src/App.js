const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./Database/connection');
const cookieParser = require('cookie-parser');
require('dotenv').config();

app.use(cors(
  {origin : "https://freshfood-backend.onrender.com"}
));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(require('./Router/Routes'));

const PORT = process.env.PORT; // Use double pipe (||) instead of single pipe (|) for OR operator

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
