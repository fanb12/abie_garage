const vehicleService = require("../services/vehicle.service");

async function createVehicle(req, res, next) {
  //   console.log(req.body);

  try {
    const AddedVehicle = await vehicleService.createVehicle(req.body);

    // console.log(AddedVehicle.affectedRows)

    if (!createVehicle) {
      return res.status(400).json({
        error: "Failed to add vehicle",
      });
    } else if (AddedVehicle.affectedRows === 1) {
      return res.status(200).json({ status: "Vehicle added successfully" });
    } else {
      return res.status(400).json({
        error: "vehicle not added successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

async function getVehicleById(req, res, next) {
  // console.log(req.query);

  try {
    const customerVehicle = await vehicleService.getVehicleeById(req.query);

    // console.log(SingleVehicle.length)

    if (customerVehicle.length < 1) {
      return res.status(400).json({
        error: "No Vehicle Added!",
      });
    } else {
      return res.status(200).json({
        status: "Vehicle found!!",
        customerVehicle: customerVehicle,
      });
    }
  } catch (error) {
    // console.log("kkk");
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}

async function getSingleVehicle(req, res, next) {
  try {
    const SingleVehicle = await vehicleService.getSingleVehicle(req.params);

    // console.log(SingleVehicle)

    if (SingleVehicle.length < 1) {
      return res.status(400).json({
        error: "No Vehicle Found!",
      });
    } else {
      return res.status(200).json({
        status: "Vehicle found!!",
        SingleVehicle: SingleVehicle,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
}
async function editVehicle(req, res, next) {
  try {
    const { id } = req.params;
    const vehicleData = req.body;
    const updated = await vehicleService.editVehicle(id, vehicleData);
    if (updated) {
      res.status(200).json({ message: "Vehicle updated successfully" });
    } else {
      res.status(404).json({ error: "Vehicle not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to update vehicle" });
  }
}

module.exports = { createVehicle, getVehicleById, getSingleVehicle,editVehicle };
