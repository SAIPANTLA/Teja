import React, { useState } from "react";
import {
  FiMenu,
  FiHome,
  FiUsers,
  FiLayers,
  FiBarChart2,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", icon: <FiHome />, path: "/dashboard" },
  { label: "Employee Management", icon: <FiUsers />, path: "/employees" },
  { label: "View Trainees", icon: <FiUsers />, path: "/trainees" },
  { label: "Batch Management", icon: <FiLayers />, path: "/batches" },
  { label: "Reports", icon: <FiBarChart2 />, path: "/reports" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`sticky left-0 top-0 h-screen bg-green-50 border-r border-green-200 shadow-sm transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } flex flex-col z-20 top-0  `}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-green-100">
        <span
          className={`text-lg font-bold text-green-700 ${
            collapsed ? "hidden" : "block"
          }`}
        >
          Menu
        </span>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:text-green-600"
        >
          <FiMenu />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 my-1 rounded-md transition-colors duration-200 hover:bg-green-100 text-gray-700 font-medium ${
              location.pathname === item.path
                ? "bg-green-200 text-green-700"
                : ""
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className={collapsed ? "hidden" : "block"}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
