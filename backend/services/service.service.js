// import the query function from the db.config.js file
const connection = require("../config/db.config");

// import the crypto module to generate random id
const crypto = require("crypto");

async function createService(service) {
  // console.log(servicee)

  const query =
    "INSERT INTO common_services (service_name,service_description) VALUES(?,?)";

  const rows = await connection.query(query, [
    service.service_name,
    service.service_description,
  ]);

  //   console.log(rows);

  return rows;
}

async function getAllService() {
  try {
    const query = "SELECT * FROM common_services";

    const rows = await connection.query(query);

    // console.log(rows);

    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function updateService(service) {
  // console.log(service)

  const query =
    "UPDATE common_services SET  service_name = ?, service_description = ? WHERE service_id = ?";

  const rows = await connection.query(query, [
    service.service_name,
    service.service_description,
    service.service_id,
  ]);

  return rows;
}

async function getsingleService(service) {
  // console.log(service)

  const query = "SELECT * FROM common_services WHERE service_id = ?";

  const rows = await connection.query(query, [service]);

  // console.log(rows)

  return rows;
}

module.exports = {
  createService,
  getAllService,
  updateService,
  getsingleService,
};
