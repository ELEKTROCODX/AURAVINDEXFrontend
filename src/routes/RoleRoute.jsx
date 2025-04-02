import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const RoleRoute = ({ children, requiredRole }) => {
  const { role } = useContext(AuthContext);
  

  if (role !== requiredRole) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default RoleRoute;
