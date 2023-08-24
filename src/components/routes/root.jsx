import React from "react";
import { Route, Routes } from "react-router-dom";
import Registration from "../pages/Registration/Registration";
import Login from "../pages/login/Login";

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Registration />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Root;
