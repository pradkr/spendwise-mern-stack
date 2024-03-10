import React from "react";
// import { Route, Navigate  } from "react-router-dom";
import {  Navigate  } from "react-router-dom";

const ProtectedRoute = ({ user, children, location, ...rest }) => (
  //<Route {...rest} render={ ({ location }) => 
  console.log('ProtectedRoute: user='+user +'location='+location+'children='+children ) && 
  user ? ( children ) : (
        <Navigate to={{ pathname: "/login", state: { from: location } }} />
      )
    //}
  ///>
);

export default ProtectedRoute;
