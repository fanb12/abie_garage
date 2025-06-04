const { query } = require("express");
const serviceService = require("../services/service.service");

async function createService(req, res, next) {
  //   console.log(req.body);

  try {
    const newService = await serviceService.createService(req.body);

    if (!newService) {
      return res.status(400).json({
        error: "Failed to add the service!",
      });
    } else {
      res.status(200).json({ status: "Service added successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

async function getAllService(req, res, next) {
  try {
    const services = await serviceService.getAllService();

    if (!services) {
      res.status(400).json({
        error: "Failed to get all services!",
      });
    } else {
      res.status(200).json({
        status: "Services retrieved successfully!",
        services: services,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

async function updateService(req, res, next) {
  // console.log(req.body)
  try {
    const updateService = await serviceService.updateService(req.body);

    // console.log(updateService.affectedRows)

    const rows = updateService.affectedRows;

    if (!updateService) {
      return res.status(400).json({
        error: "Failed to update the service!",
      });
    } else if (rows === 1) {
      return res.status(200).json({
        status: "Service Successful Updated!",
      });
    } else {
      return res.status(400).json({
        status: "Service Update Incomplete!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

async function getsingleService(req, res, next) {
  const service_id = req.params.service_id;

  // console.log(service_id)

  try {
    const singleService = await serviceService.getsingleService(service_id);

    // console.log(singleService[0].service_id);

    if (!singleService[0]?.service_id) {
      res.status(400).json({
        error: "Failed to get service!",
      });
    } else {
      res.status(200).json({
        status: "Service retrieved successfully! ",
        singleService: singleService,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

module.exports = {
  createService,
  getAllService,
  updateService,
  getsingleService,
};