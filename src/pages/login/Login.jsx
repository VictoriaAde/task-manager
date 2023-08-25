import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login());

    try {
      const response = await axiosInstance.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      // Extract the token from the response data
      const token = response.data.token;

      // Store the token securely in local storage
      localStorage.setItem("authToken", token);

      dispatch(login(response.data.token));

      navigate("/dashboard");

      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setLoginError("Email not found.");
        } else if (error.response.status === 401) {
          setLoginError("Incorrect password.");
        }
      } else {
        setLoginError("Login error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
          Login
        </h2>

        <form action="POST" className="space-y-6" onSubmit={handleSubmit}>
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
              autoComplete="current-password"
              required
              className={`focus:border-[#04a134] ${
                loginError ? "border-red-500" : ""
              }`}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {loginError && <p className="text-red-500">{loginError}</p>}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#04a134] text-white px-6 py-2 rounded-sm mt-5"
            >
              Login
            </button>
          </div>
          <div className="text-center">
            <p className="text-gray-700">
              Don't have an account?{" "}
              <Link to="/" className="text-[#5c31b3] font-bold">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
