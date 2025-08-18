
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Modal from "../components/Modal";
import Toast from "../components/Toast";
import trainersData from "./EmployeeManagement";

const batches = [
  { batchId: "PY-01", domain: "Python", trainees: 20, trainers: ["John Doe"], start: "2025-08-01", end: "2025-09-01" },
  { batchId: "JA-02", domain: "Java", trainees: 15, trainers: ["Jane Smith"], start: "2025-08-05", end: "2025-09-05" },
  // Add more batches with multiple trainers if needed
];

const domains = ["Python", "Java", "Testing", "DevOps", "Power BI", "HR"];


const EmployeeManagementData = [
  {
    name: "John Doe",
    trainerId: "T101",
    batches: "Batch A, Batch B",
    traineeCount: 35,
    photo: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Jane Smith",
    trainerId: "T102",
    batches: "Batch C",
    traineeCount: 20,
    photo: "https://randomuser.me/api/portraits/women/44.jpg"
  },
];

const BatchManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const navigate = useNavigate();

  // Filter batches by selected domain
  const filteredBatches = selectedDomain ? batches.filter(b => b.domain === selectedDomain) : batches;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-blue-700 mb-4">Batch Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {domains.map((d) => (
          <div key={d} onClick={() => setSelectedDomain(d)} style={{ cursor: "pointer" }}>
            <Card icon={<span className="text-lg">📦</span>} title={d} value={`Batches: ${batches.filter(b => b.domain === d).length}`} color={selectedDomain === d ? "blue" : "green"} />
          </div>
        ))}
        {selectedDomain && (
          <button className="ml-4 text-sm text-blue-600 underline" onClick={() => setSelectedDomain(null)}>Show All Domains</button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBatches.map((b) => (
          <div key={b.batchId} className="bg-green-50 rounded-xl shadow-md p-4 flex flex-col gap-2 border-t-4 border-green-400">
            <div className="font-bold text-green-700">Batch ID: {b.batchId}</div>
            <div>Domain: {b.domain}</div>
            <div>No. of Trainees: {b.trainees}</div>
            <div>Trainers: {b.trainers.join(", ")}</div>
            <div>Start: {b.start}</div>
            <div>End: {b.end}</div>
            <div className="flex gap-2 mt-2">
              <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" onClick={() => navigate(`/batch/${b.batchId}`)}>View</button>
              <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600" onClick={() => setIsOpen(true)}>Edit</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onClick={() => setToast({ message: "Batch removed!", type: "success" })}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <button className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 mt-6" onClick={() => setIsOpen(true)}>Add Batch</button>

      {/* Modal for Add/Edit Batch (existing) */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add/Edit Batch">
        <form className="space-y-4">
          <input placeholder="Batch ID" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" />
          <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200">
            {domains.map((d) => <option key={d}>{d}</option>)}
          </select>
          <input placeholder="No. of Trainees" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" />
          <input placeholder="Trainer(s) (comma separated)" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" />
          <input type="date" placeholder="Start Date" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" />
          <input type="date" placeholder="End Date" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 w-full">Save</button>
        </form>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default BatchManagement;
