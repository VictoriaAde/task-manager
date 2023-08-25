import React from "react";
import { Routes, Route } from "react-router-dom";
import Registration from "../pages/Registration/Registration";
import Login from "../pages/login/Login";
import ProtectedRoute from "./ProtectedRoute"; // Make sure to import your ProtectedRoute component
import Dashboard from "../../pages/dashboard/Dashboard";

const Root = ({ isAuthenticated }) => {
  return (
    <Routes>
      <Route path="/" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <ProtectedRoute
        path="/dashboard"
        element={<Dashboard />} // Import and provide the appropriate component for your dashboard
        isAuthenticated={isAuthenticated}
      />
    </Routes>
  );
};

export default Root;
