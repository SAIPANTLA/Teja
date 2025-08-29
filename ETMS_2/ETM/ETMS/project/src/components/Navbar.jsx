import React, { useState } from "react";
import { FiSearch, FiBell, FiUser, FiLogOut, FiSettings } from "react-icons/fi";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const handleLogout = () => {
    alert("Logging out...");
  };

  return (
    <nav
      className="sticky top-0 z-30 w-full 
      bg-gradient-to-br from-indigo-200 via-blue-300 to-indigo-300 
      border-b border-white shadow-sm 
      flex items-center justify-between px-6   h-16 py-3"
    >
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-gray-900 whitespace-nowrap">
        
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden sm:block">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="pl-10 pr-10 py-1 rounded-md border border-black 
            focus:outline-none focus:ring-2 focus:ring-black 
            bg-white text-black placeholder-black"
          />
          <FiSearch className="absolute left-2 top-2 text-black" />
          
        </div>

        {/* Notification */}
        <div className="relative cursor-pointer">
          <FiBell className="text-2xl text-white hover:text-black" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {notifications}
            </span>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu((prev) => !prev)}
            className="flex items-center gap-2 px-2 py-1 rounded-md 
            bg-white hover:bg-white border border-white"
          >
            <FiUser className="text-lg text-black" />
            <span className="hidden md:inline text-black">Admin</span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-40 
            bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 
            border border-gray-600 rounded-md shadow-lg"
            >
              <button
                onClick={() => alert("Profile Clicked")}
                className="flex items-center gap-2 px-4 py-2 w-full text-left text-gray-200 hover:bg-gray-600"
              >
                <FiUser /> Profile
              </button>
              <button
                onClick={() => alert("Settings Clicked")}
                className="flex items-center gap-2 px-4 py-2 w-full text-left text-gray-200 hover:bg-gray-600"
              >
                <FiSettings /> Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 w-full text-left text-red-400 hover:bg-red-600 hover:text-white"
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
