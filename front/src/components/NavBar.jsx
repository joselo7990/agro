import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";

const Navbar = () => {
  const { user, logOut } = useContext(UserContext);
  return (
    <nav className="bg-green-600 text-white px-4 py-2 shadow-md">
      <div className="flex items-center justify-between">
        {/* Logo o nombre de la app */}
        <Link to="/" className="text-2xl font-bold">
          AgroAPP
        </Link>

        {/* Enlaces para mobile */}
        <div className="flex space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          {user ? (
            <button
              className="btn bg-red-600"
              onClick={() => {
                logOut();
              }}
            >
              Log Out
            </button>
          ) : (
            <Link to="/login" className="hover:underline">
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
