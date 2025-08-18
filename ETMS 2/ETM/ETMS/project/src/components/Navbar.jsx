import React, { useState } from "react";
import { FiSearch, FiBell, FiUser, FiLogOut, FiSettings } from "react-icons/fi";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState(3); // Example count

  const handleLogout = () => {
    alert("Logging out...");
  };

  return (
    <nav className="sticky top-0 z-30 w-full bg-green-50 border-b border-green-200 shadow-sm flex items-center justify-between px-6 py-3">
      {/* Left Section - Logo */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-green-700 whitespace-nowrap">
          ETMS Admin Panel
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden sm:block">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="pl-10 pr-10 py-1 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-200 bg-green-50"
          />
          <FiSearch className="absolute left-2 top-2 text-gray-400" />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2 top-2 text-gray-400 hover:text-red-500"
            >
              ✕
            </button>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative cursor-pointer">
          <FiBell className="text-xl text-gray-500 hover:text-green-600" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {notifications}
            </span>
          )}
        </div>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu((prev) => !prev)}
            className="flex items-center gap-2 px-2 py-1 rounded-md bg-green-100 hover:bg-green-50 border border-green-200"
          >
            <FiUser className="text-lg text-green-700" />
            <span className="hidden md:inline text-gray-700">Admin</span>
          </button>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-green-200 rounded-md shadow-lg">
              <button
                onClick={() => alert("Profile Clicked")}
                className="flex items-center gap-2 px-4 py-2 w-full text-left text-gray-700 hover:bg-green-100"
              >
                <FiUser /> Profile
              </button>
              <button
                onClick={() => alert("Settings Clicked")}
                className="flex items-center gap-2 px-4 py-2 w-full text-left text-gray-700 hover:bg-green-100"
              >
                <FiSettings /> Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 w-full text-left text-red-600 hover:bg-red-100"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
