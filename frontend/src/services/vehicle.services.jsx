import axios from "../axiosConfig";

// A function to send post request to add a new vehicle
async function addVehicle(formData, loggedInEmployeeToken) {
  console.log(formData);

  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };

  const data = await axios.post("/api/vehicle", formData, { headers });

  return data;
}

// A function to get the customer vehicle
async function getCustomerVehicle(formData, loggedInEmployeeToken) {
  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };

  const data = await axios.get(`/api/vehicle/customer?query=${formData}`, {
    headers,
  });

  // console.log(data);

  return data;
}

async function getSingleVehicle(
  customer_hash,
  vehicle_id,
  loggedInEmployeeToken
) {
  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };

  const data = await axios.get(
    `/api/vehicle/single/${customer_hash}/${vehicle_id}`,
    { headers }
  );

  // console.log(data);

  return data;
}
const updateVehicleById = async (vehicle_id, formData) => {
  try {
    const response = await axios.patch(`/api/vehicle/${vehicle_id}`, formData);
    console.log("Vehicle updated", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating vehicle:", error.message);
    throw error;
  }
};

const vehicleService = {
  addVehicle,
  getCustomerVehicle,
  getSingleVehicle,
  updateVehicleById,
};

export default vehicleService;
