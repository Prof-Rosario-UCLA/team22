import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function SideNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg border-r border-stone-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-stone-800 mb-8">
          Hobby Tracker
        </h1>

        <nav className="space-y-2">
          <Link
            to="/home"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive("/home")
                ? "bg-emerald-50 text-emerald-600"
                : "text-stone-600 hover:bg-stone-50"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span>Home</span>
          </Link>

          <Link
            to="/hobby/new"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive("/hobby/new")
                ? "bg-emerald-50 text-emerald-600"
                : "text-stone-600 hover:bg-stone-50"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>New Hobby</span>
          </Link>
        </nav>
      </div>

      <div className="mt-auto p-6">
        <button
          onClick={handleSignOut}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full text-stone-600 hover:bg-red-50 hover:text-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v3a1 1 0 102 0V9z"
              clipRule="evenodd"
            />
          </svg>
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export default SideNav;
