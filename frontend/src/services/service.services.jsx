import axios from "../axiosConfig";

async function addService(formData, loggedInEmployeeToken) {
  //   console.log(formData);

  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };

  const data = await axios.post("/api/service", formData, { headers });

  return data;
}

async function getAllServices(loggedInEmployeeToken) {
  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };
  const data = await axios.get("/api/services", { headers });
  // console.log(data)

  return data;
}

async function updateService(formData, loggedInEmployeeToken) {
  // console.log(loggedInEmployeeToken)
  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };
  const data = await axios.put("/api/service/update", formData, { headers });
  // console.log(data)

  return data;
}

async function singleService(formData, loggedInEmployeeToken) {
  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };
  // console.log(formData);
  const data = await axios.get(`/api/service/single/${formData}`, { headers });

  // console.log(data);

  return data;
}

const SERVICE = {
  addService,
  getAllServices,
  updateService,
  singleService,
};

export default SERVICE;
