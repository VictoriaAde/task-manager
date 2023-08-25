import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/api", // Your API base URL
});

// Interceptor to add the authentication token to requests
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // Assuming you store the token in local storage after login
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default instance;
