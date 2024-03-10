import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export const PrivateRoute = () => {
  const user = useAuth();
  if (user)
    return <Outlet />;
  return <Navigate to="/login" />;
};
//export default PrivateRoute;