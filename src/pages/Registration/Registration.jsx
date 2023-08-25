import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api";

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordLengthValid, setPasswordLengthValid] = useState(true);
  const [registrationError, setRegistrationError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "password" || name === "confirmPassword") {
      if (name === "confirmPassword") {
        setPasswordMatch(value === formData.password);
      }
      setPasswordLengthValid(value.length >= 8);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordMatch || !passwordLengthValid) {
      console.error("Invalid password");
      return;
    }
    try {
      const response = await axiosInstance.post("/register", {
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
      if (error.response) {
        if (error.response.status === 400) {
          setRegistrationError("Email already exists.");
        } else if (error.response.status === 500) {
          setRegistrationError("An error occurred while registering the user.");
        }
      } else {
        setRegistrationError("Registration error occurred.");
      }
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
              className={`focus:border-[#04a134] ${
                registrationError ? "border-red-500" : ""
              }`}
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
            {registrationError && (
              <p className="text-red-500">{registrationError}</p>
            )}
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
              className={`focus:border-[#04a134] ${
                !passwordLengthValid || !passwordMatch ? "border-red-500" : ""
              }`}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {!passwordLengthValid && (
              <p className="text-red-500">
                Password must be at least 8 characters.
              </p>
            )}
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
              className={`focus:border-[#04a134] ${
                !passwordMatch ? "border-red-500" : ""
              }`}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {!passwordMatch && (
              <p className="text-red-500">Passwords do not match.</p>
            )}
          </div>

          {/* <div className="flex flex-col gap-2">
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
          </div> */}

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
