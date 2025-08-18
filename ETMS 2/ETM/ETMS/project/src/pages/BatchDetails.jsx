import React from "react";
import { useParams, Link } from "react-router-dom";


// Dummy trainers data (should be imported from EmployeeManagement or a shared store in real app)
const trainers = [
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

const batches = [
  { batchId: "PY-01", domain: "Python", trainees: 20, trainers: ["John Doe"], start: "2025-08-01", end: "2025-09-01" },
  { batchId: "JA-02", domain: "Java", trainees: 15, trainers: ["Jane Smith"], start: "2025-08-05", end: "2025-09-05" },
];

// Dummy trainees data (should be imported or fetched in real app)
const trainees = [
  {
    name: "Alice Brown",
    empId: "T201",
    batch: "PY-01",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    email: "alice@company.com",
    phone: "1112223333",
    domain: "Python Development",
    performance: 88,
    attendance: 93
  },
  {
    name: "Bob Green",
    empId: "T202",
    batch: "JA-02",
    photo: "https://randomuser.me/api/portraits/men/66.jpg",
    email: "bob@company.com",
    phone: "4445556666",
    domain: "Java Development",
    performance: 80,
    attendance: 83
  },
  {
    name: "Carol White",
    empId: "T203",
    batch: "PY-01",
    photo: "https://randomuser.me/api/portraits/women/67.jpg",
    email: "carol@company.com",
    phone: "7778889999",
    domain: "Python Development",
    performance: 94,
    attendance: 94
  }
];

const BatchDetails = () => {
  const { batchId } = useParams();
  const batch = batches.find(b => b.batchId === batchId);
  const batchTrainers = batch ? batch.trainers.map(name => trainers.find(t => t.name === name)).filter(Boolean) : [];

  if (!batch) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Batch not found</h2>
        <Link to="/batches" className="text-blue-600 underline">Back to Batch Management</Link>
      </div>
    );
  }

  // Filter trainees for this batch
  const batchTrainees = trainees.filter(t => t.batch === batch.batchId);

  return (
    <div className="min-h-screen p-8 bg-green-50">
      <Link to="/batches" className="text-blue-600 underline mb-4 inline-block">← Back to Batch Management</Link>
      <h2 className="text-2xl font-bold text-green-700 mb-4">Batch Details: {batch.batchId}</h2>

      {/* Trainers on top, horizontal row */}
      <div className="flex flex-wrap gap-8 mb-8 items-center justify-start">
        {batchTrainers.map(tr => (
          <div key={tr.trainerId} className="flex flex-col items-center bg-white p-4 rounded-xl shadow w-48">
            <img src={tr.photo} alt={tr.name} className="w-20 h-20 rounded-full border-4 border-green-400 mb-2 object-cover" />
            <div className="font-bold text-green-700 text-lg text-center">{tr.name}</div>
            <div className="text-xs text-gray-500 text-center">ID: {tr.trainerId}</div>
            <div className="text-xs text-gray-500 text-center">Batches: {tr.batches}</div>
            <div className="text-xs text-gray-500 text-center">Trainees: {tr.traineeCount}</div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <div><b>Domain:</b> {batch.domain}</div>
        <div><b>No. of Trainees:</b> {batch.trainees}</div>
        <div><b>Start:</b> {batch.start}</div>
        <div><b>End:</b> {batch.end}</div>
      </div>

      {/* Trainees section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Trainees</h3>
        <div className="flex flex-wrap gap-6">
          {batchTrainees.length === 0 && <div className="text-gray-500">No trainees in this batch.</div>}
          {batchTrainees.map(tr => (
            <div key={tr.empId} className="flex flex-col items-center bg-white p-4 rounded-xl shadow w-48">
              <img src={tr.photo} alt={tr.name} className="w-16 h-16 rounded-full border-2 border-blue-400 mb-2 object-cover" />
              <div className="font-bold text-blue-700 text-center">{tr.name}</div>
              <div className="text-xs text-gray-500 text-center">ID: {tr.empId}</div>
              <div className="text-xs text-gray-500 text-center">Email: {tr.email}</div>
              <div className="text-xs text-gray-500 text-center">Phone: {tr.phone}</div>
              <div className="text-xs text-gray-500 text-center">Domain: {tr.domain}</div>
              <div className="text-xs text-gray-500 text-center">Performance: {tr.performance}%</div>
              <div className="text-xs text-gray-500 text-center">Attendance: {tr.attendance}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BatchDetails;
