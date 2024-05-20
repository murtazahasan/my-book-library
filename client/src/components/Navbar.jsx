// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">
          MyApp
        </Link>
        <div>
          <Link to="/" className="text-white mr-4">
            Home
          </Link>
          {isAuthenticated ? (
            <button
              onClick={handleSignOut}
              className="text-white bg-red-500 px-4 py-2 rounded"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/signin"
              className="text-white bg-blue-500 px-4 py-2 rounded"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
