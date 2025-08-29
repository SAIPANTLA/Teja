import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

const batchesData = [
  { 
    batchId: "PY-01", 
    domain: "Python", 
    trainees: 20, 
    trainers: ["John Doe"], 
    start: "2025-08-01", 
    end: "2025-09-01",
    status: "Active",
    progress: 65
  },
  { 
    batchId: "JA-02", 
    domain: "Java", 
    trainees: 15, 
    trainers: ["Jane Smith"], 
    start: "2025-08-05", 
    end: "2025-09-05",
    status: "Upcoming",
    progress: 0
  },
  { 
    batchId: "DE-03", 
    domain: "DevOps", 
    trainees: 18, 
    trainers: ["Robert Johnson", "Sarah Wilson"], 
    start: "2025-07-15", 
    end: "2025-08-30",
    status: "Active",
    progress: 85
  },
  { 
    batchId: "TE-04", 
    domain: "Testing", 
    trainees: 12, 
    trainers: ["Michael Brown"], 
    start: "2025-06-10", 
    end: "2025-07-25",
    status: "Completed",
    progress: 100
  },
];

const domains = ["Python", "Java", "Testing", "DevOps", "Power BI", "HR"];

const trainers = [
  { id: "T101", name: "John Doe" },
  { id: "T102", name: "Jane Smith" },
  { id: "T103", name: "Robert Johnson" },
  { id: "T104", name: "Sarah Wilson" },
  { id: "T105", name: "Michael Brown" },
];

const BatchManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [batches, setBatches] = useState(batchesData);
  const [editingBatch, setEditingBatch] = useState(null);
  const [formData, setFormData] = useState({
    batchId: "",
    domain: "",
    trainees: "",
    trainers: [],
    start: "",
    end: ""
  });
  const navigate = useNavigate();

  // Filter batches by selected domain
  const filteredBatches = selectedDomain 
    ? batches.filter(b => b.domain === selectedDomain) 
    : batches;

  const handleDomainSelect = (domain) => {
    setSelectedDomain(selectedDomain === domain ? null : domain);
  };

  const handleAddBatch = () => {
    setEditingBatch(null);
    setFormData({
      batchId: "",
      domain: "",
      trainees: "",
      trainers: [],
      start: "",
      end: ""
    });
    setIsOpen(true);
  };

  const handleEditBatch = (batch) => {
    setEditingBatch(batch);
    setFormData({
      batchId: batch.batchId,
      domain: batch.domain,
      trainees: batch.trainees,
      trainers: batch.trainers,
      start: batch.start,
      end: batch.end
    });
    setIsOpen(true);
  };

  const handleDeleteBatch = (batchId) => {
    setBatches(batches.filter(b => b.batchId !== batchId));
    setToast({ message: "Batch removed successfully!", type: "success" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTrainerSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, trainers: selectedOptions }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingBatch) {
      // Update existing batch
      setBatches(batches.map(b => 
        b.batchId === editingBatch.batchId 
          ? { ...formData, status: editingBatch.status, progress: editingBatch.progress }
          : b
      ));
      setToast({ message: "Batch updated successfully!", type: "success" });
    } else {
      // Add new batch
      const newBatch = {
        ...formData,
        trainees: parseInt(formData.trainees),
        status: "Upcoming",
        progress: 0
      };
      setBatches([...batches, newBatch]);
      setToast({ message: "Batch added successfully!", type: "success" });
    }
    
    setIsOpen(false);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Upcoming": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (progress) => {
    if (progress < 30) return "bg-red-500";
    if (progress < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="p-6 min-h-screen" style={{
      background: "linear-gradient(135deg, rgba(240, 249, 255, 0.9) 0%, rgba(224, 242, 254, 0.9) 100%)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    }}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-blue-800">Batch Management</h2>
        <button 
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center"
          onClick={handleAddBatch}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          ADD BATCH
        </button>
      </div>

      {/* Domain Filter Cards */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Filter by Domain</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {domains.map((domain) => (
            <div 
              key={domain} 
              onClick={() => handleDomainSelect(domain)}
              className={`p-4 rounded-xl shadow-sm cursor-pointer transition-all duration-300 ${
                selectedDomain === domain 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white" 
                  : "bg-white hover:bg-blue-50 text-gray-700"
              }`}
            >
              <div className="flex flex-col items-center justify-center">
                <span className="text-2xl mb-2">
                  {domain === "Python" && "🐍"}
                  {domain === "Java" && "☕"}
                  {domain === "Testing" && "🧪"}
                  {domain === "DevOps" && "🔧"}
                  {domain === "Power BI" && "📊"}
                  {domain === "HR" && "👥"}
                </span>
                <span className="font-medium text-center">{domain}</span>
                <span className="text-sm mt-1">
                  {batches.filter(b => b.domain === domain).length} batches
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {selectedDomain && (
          <div className="mt-4 flex justify-end">
            <button 
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              onClick={() => setSelectedDomain(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Clear Filter
            </button>
          </div>
        )}
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredBatches.map((batch) => (
          <div key={batch.batchId} className="bg-white rounded-2xl shadow-md overflow-hidden border-t-4 border-blue-400 transition-all duration-300 hover:shadow-lg">
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-blue-800">{batch.batchId}</h3>
                  <p className="text-sm text-gray-600">{batch.domain}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(batch.status)}`}>
                  {batch.status}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{batch.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(batch.progress)}`}
                    style={{ width: `${batch.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {batch.trainees} Trainees
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {batch.start} to {batch.end}
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Trainers:</p>
                <p className="text-sm text-gray-600">{batch.trainers.join(", ")}</p>
              </div>
              
              <div className="flex gap-2">
                <button 
                  className="flex-1 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                  onClick={() => navigate(`/batch/${batch.batchId}`)}
                >
                  View
                </button>
                <button 
                  className="flex-1 bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-sm hover:bg-green-200 transition-colors"
                  onClick={() => handleEditBatch(batch)}
                >
                  Edit
                </button>
                <button 
                  className="flex-1 bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-sm hover:bg-red-200 transition-colors"
                  onClick={() => handleDeleteBatch(batch.batchId)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBatches.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No batches found</h3>
          <p className="text-gray-500">
            {selectedDomain 
              ? `No batches available for ${selectedDomain} domain` 
              : "No batches have been created yet"}
          </p>
        </div>
      )}

      {/* Modal for Add/Edit Batch */}
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title={editingBatch ? "Edit Batch" : "Add New Batch"}
        width="max-w-2xl"
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Batch ID</label>
              <input 
                name="batchId"
                value={formData.batchId}
                onChange={handleInputChange}
                placeholder="e.g., PY-01" 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
              <select 
                name="domain"
                value={formData.domain}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                required
              >
                <option value="">Select Domain</option>
                {domains.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Trainees</label>
              <input 
                type="number"
                name="trainees"
                value={formData.trainees}
                onChange={handleInputChange}
                placeholder="e.g., 20" 
                min="1"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trainers</label>
              <select 
                multiple
                value={formData.trainers}
                onChange={handleTrainerSelect}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 h-32"
                required
              >
                {trainers.map((trainer) => (
                  <option key={trainer.id} value={trainer.name}>{trainer.name} ({trainer.id})</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple trainers</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input 
                type="date"
                name="start"
                value={formData.start}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input 
                type="date"
                name="end"
                value={formData.end}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                required
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button 
              type="button"
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2.5 rounded-lg hover:bg-gray-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              {editingBatch ? "Update Batch" : "Create Batch"}
            </button>
          </div>
        </form>
      </Modal>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default BatchManagement;