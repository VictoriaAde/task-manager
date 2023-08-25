import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";

const ProtectedRoute = ({ ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Route {...rest} element={<Dashboard />} />;
};

export default ProtectedRoute;
