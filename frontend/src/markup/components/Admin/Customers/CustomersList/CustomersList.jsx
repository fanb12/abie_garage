import React, { useState, useEffect } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

// import recat components
import { Table, Button } from "react-bootstrap";

// import react icons
import { FaEdit } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

// import the auth hook
import { useAuth } from "../../../../../Context/AuthContext";

// import the employee service to use the get employees function
import cutomerService from "../../../../../services/customer.services";

// import the date-fns library
import { format } from "date-fns";
import customerService from "../../../../../services/customer.services";

////////////////////////////////////////
function CustomersList() {
  //  employees state to store the emplooyes data
  const [customers, setCustomers] = useState([]);

  // console.log(customers);

  // console.log(employees);
  // const { id } = useParams();

  const navigate = useNavigate();

  // console.log(employees[0].employee_id)

  // to serve as aflag to show the error message
  const [apiError, setApiError] = useState(false);

  // store the error message
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  //   get the logged employee token
  const { employee } = useAuth();

  let token = null;

  if (employee) {
    token = employee?.employee_token;
  }
  //   console.log(employee?.employee_token)

  // fetch employees data using useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await customerService?.getAllCustomers(token);
        // console.log(data);

        if (data?.statusText !== "OK") {
          // set apiError to true
          setApiError(true);

          if (data?.status === 403) {
            setApiErrorMessage("Please login again");
          } else if (data?.status === 401) {
            setApiErrorMessage("You are not Authorized to view this page");
          } else {
            setApiErrorMessage("Please try again laterrrr");
          }
        }

        // // set customers data
        setCustomers(data?.data?.customers);

        // console.log(data?.data?.customers);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, []);

  function handleEdit(id) {
    navigate(`/admin/customer-update/${id}`);
  }

  function handleProfile(id) {
    navigate(`/admin/customer-profile/${id}`);
  }

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>
                {"apiErrorMessage"}
                <span style={{ color: "red" }}> ___</span>
              </h2>
            </div>
          </div>
        </section>
      ) : (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>Customers</h2>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Added Data</th>
                  <th>Active</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr
                    className={
                      !customer.active_customer_status
                        ? `${"inactive"}`
                        : `${"active"}`
                    }
                    key={customer.customer_id}
                  >
                    <td>{customer.customer_id}</td>
                    <td>{customer.customer_first_name}</td>
                    <td>{customer.customer_last_name}</td>
                    <td>{customer.customer_email}</td>
                    <td>{customer.customer_phone_number}</td>
                    <td>
                      {format(
                        new Date(customer.customer_added_date),
                        "MM - dd - yyyy | kk:mm"
                      )}
                    </td>
                    <td>{customer.active_customer_status ? "Yes" : "No"}</td>
                    <td className="edit">
                      <span
                        onClick={() => handleEdit(customer.customer_hash)}
                        className="hover1"
                      >
                        <FaEdit color="#081336" />
                      </span>

                      <span
                        onClick={() => handleProfile(customer.customer_hash)}
                      >
                        <FaArrowUpRightFromSquare color="#081336" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </section>
      )}
    </>
  );
}

export default CustomersList;
