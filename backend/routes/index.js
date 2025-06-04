// import the express module
const express = require("express");

// call the router method from express to create the router
const router = express.Router();

// import the install routes
const installRouter = require("./install.routes");

// import the employee routes
const employeeRouter = require("./employee.routes");

// import the customer routes
const customerRouter = require("./customer.routes");

// import the vehicle routes
const vehicleRouter = require("./vehicle.routes");

// import the service routes
const serviceRouter = require("./service.routes");

// import the order routes
const orderRouter = require("./order.routes");

// import the login routes
const logInRouter = require("./login.routes");

// Add the install router to the main router
router.use(installRouter);

// Add the employee router to the main router
router.use(employeeRouter);

// Add the customer router to the main router
router.use(customerRouter);

// Add the vehicle router to the main router
router.use(vehicleRouter);

// Add the service router to the main router
router.use(serviceRouter);

// Add the order router to the main router
router.use(orderRouter);

// Add the login router to the main router
router.use(logInRouter);

// export the router
module.exports = router;
