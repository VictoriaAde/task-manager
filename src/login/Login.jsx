import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        email: formData.email,
        password: formData.password,
      });
      console.log("Login Successful:", response.data);
      window.location.href = "/dashboard";
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Login Error:", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
          Login
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="email-address" className="text-gray-700">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className=""
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label htmlFor="password" className="text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className=""
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <button type="submit" className="">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
