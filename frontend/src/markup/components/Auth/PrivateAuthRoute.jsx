// import react hooks
import React, { useState, useEffect } from "react";

// import the components from react router dom
import { Navigate } from "react-router";

// import the util function, which handles the reading from the local storage
import getAuth from "../../../utils/auth";

function PrivateAuthRoute({ roles, children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    try {
      // retrive the logged in user data from the local storage
      const loggedInEmployee = getAuth();

      loggedInEmployee.then((response) => {
        if (response.employee_token) {
          // if in here, that means the user is logged in

          // set isLogged to true
          setIsLogged(true);

          if (
            roles &&
            roles.length > 0 &&
            roles.includes(response.employee_role)
          ) {
            // if in here, that means the user is loogged and has authorization to access the route

            // set isAuthorized to true
            setIsAuthorized(true);
          }
        }
        setIsChecked(true);
      });
    } catch (error) {
      console.log(error);
    }
  }, [roles]);

  if (isChecked) {
    // if not logged
    if (!isLogged) {
      return <Navigate to="/login" />;
    }

    // if not authorized
    if (!isAuthorized) {
      return <Navigate to="/unauthorized" />;
    }
  }

  return children;
}

export default PrivateAuthRoute;
