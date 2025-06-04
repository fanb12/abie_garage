// import the express module
const express = require("express");

// call the router method from express to create the router
const router = express.Router();

// import the authMiddleware
const {
  verifyToken,
  isAdmin,
  isAdmin_Manager,
  isAdmin_Manager_Employee,
} = require("../middlewares/auth.middleware");

// import the customer controller
const serviceController = require("../controllers/service.controller");

// create a route to handle the service request in post
router.post(
  "/api/service",
  //   [verifyToken, isAdmin],
  serviceController.createService
);

// create a route to handle the service request in get
router.get(
  "/api/services",
  //   [verifyToken, isAdmin],
  serviceController.getAllService
);

// create a route to handle the customer request in put
router.put(
  "/api/service/update",
  //   [verifyToken, isAdmin],
  serviceController.updateService
);

// create a route to handle the get single service request in get
router.get(
  "/api/service/single/:service_id",
  //   [verifyToken, isAdmin_Manager],
  serviceController.getsingleService
);

// export the router
module.exports = router;
