











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
  FiMenu,
  FiHome,
  FiUsers,
  FiLayers,
  FiBarChart2,
  FiMessageSquare,
  FiBookOpen,
  FiCalendar,
  FiAward
} from "react-icons/fi";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, text: "Alice Brown completed 'React Basics' module", time: "5m ago", type: "success" },
    { id: 2, text: "Training session 'Node.js Advanced' scheduled for tomorrow", time: "1h ago", type: "info" },
    { id: 3, text: "Server downtime reported during assessment upload", time: "3h ago", type: "warning" },
    { id: 4, text: "Certification issued for Batch Python-01", time: "Yesterday", type: "success" },
    { id: 5, text: "Event 'Tech Talk Friday' starts at 4 PM", time: "2d ago", type: "info" },
  ]);

  const handleLogout = () => {
    alert("Logging out...");
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const typeStyles = {
    success: {
      style: "border-l-4 border-emerald-500 bg-gradient-to-r from-emerald-50 to-white",
      icon: <FiCheckCircle className="text-emerald-500 mt-1" />,
    },
    warning: {
      style: "border-l-4 border-amber-500 bg-gradient-to-r from-amber-50 to-white",
      icon: <FiAlertTriangle className="text-amber-500 mt-1" />,
    },
    info: {
      style: "border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-white",
      icon: <FiInfo className="text-blue-500 mt-1" />,
    },
  };

  return (
    <nav className="sticky top-0 z-30 w-full bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 shadow-md flex items-center justify-between px-6 py-3">
      {/* Left Section - Logo */}
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-500 p-2 rounded-xl shadow-md">
          <FiBookOpen className="text-white text-xl" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
          ETMS Admin
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search trainees, courses..."
              className="pl-10 pr-10 py-2 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 backdrop-blur-sm text-slate-700 shadow-inner"
            />
            <FiSearch className="absolute left-3 top-2.5 text-blue-400" />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-2.5 text-blue-400 hover:text-blue-600 transition-colors"
              >
                <FiX />
              </button>
            )}
          </div>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative p-2 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200 shadow-sm hover:shadow-md transition-all"
          >
            <FiBell className="text-xl text-blue-600" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-96 bg-white border border-blue-200 rounded-2xl shadow-xl overflow-hidden">
              <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
                <span className="font-semibold text-blue-700 text-sm uppercase tracking-wide">
                  Notifications
                </span>
                <button
                  onClick={clearNotifications}
                  className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Clear All
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-3">
                      <FiBell className="text-blue-500 text-xl" />
                    </div>
                    <p className="text-blue-700 font-medium">No new notifications</p>
                    <p className="text-blue-400 text-sm mt-1">You're all caught up!</p>
                  </div>
                ) : (
                  notifications.map((note) => (
                    <div
                      key={note.id}
                      className={`flex justify-between items-start p-4 mb-1 last:mb-0 transition-all hover:bg-blue-50 ${typeStyles[note.type].style}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{typeStyles[note.type].icon}</div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{note.text}</p>
                          <span className="text-xs text-blue-500">{note.time}</span>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setNotifications((prev) =>
                            prev.filter((n) => n.id !== note.id)
                          )
                        }
                        className="text-blue-300 hover:text-blue-600 ml-2 transition-colors"
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
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200 shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center text-white">
              <FiUser />
            </div>
            <span className="hidden md:inline text-blue-700 font-medium">Admin</span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-blue-200 rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                <p className="text-blue-700 font-medium">Admin User</p>
                <p className="text-blue-400 text-sm">admin@etms.com</p>
              </div>
              <button
                onClick={() => alert("Profile Clicked")}
                className="flex items-center gap-2 px-4 py-3 w-full text-left text-blue-700 hover:bg-blue-50 transition-colors"
              >
                <FiUser className="text-blue-500" /> Profile
              </button>
              <button
                onClick={() => alert("Settings Clicked")}
                className="flex items-center gap-2 px-4 py-3 w-full text-left text-blue-700 hover:bg-blue-50 transition-colors"
              >
                <FiSettings className="text-blue-500" /> Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-3 w-full text-left text-red-600 hover:bg-red-50 transition-colors border-t border-blue-100"
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