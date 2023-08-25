import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const LogoutModal = ({ setShowLogoutConfirmation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70">
      <div className="bg-white p-4 rounded-md shadow-md">
        <p className="text-xl font-semibold mb-4">
          Are you sure you want to log out?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setShowLogoutConfirmation(false)}
            className="bg-gray-300 px-4 py-2 rounded-md"
          >
            No
          </button>
          <button
            onClick={() => {
              setShowLogoutConfirmation(false);
              handleLogout(); // Perform logout
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Yes, Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
