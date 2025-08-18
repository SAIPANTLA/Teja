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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-green-50 flex flex-col">
        <Navbar />
        <div className="flex flex-1 min-h-0 ">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<EmployeeManagement />} />
              <Route path="/trainees" element={<ViewTrainees />} />
              <Route path="/trainee/:empId" element={<TraineeDetails />} />
              <Route path="/batches" element={<BatchManagement />} />
              <Route path="/batch/:batchId" element={<BatchDetails />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App
