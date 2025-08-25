
import React, { useState } from "react";
import {
  FiMenu,
  FiHome,
  FiUsers,
  FiLayers,
  FiBarChart2,
  FiUser,
  FiMessageSquare, 
} from "react-icons/fi";



import { Link, useLocation } from "react-router-dom";


const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = { pathname: "/dashboard" }; // Simulating useLocation

  const menuItems = [
    { label: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { label: "Employee Management", icon: <FiUsers />, path: "/employees" },
    { label: "View Trainees", icon: <FiUser />, path: "/trainees" },
    { label: "Batch Management", icon: <FiLayers />, path: "/batches" },
    { label: "Reports", icon: <FiBarChart2 />, path: "/reports" },
    { label: "Messages", icon: <FiMessageSquare />, path: "/messages" },
  ];

  return (
    <aside
      className={`sticky left-0 top-0 h-screen bg-gradient-to-b from-blue-50 to-indigo-50 border-r border-blue-200 shadow-md transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } flex flex-col z-20`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-blue-200">
        <span
          className={`text-lg font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent ${
            collapsed ? "hidden" : "block"
          }`}
        >
          Navigation
        </span>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
        >
          <FiMenu />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.path}
            className={`flex items-center gap-3 px-4 py-3 my-1 mx-2 rounded-xl transition-all duration-200 font-medium ${
              location.pathname === item.path
                ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md"
                : "text-blue-700 hover:bg-blue-100 hover:shadow-sm"
            }`}
          >
            <span className={`text-xl ${location.pathname === item.path ? "text-white" : "text-blue-500"}`}>
              {item.icon}
            </span>
            <span className={collapsed ? "hidden" : "block"}>
              {item.label}
            </span>
          </a>
        ))}
      </nav>

      {/* Footer */}
      <div className={`p-4 border-t border-blue-200 ${collapsed ? "text-center" : ""}`}>
        <div className="text-blue-400 text-sm">
          {collapsed ? "v2.1" : "ETMS Platform v2.1"}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
