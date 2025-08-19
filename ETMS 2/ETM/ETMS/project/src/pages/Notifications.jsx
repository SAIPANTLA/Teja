import React, { useState } from "react";
import {
  FiBell,
  FiCheck,
  FiX,
  FiFilter,
  FiSearch,
  FiClock,
  FiUser,
  FiAlertTriangle,
  FiInfo,
} from "react-icons/fi";

const Notifications = () => {
  // ✅ Simple inline toast system (instead of external hook)
  const [toasts, setToasts] = useState([]);

  const showToast = (title, description) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, description }]);

    // Auto-remove toast after 3s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "task",
      title: "New Task Assigned",
      message: "Python basics assignment has been assigned to Batch Python-01",
      time: "2 minutes ago",
      read: false,
      priority: "high",
      sender: "System",
    },
    {
      id: 2,
      type: "attendance",
      title: "Low Attendance Alert",
      message: "Bob Green has missed 3 consecutive sessions in Java-02 batch",
      time: "15 minutes ago",
      read: false,
      priority: "medium",
      sender: "Attendance System",
    },
    {
      id: 3,
      type: "assessment",
      title: "Assessment Completed",
      message:
        "Alice Brown completed React fundamentals assessment with 95% score",
      time: "1 hour ago",
      read: true,
      priority: "low",
      sender: "Assessment System",
    },
    {
      id: 4,
      type: "system",
      title: "System Maintenance",
      message: "Scheduled maintenance will begin at 2:00 AM tomorrow",
      time: "2 hours ago",
      read: false,
      priority: "high",
      sender: "Admin",
    },
    {
      id: 5,
      type: "batch",
      title: "New Batch Created",
      message: "Angular-05 batch has been created with 12 trainees",
      time: "3 hours ago",
      read: true,
      priority: "low",
      sender: "Batch Manager",
    },
    {
      id: 6,
      type: "performance",
      title: "Performance Alert",
      message: "Overall batch performance for Node-04 dropped below 80%",
      time: "5 hours ago",
      read: false,
      priority: "medium",
      sender: "Performance Monitor",
    },
  ]);

  const getIcon = (type) => {
    switch (type) {
      case "task":
        return <FiCheck className="text-green-600" />;
      case "attendance":
        return <FiUser className="text-yellow-600" />;
      case "assessment":
        return <FiBell className="text-blue-600" />;
      case "system":
        return <FiAlertTriangle className="text-red-600" />;
      case "batch":
        return <FiInfo className="text-purple-600" />;
      case "performance":
        return <FiClock className="text-orange-600" />;
      default:
        return <FiBell className="text-gray-400" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-red-400 bg-red-50";
      case "medium":
        return "border-yellow-400 bg-yellow-50";
      case "low":
        return "border-gray-300 bg-gray-50";
      default:
        return "border-gray-200 bg-white";
    }
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    showToast("Notification marked as read", "The notification has been marked.");
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    showToast("All notifications marked", "All notifications are read now.");
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    showToast("Notification deleted", "The notification has been removed.");
  };

  const filteredNotifications = notifications.filter((notif) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !notif.read) ||
      (filter === "read" && notif.read) ||
      notif.type === filter;

    const matchesSearch =
      notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="p-6 max-w-4xl mx-auto relative">
      {/* Toasts */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-white border border-gray-200 shadow-lg rounded-lg p-4 w-72 animate-fade-in"
          >
            <h4 className="font-semibold text-gray-800">{toast.title}</h4>
            <p className="text-sm text-gray-600">{toast.description}</p>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Notifications
            </h1>
            <p className="text-gray-500">
              Stay updated with system alerts and activities
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {unreadCount} unread
            </span>
            <button
              onClick={markAllAsRead}
              className="text-green-600 hover:text-green-800 font-medium"
            >
              Mark all as read
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="task">Tasks</option>
              <option value="attendance">Attendance</option>
              <option value="assessment">Assessments</option>
              <option value="system">System</option>
              <option value="batch">Batches</option>
              <option value="performance">Performance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <FiBell className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-800">
              No notifications found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
                notification.read
                  ? "bg-white border-gray-200"
                  : getPriorityColor(notification.priority)
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  {getIcon(notification.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3
                        className={`font-medium ${
                          notification.read
                            ? "text-gray-500"
                            : "text-gray-800"
                        }`}
                      >
                        {notification.title}
                      </h3>
                      <p
                        className={`text-sm mt-1 ${
                          notification.read
                            ? "text-gray-400"
                            : "text-gray-600"
                        }`}
                      >
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FiClock />
                          {notification.time}
                        </span>
                        <span>From: {notification.sender}</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            notification.priority === "high"
                              ? "bg-red-100 text-red-600"
                              : notification.priority === "medium"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {notification.priority} priority
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                          title="Mark as read"
                        >
                          <FiCheck />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete notification"
                      >
                        <FiX />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
