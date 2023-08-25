import React from "react";
import { Routes, Route } from "react-router-dom";
import Registration from "../pages/Registration/Registration";
import Login from "../pages/login/Login";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../../pages/dashboard/Dashboard";

const Root = ({ isAuthenticated }) => {
  return (
    <Routes>
      <Route path="/" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <ProtectedRoute
        path="/dashboard"
        element={<Dashboard />}
        isAuthenticated={isAuthenticated}
      />
    </Routes>
  );
};

export default Root;
