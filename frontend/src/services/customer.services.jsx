import axios from "../axiosConfig";

// A function to send post request to create a new employee
async function createCustomer(formData, loggedInEmployeeToken) {
  // define your headers
  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };

  const data = await axios.post("/api/customer", formData, { headers });

  return data;
}

// a function to get all customers
async function getAllCustomers(loggedInEmployeeToken) {
  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };
  const data = await axios.get("/api/customers", { headers });
  // console.log(data)

  return data;
}

// a function to update a customer
async function updateCustomer(formData, loggedInEmployeeToken) {
  // console.log(loggedInEmployeeToken)
  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };
  const data = await axios.put("/api/customer/update", formData, { headers });
  // console.log(data)

  return data;
}

// a function to get single customer
async function singleCustomer(formData, loggedInEmployeeToken) {
  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };
  // console.log(formData);
  const data = await axios.get(`/api/customer/single/${formData}`, { headers });

  // console.log(data);

  return data;
}

async function findCustomer(formData, loggedInEmployeeToken) {
  
  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };
  // console.log(formData);

  const { data } = await axios.get(`/api/customer/find?query=${formData}`, {
    headers,
  });

  // console.log(data);
  return data;
}

const customerService = {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  singleCustomer,
  findCustomer,
};

export default customerService;
