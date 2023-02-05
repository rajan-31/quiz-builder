require('dotenv').config();
const express = require('express');
const app = express();

// Allow client request
const cors = require('cors');
const corsOptions = {
  origin: [
    'http://localhost:3000',
  ]
}
app.use(cors(corsOptions));

// select version
const api_version = process.env.API_VERSION
app.use(`/api/${api_version}/`, require(`./routes/${api_version}`));

const port = process.env.API_PORT
app.listen(port || 3001, () => console.log(`API Server Running | Port: ${port}, API Version: ${api_version}`))