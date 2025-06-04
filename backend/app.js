// import the express module
const express = require("express");

// import the dotenv module and call the config method to load the enviroment variable
require("dotenv").config();

// import the sanitizer module
const sanitize = require("sanitize");

// import the cors module
const cors = require("cors");

// Set up the Cors options to allow requests from our front-end
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// create a variable to hold our port number
const port = process.env.PORT;

// import the router
const router = require("./routes");

// create a webserver
const app = express();

// add the CORS middleware
app.use(cors(corsOptions));

// Add the express.json middleware to the application
app.use(express.json());

// Add the sanitizer to the express middleware
app.use(sanitize.middleware);

// Add the routes to the application as middleware
app.use(router);

app.listen(port, () => {
  console.log(`Server Running on Port: ${port}`);
});

module.exports = app;
