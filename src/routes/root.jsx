import React from "react";
import { Route, Routes } from "react-router-dom";
import Registration from "../Registration/Registration";
import Login from "../login/Login";

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Registration />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Root;
