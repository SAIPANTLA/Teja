import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import EmployeeManagement from "./pages/EmployeeManagement";
import ViewTrainees from "./pages/ViewTrainees";
import BatchManagement from "./pages/BatchManagement";
import Reports from "./pages/Reports";
import TraineeDetails from "./pages/TraineeDetails";
import BatchDetails from "./pages/BatchDetails";
import Notifications from "./pages/Notifications";
import MessagesPage from "./pages/MessagesPage";
import AddEmployee from "./pages/Addemployee";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-green-50 flex">
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Right section with Navbar on top and main content below */}
        <div className="flex-1 flex flex-col">
          {/* Navbar pinned to top of right side */}
          <div className="sticky top-0 z-20">
            <Navbar />
          </div>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto ">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<EmployeeManagement />} />
              <Route path="/trainees" element={<ViewTrainees />} />
              <Route path="/trainee/:empId" element={<TraineeDetails />} />
              <Route path="/batches" element={<BatchManagement />} />
              <Route path="/batch/:batchId" element={<BatchDetails />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/add-employee" element={<AddEmployee/>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
