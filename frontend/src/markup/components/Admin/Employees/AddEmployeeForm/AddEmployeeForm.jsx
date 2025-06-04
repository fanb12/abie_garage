import React, { useState, useRef } from "react";
import employeeService from "../../../../../services/employee.services";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

// import the useAuth hook
import { useAuth } from "../../../../../Context/AuthContext";

function AddEmployeeForm(props) {
  const navigate = useNavigate();
  const [employee_email, setEmail] = useState("");
  const [employee_first_name, setFirstName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_phone, setPhoneNumber] = useState("");
  const [employee_password, setPassword] = useState("");
  const [active_employee, setActive_employee] = useState(1);
  const [company_role_id, setCompany_role_id] = useState(1);

  // spinner handler state
  const [spin, setSpinner] = useState(false);

  // Error
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [lastNameRequired, setLastNameRequired] = useState("");
  const [phoneNumberRequired, setPhoneNumberRequired] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [succes, setSucces] = useState(false);
  const [serverMsg, setServerMsg] = useState("");

  // create a variable to hold the users token
  let loggedInEmployeeToken = "";
  // destructure the auth hook and get the token
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  // target
  const emailDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const phoneNumberDom = useRef();
  const passwordDom = useRef();
  const companyRoleIdDom = useRef();

  // email value tracker
  function emailTracker() {
    setEmail(emailDom.current.value);
  }

  // first name value tracker
  function firstNameTracker() {
    setFirstName(firstNameDom.current.value);
  }

  // last name value tracker
  function lastNameTracker() {
    setLastName(lastNameDom.current.value);
  }

  // phone number value tracker
  function phoneNumberTracker() {
    setPhoneNumber(phoneNumberDom.current.value);
  }

  // password value tracker
  function passwordTracker() {
    setPassword(passwordDom.current.value);
  }

  // company role id value tracker
  function companyRoleIdTracker() {
    setCompany_role_id(companyRoleIdDom.current.value);
  }

  // submit handler
  async function handleSubmit(e) {
    // prevent the default behavior of the form submission
    e.preventDefault();

    // handle the  client side validations
    let valid = true;

    // email is required
    if (!employee_email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!employee_email.includes("@")) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(employee_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }

    // First name is required
    if (!employee_first_name) {
      setFirstNameRequired("First Name is required");
      valid = false;
    } else {
      setFirstNameRequired("");
    }

    // First name is required
    if (!employee_last_name) {
      setLastNameRequired("Last Name is required");
      valid = false;
    } else {
      setLastNameRequired("");
    }

    // Phone is required
    if (!employee_phone) {
      setPhoneNumberRequired("Phone Number is required");
      valid = false;
    } else {
      setPhoneNumberRequired("");
    }

    // Password has to be at least 6 characters long
    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");

      setTimeout(() => {
        setPasswordError("");
      }, 5000);

      valid = false;
    } else {
      setPasswordError("");
    }

    // if the form is not valid, do not submit
    if (!valid) {
      return;
    }

    // prepare the data for form submission
    const formData = {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_password,
      active_employee,
      company_role_id,
    };

    try {
      setSpinner(!spin);

      const { data } = await employeeService.createEmployee(
        formData,
        loggedInEmployeeToken
      );

      if (data?.msg) {
        setEmailError(data?.msg);

        setTimeout(() => {
          setServerMsg("");
          setSpinner(!spin);
        }, 2000);
      }

      if (data.status) {
        setServerMsg(data.status + "redirecting to homepage...");

        setTimeout(() => {
          setServerMsg("");
          setSpinner(!spin);
          navigate("/admin/employees");
        }, 700);
      }

      if (data.error) {
        setServerMsg(data.error);

        setTimeout(() => {
          setServerMsg("");
          setSpinner(!spin);
        }, 2000);
      }
    } catch (error) {
      setEmailError(error.response.data.msg);

      setTimeout(() => {
        setEmailError("");
        setSpinner(false);
      }, 3000);
    }
  }

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a new employee</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                {/* Form Start*/}

                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    {/* Email */}
                    <div className="form-group col-md-12">
                      <input
                        type="email"
                        name="employee_email"
                        placeholder="Employee email"
                        ref={emailDom}
                        value={employee_email}
                        onChange={emailTracker}
                        required
                      />
                      {emailError && (
                        <div className="validation-error" role="alert">
                          {emailError}
                        </div>
                      )}
                    </div>

                    {/* First Name */}
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_first_name"
                        placeholder="Employee first name"
                        ref={firstNameDom}
                        value={employee_first_name}
                        onChange={firstNameTracker}
                        required
                      />
                      {firstNameRequired && (
                        <div className="validation-error" role="alert">
                          {firstNameRequired}
                        </div>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_last_name"
                        placeholder="Employee last name"
                        required
                        ref={lastNameDom}
                        value={employee_last_name}
                        onChange={lastNameTracker}
                      />
                      {lastNameRequired && (
                        <div className="validation-error" role="alert">
                          {lastNameRequired}
                        </div>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_phone"
                        placeholder="Employee phone (555-555-5555)"
                        ref={phoneNumberDom}
                        required
                        value={employee_phone}
                        onChange={phoneNumberTracker}
                      />
                      {phoneNumberRequired && (
                        <div className="validation-error" role="alert">
                          {phoneNumberRequired}
                        </div>
                      )}
                    </div>

                    {/* Employee Role */}
                    <div className="form-group col-md-12">
                      <select
                        name="employee_role"
                        className="custom-select-box"
                        ref={companyRoleIdDom}
                        value={company_role_id}
                        onChange={companyRoleIdTracker}
                        required
                      >
                        <option value="1">Employee</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </select>
                    </div>

                    {/* Password */}
                    <div className="form-group col-md-12">
                      <input
                        type="password"
                        name="employee_password"
                        placeholder="Employee password"
                        ref={passwordDom}
                        value={employee_password}
                        onChange={passwordTracker}
                        required
                      />
                      {PasswordError && (
                        <div className="validation-error" role="alert">
                          {PasswordError}
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="form-group col-md-12">
                      <button
                        // onClick={spinner}
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>
                          {spin ? (
                            <BeatLoader color="white" size={8} />
                          ) : (
                            "Add employee"
                          )}
                        </span>
                      </button>
                      {serverMsg && (
                        <div
                          className="validation-error"
                          style={{
                            color: "green",
                            fontSize: "100%",
                            fontWeight: "600",
                            padding: "25px",
                          }}
                          role="alert"
                        >
                          {serverMsg}
                        </div>
                      )}
                    </div>
                  </div>
                </form>

                {/* Form End */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddEmployeeForm;
