import React from "react";
import { Route, Navigate  } from "react-router-dom";

const Protected = ({ user, children, ...rest }) => (
  <Route {...rest} render={ ({ location }) =>
      user ? (
        children
      ) : (
        <Navigate to={{ pathname: "/login", state: { from: location }  }} />
      )
    }
  />
);

export default Protected;
