// import the query function from the db.config.js file
const { query } = require("express");
const connection = require("../config/db.config");

// add customer vehicle information
async function createVehicle(vehicle) {
  const customer_hash = vehicle.customer_hash;

  // console.log(customer_hash);

  const query = "SELECT * FROM customer_identifier WHERE customer_hash = ?";

  const rows = await connection.query(query, [customer_hash]);

  //   console.log(rows[0].customer_id)

  const customer_id = rows[0].customer_id;

  // //////////////////////////////
  const query1 =
    "INSERT INTO customer_vehicle_info (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag,vehicle_serial,vehicle_color) VALUES (?,?,?,?,?,?,?,?,?)";

  const values = [
    customer_id,
    vehicle.vehicle_year,
    vehicle.vehicle_make,
    vehicle.vehicle_model,
    vehicle.vehicle_type,
    vehicle.vehicle_mileage,
    vehicle.vehicle_tag,
    vehicle.vehicle_serial,
    vehicle.vehicle_color,
  ];

  const rows1 = await connection.query(query1, values);

  //   console.log(rows1);

  return rows1;
}

// get Customer Vehiclee by customer id
async function getVehicleeById(hash) {
  try {
    // console.log(customer_hash)

    const customer_hash = hash.query;

    // to get the customer Id
    const query = "SELECT * FROM customer_identifier WHERE customer_hash = ?";

    const rows = await connection.query(query, [customer_hash]);

    // console.log(rows[0].customer_id);

    const customer_id = rows[0].customer_id;

    // get the customer vehicle by its id
    const query1 = "SELECT * FROM customer_vehicle_info WHERE customer_id =?";

    const rows1 = await connection.query(query1, [customer_id]);

    return rows1;
  } catch (error) {
    return;
  }
}

// get the Customer single Vehiclee
async function getSingleVehicle(single) {
  // console.log(single.customer_hash);
  // to get the customer Id
  const query = "SELECT * FROM customer_identifier WHERE customer_hash = ?";

  const rows = await connection.query(query, [single.customer_hash]);

  // console.log(rows);

  const customer_id = rows[0].customer_id;

  // console.log(customer_id);

  // get the customer vehicle by its id
  const query1 =
    "SELECT * FROM customer_vehicle_info WHERE customer_id =? AND vehicle_id = ?";

  const rows1 = await connection.query(query1, [
    customer_id,
    single.vehicle_id,
  ]);

  // console.log(rows1);
  return rows1;
}
async function editVehicle(vehicle_id, vehicle) {
  try {
    const query =
      "UPDATE customer_vehicle_info SET vehicle_year = ?, vehicle_make = ?, vehicle_model = ?, vehicle_type = ?, vehicle_mileage = ?, vehicle_tag = ?, vehicle_serial = ?, vehicle_color = ? WHERE vehicle_id = ?";
    const result = await conn.query(query, [
      vehicle.vehicle_year,
      vehicle.vehicle_make,
      vehicle.vehicle_model,
      vehicle.vehicle_type,
      vehicle.vehicle_mileage,
      vehicle.vehicle_tag,
      vehicle.vehicle_serial,
      vehicle.vehicle_color,
      vehicle_id,
    ]);
    return result.affectedRows > 0;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  createVehicle,
  getVehicleeById,
  getSingleVehicle,
  editVehicle,
};
