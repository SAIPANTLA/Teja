import React, { useState, useEffect } from "react";
import {
  FiUsers,
  FiUserCheck,
  FiLayers,
  FiClipboard,
  FiMessageCircle,
  FiCalendar,
} from "react-icons/fi";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { motion } from "framer-motion";

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const summary = [
  {
    title: "Total Trainees",
    value: 120,
    icon: <FiUsers />,
    color: "from-blue-500 to-purple-500",
    link: "/trainees",
  },
  {
    title: "Active Trainers",
    value: 8,
    icon: <FiUserCheck />,
    color: "from-green-400 to-teal-400",
    link: "/employees",
  },
  {
    title: "Ongoing Batches",
    value: 6,
    icon: <FiLayers />,
    color: "from-orange-400 to-pink-400",
    link: "/batches",
  },
  {
    title: "Pending Tasks",
    value: 15,
    icon: <FiClipboard />,
    color: "from-pink-500 to-orange-400",
    link: "/tasks",
  },
  {
    title: "Queries",
    value: 5,
    icon: <FiMessageCircle />,
    color: "from-purple-500 to-blue-400",
    link: "/queries",
  },
];

const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Performance %",
      data: [75, 80, 78, 85, 90, 88, 92],
      fill: false,
      borderColor: "#6366f1",
      backgroundColor: "#6366f1",
      tension: 0.4,
      pointBackgroundColor: "#fff",
      pointBorderColor: "#6366f1",
    },
  ],
};

const pieData = {
  labels: ["Java", "Python", "Power BI", "DevOps", "HR", "Testing"],
  datasets: [
    {
      label: "Batches",
      data: [2, 2, 1, 1, 1, 1],
      backgroundColor: [
        "#6366f1",
        "#34d399",
        "#fbbf24",
        "#0ea5e9",
        "#f472b6",
        "#fb7185",
      ],
      borderWidth: 1,
    },
  ],
};

const recentActivity = [
  { name: "Alice Brown", action: "Completed Assessment", status: "success" },
  { name: "Bob Green", action: "Submitted Assignment", status: "info" },
  { name: "Jane Smith", action: "Batch Started", status: "warning" },
  { name: "John Doe", action: "Query Raised", status: "error" },
];

const statusColors = {
  success: "bg-green-500",
  info: "bg-blue-500",
  warning: "bg-orange-400",
  error: "bg-pink-500",
};

const Dashboard = () => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const date = now.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const time = now.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      });
      setDateTime(`${date} • ${time}`);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <motion.div
        className="bg-gradient-to-r from-green-100 via-teal-50 to-blue-100 rounded-xl p-6 flex flex-col justify-center items-start shadow-sm border border-green-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-green-800">
          Welcome to the ETMS Admin Panel
        </h1>
        <p className="text-gray-700 mt-2 flex items-center gap-2">
          <FiCalendar /> {dateTime}
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {summary.map((item, idx) => (
          <motion.a
            key={item.title}
            href={item.link}
            className={`rounded-xl shadow-md p-6 flex items-center gap-4 transition-transform duration-200 hover:scale-105 hover:shadow-lg bg-gradient-to-br ${item.color}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="text-4xl text-white drop-shadow-lg">
              {item.icon}
            </div>
            <div>
              <div className="text-md font-semibold text-white mb-1">
                {item.title}
              </div>
              <div className="text-3xl font-bold text-white">
                {item.value}
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center min-h-[300px]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <span className="text-lg font-bold text-blue-600 mb-2">
            Trainee Performance Trend
          </span>
          <div className="w-full h-56">
            <Line
              data={lineData}
              options={{
                plugins: { legend: { display: false } },
                maintainAspectRatio: false,
              }}
            />
          </div>
        </motion.div>
        <motion.div
          className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center min-h-[300px]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <span className="text-lg font-bold text-teal-600 mb-2">
            Batch Distribution by Domain
          </span>
          <div className="w-40 h-60">
            <Pie
              data={pieData}
              options={{
                plugins: { legend: { position: "bottom" } },
                maintainAspectRatio: false,
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        className="bg-gradient-to-br from-blue-50 to-purple-100 rounded-xl shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-lg font-bold text-purple-700 mb-4 block">
          Recent Activity
        </span>
        <ul className="space-y-3">
          {recentActivity.map((item, idx) => (
            <motion.li
              key={idx}
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${statusColors[item.status]}`}
                ></span>
                <span className="font-medium text-gray-700">
                  {item.name}
                </span>
                <span className="text-gray-500 text-sm">
                  {item.action}
                </span>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold text-white ${statusColors[item.status]}`}
              >
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default Dashboard;
