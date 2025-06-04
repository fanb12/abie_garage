// import the express module
const express = require('express');

// call the router method from express to create the router
const router = express.Router();

// import the install controller
const installController = require('../controllers/install.controller');

// create a route to handle the install request in get
router.get('/install', installController.install);

// export the router
module.exports = router;