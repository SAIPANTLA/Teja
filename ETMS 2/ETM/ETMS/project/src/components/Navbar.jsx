import React, { useState } from "react";
import {
  FiSearch,
  FiBell,
  FiUser,
  FiLogOut,
  FiSettings,
  FiX,
  FiCheckCircle,
  FiAlertTriangle,
  FiInfo,
} from "react-icons/fi";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // 🔔 ETMS-specific notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Alice Brown completed 'React Basics' module",
      time: "5m ago",
      type: "success",
    },
    {
      id: 2,
      text: "Training session 'Node.js Advanced' scheduled for tomorrow",
      time: "1h ago",
      type: "info",
    },
    {
      id: 3,
      text: "Server downtime reported during assessment upload",
      time: "3h ago",
      type: "warning",
    },
    {
      id: 4,
      text: "Certification issued for Batch Python-01",
      time: "Yesterday",
      type: "success",
    },
    {
      id: 5,
      text: "Event 'Tech Talk Friday' starts at 4 PM",
      time: "2d ago",
      type: "info",
    },
  ]);

  const handleLogout = () => {
    alert("Logging out...");
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Colors & Icons based on notification type
  const typeStyles = {
    success: {
      style: "border-green-400 bg-green-50 text-green-700",
      icon: <FiCheckCircle className="text-green-500 mt-1" />,
    },
    warning: {
      style: "border-yellow-400 bg-yellow-50 text-yellow-700",
      icon: <FiAlertTriangle className="text-yellow-500 mt-1" />,
    },
    info: {
      style: "border-blue-400 bg-blue-50 text-blue-700",
      icon: <FiInfo className="text-blue-500 mt-1" />,
    },
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
        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative"
          >
            <FiBell className="text-xl text-gray-500 hover:text-green-600" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-96 bg-white border border-green-200 rounded-xl shadow-2xl overflow-hidden">
              <div className="flex justify-between items-center px-4 py-3 bg-green-100 border-b">
                <span className="font-semibold text-green-800 text-sm uppercase tracking-wide">
                  Notifications
                </span>
                <button
                  onClick={clearNotifications}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Clear All
                </button>
              </div>
              {/* 🔽 Removed `max-h-72 overflow-y-auto` */}
              <div>
                {notifications.length === 0 ? (
                  <p className="p-6 text-center text-gray-500 text-sm italic">
                    🎉 No new notifications
                  </p>
                ) : (
                  notifications.map((note) => (
                    <div
                      key={note.id}
                      className={`flex justify-between items-start px-4 py-3 border-l-4 mb-1 last:mb-0 rounded-md shadow-sm transition hover:scale-[1.02] ${typeStyles[note.type].style}`}
                    >
                      <div className="flex items-start gap-2">
                        {typeStyles[note.type].icon}
                        <div>
                          <p className="text-sm font-medium">{note.text}</p>
                          <span className="text-xs opacity-75">{note.time}</span>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setNotifications((prev) =>
                            prev.filter((n) => n.id !== note.id)
                          )
                        }
                        className="text-gray-400 hover:text-red-500 ml-2"
                      >
                        <FiX />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
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
