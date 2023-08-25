import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  authToken: localStorage.getItem("authToken"), // Load token from localStorage
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.authToken = action.payload;
      localStorage.setItem("authToken", action.payload); // Save token to localStorage
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
