import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      const response = await axios.post("http://localhost:3001/api/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      console.log("Registration Successful:", response.data);
      window.location.href = "/login";
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
          Register
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="focus:border-[#04a134] "
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email-address" className="text-gray-700">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="focus:border-[#04a134] "
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="focus:border-[#04a134] "
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirm-password" className="text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className="focus:border-[#04a134] "
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#04a134] text-white px-6 py-2 rounded-sm mt-5"
            >
              Register
            </button>
          </div>
          <div className="text-center">
            <p className="text-gray-700">
              Already have an account?{" "}
              <Link to="/login" className="text-[#5c31b3] font-bold">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
