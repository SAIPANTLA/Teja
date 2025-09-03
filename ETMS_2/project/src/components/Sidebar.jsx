import React, { useState } from "react";
import { FiMenu, FiHome, FiUsers, FiLayers, FiBarChart2 } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", icon: <FiHome />, path: "/dashboard" },
  { label: "Trainer Management", icon: <FiUsers />, path: "/employees" },
  { label: "Trainees Management", icon: <FiUsers />, path: "/trainees" },
  { label: "Batch Management", icon: <FiLayers />, path: "/batches" },
  // { label: "Reports", icon: <FiBarChart2 />, path: "/reports" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`sticky left-0 top-0 h-screen 
      bg-gradient-to-br from-indigo-200 via-blue-300 to-indigo-500 
      border-r border-white text-white shadow-md 
      transition-all duration-300 
      ${collapsed ? "w-21" : "w-64"} 
      flex flex-col z-20  overflow-hidden`} 
    >
    
      <div className="flex items-center justify-between px-3 py-6  relative z-10">
        <span className={`text-lg text-black font-bold ${collapsed ? "hidden" : "block"}`}>
          ETMS Admin Panel
        </span>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-black hover:text-black"
        >
         <FiMenu />
        </button>
      </div>

      <nav className="flex-1 py-4 relative z-10">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 my-1 rounded-md transition-colors duration-200 ${
              location.pathname === item.path
                ? "bg-white text-black"
                : "text-black hover:bg-white hover:text-black"
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className={collapsed ? "hidden" : "block"}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
