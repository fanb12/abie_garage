import React, { useState, useEffect, useRef } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

// import react icons
import { FaEdit } from "react-icons/fa";

// import the auth hook
import { useAuth } from "../../../../../Context/AuthContext";

// import the employee service to use the get employees function
import SERVICE from "../../../../../services/service.services";

////////////////////////////////////////
function ServiceList() {
  const navigate = useNavigate();

  const [service_name, setServiceName] = useState("");
  const [service_description, setServiceDescription] = useState("");
  const [services, setServices] = useState([]);

  // target
  const serviceNameDom = useRef();
  const serviceDescriptionDom = useRef();

  // to serve as aflag to show the error message
  const [apiError, setApiError] = useState(false);

  // store the error message
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  // create a variable to hold the users token
  let loggedInEmployeeToken = "";
  // destructure the auth hook and get the token
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  // service name value tracker
  function serviceNameTracker() {
    setServiceName(serviceNameDom.current.value);
  }

  // service description value tracker
  function serviceDescriptionTracker() {
    setServiceDescription(serviceDescriptionDom.current.value);
  }

  // fetch all service data
  async function fetchData() {
    try {
      const data = await SERVICE.getAllServices(loggedInEmployeeToken);

      // console.log(data.data.services);
      setServices(data.data.services);

      // setVehicleError("");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // submit handler
  async function handleSubmit(e) {
    // prevent the default behavior of the form submission
    e.preventDefault();

    // prepare the data for form submission
    const formData = {
      service_name,
      service_description,
    };

    try {
      const data = await SERVICE.addService(formData, loggedInEmployeeToken);

      // console.log(data.statusText);
      fetchData();

      setServiceName("");
      setServiceDescription("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className="contact-section pb-5">
        <div className=" auto-container ">
          <div className="contact-title ">
            <div>
              <h2>Service We Provide</h2>{" "}
              <h5 className="text-secondary">
                Bring to the table win-win survival strategies to ensure
                proactive domination. At the end of the day, going forward, a
                new normal that has evolved from generation X is on the runway
                heading towards a streamlined cloud solution.
              </h5>
            </div>

            {services.map((service) => (
              <>
                <div class="bg-white my-2 d-flex">
                  <div class="pt-3 pb-1 px-4 flex-grow-1">
                    <h5 class="mb-1 font-weight-bold">
                      {service.service_name}
                    </h5>
                    <h6 class=" mb-1 text-secondary">
                      {service.service_description}
                    </h6>
                  </div>
                  <div class="d-flex align-items-center px-4">
                    <Link
                      to={`/admin/services/service-update/${service.service_id}`}
                    >
                      <FaEdit color="#081336" />
                    </Link>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>

        <div className=" bg-white px-5 pt-5 mt-4 contact-title mb-1">
          <h2>Add a new service</h2>
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="row clearfix">
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    name="service_name"
                    placeholder="Service name"
                    ref={serviceNameDom}
                    onChange={serviceNameTracker}
                    value={service_name}
                    required
                  />
                </div>

                <div className="form-group col-md-12">
                  <textarea
                    type="text"
                    name="service_description"
                    placeholder="Service description"
                    ref={serviceDescriptionDom}
                    onChange={serviceDescriptionTracker}
                    value={service_description}
                    required=""
                  ></textarea>
                </div>

                <div className="form-group col-md-12">
                  <button class="theme-btn btn-style-one" type="submit">
                    <span>ADD SERVICE</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServiceList;
