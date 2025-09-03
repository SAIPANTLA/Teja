import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeManagement from "./pages/EmployeeManagement";
import ViewTrainees from "./pages/ViewTrainees";
import BatchManagement from "./pages/BatchManagement";
import TraineeDetails from "./pages/TraineeDetails";
import BatchDetails from "./pages/BatchDetails";
import Notifications from "./pages/Notifications";
import AddEmployee from "./pages/Addemployee";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-green-50 flex">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <div className="sticky top-0 z-20">
            <Navbar />
          </div>

          <main className="flex-1 overflow-y-auto ">
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/employees" element={<EmployeeManagement />} />
              <Route path="/trainees" element={<ViewTrainees />} />
              <Route path="/trainee/:empId" element={<TraineeDetails />} />
              <Route path="/batches" element={<BatchManagement />} />
              <Route path="/batch/:batchId" element={<BatchDetails />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/add-employee" element={<AddEmployee/>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
