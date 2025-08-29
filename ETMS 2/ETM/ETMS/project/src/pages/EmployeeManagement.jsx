import React, { useState } from "react";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

const initialData = [
  {
    name: "John Doe",
    trainerId: "T101",
    batches: "PY-01, PY-02",
    traineeCount: 35,
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    domain: "Full Stack Development",
    performance: 92,
    experience: "5 years",
    joinDate: "2022-03-15",
    meetings: [
      { date: "2023-10-15", topic: "React Fundamentals", duration: "2h" },
      { date: "2023-10-17", topic: "State Management", duration: "1.5h" },
      { date: "2023-10-20", topic: "API Integration", duration: "2h" }
    ]
  },
  {
    name: "Jane Smith",
    trainerId: "T102",
    batches: "JA-02, JA-03",
    traineeCount: 20,
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    domain: "Data Science",
    performance: 87,
    experience: "4 years",
    joinDate: "2022-05-22",
    meetings: [
      { date: "2023-10-16", topic: "Python Basics", duration: "2h" },
      { date: "2023-10-19", topic: "Data Visualization", duration: "2h" }
    ]
  },
  {
    name: "Robert Johnson",
    trainerId: "T103",
    batches: "DE-03, DE-04",
    traineeCount: 28,
    photo: "https://randomuser.me/api/portraits/men/67.jpg",
    email: "robert.j@example.com",
    phone: "+1 (555) 456-7890",
    domain: "DevOps Engineering",
    performance: 95,
    experience: "6 years",
    joinDate: "2021-11-10",
    meetings: [
      { date: "2023-10-18", topic: "CI/CD Pipelines", duration: "2.5h" },
      { date: "2023-10-21", topic: "Cloud Infrastructure", duration: "2h" }
    ]
  },
  {
    name: "Sarah Wilson",
    trainerId: "T104",
    batches: "TE-04, TE-05",
    traineeCount: 18,
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    email: "sarah.w@example.com",
    phone: "+1 (555) 234-5678",
    domain: "Quality Assurance",
    performance: 89,
    experience: "3 years",
    joinDate: "2023-01-15",
    meetings: [
      { date: "2023-10-14", topic: "Test Automation", duration: "2h" },
      { date: "2023-10-22", topic: "Performance Testing", duration: "1.5h" }
    ]
  }
];

export default function EmployeeManagement() {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    name: "",
    trainerId: "",
    empId: "",
    personalEmail: "",
    phone: "",
    domain: "",
    role: "",
    password: "",
    experience: "",
    joinDate: ""
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [view, setView] = useState("grid"); // 'grid' or 'detail'
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDomain, setFilterDomain] = useState("all");

  // Get unique domains for filter
  const domains = ["all", ...new Set(data.map(emp => emp.domain))];

  // Filter employees based on search and domain
  const filteredEmployees = data.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         emp.trainerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = filterDomain === "all" || emp.domain === filterDomain;
    return matchesSearch && matchesDomain;
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setForm({
      name: "",
      trainerId: "",
      empId: "",
      personalEmail: "",
      phone: "",
      domain: "",
      role: "",
      password: "",
      experience: "",
      joinDate: ""
    });
    setPhotoFile(null);
    setPhotoPreview("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoFile(null);
      setPhotoPreview("");
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.trainerId ||
      !form.empId ||
      !form.personalEmail ||
      !form.phone ||
      !form.domain ||
      !form.role ||
      !form.password
    ) {
      setToast({ message: "All fields are required!", type: "error" });
      return;
    }
    let photoUrl = "https://randomuser.me/api/portraits/lego/1.jpg";
    if (photoFile && photoPreview) {
      photoUrl = photoPreview;
    }
    
    const newEmployee = { 
      ...form, 
      photo: photoUrl,
      traineeCount: 0,
      performance: 85,
      meetings: [],
      batches: "New Batch",
      experience: form.experience || "0 years",
      joinDate: form.joinDate || new Date().toISOString().split('T')[0]
    };
    
    setData((prev) => [...prev, newEmployee]);
    setToast({ message: `${form.role} added successfully!`, type: "success" });
    handleCloseModal();
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setView("detail");
  };

  const handleBackToList = () => {
    setView("grid");
    setSelectedEmployee(null);
  };

  // Performance indicator with color coding
  const getPerformanceColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    if (score >= 70) return "text-orange-600";
    return "text-red-600";
  };

  const getPerformanceBgColor = (score) => {
    if (score >= 90) return "bg-green-100";
    if (score >= 80) return "bg-yellow-100";
    if (score >= 70) return "bg-orange-100";
    return "bg-red-100";
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            {view === "detail" ? (
              <div className="flex items-center">
                <button 
                  onClick={handleBackToList}
                  className="mr-4 p-2 rounded-full hover:bg-blue-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                Employee Details
              </div>
            ) : (
              "Employee Management"
            )}
          </h2>
          
          {view === "grid" && (
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 w-full"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <select
                value={filterDomain}
                onChange={(e) => setFilterDomain(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
              >
                {domains.map(domain => (
                  <option key={domain} value={domain}>
                    {domain === "all" ? "All Domains" : domain}
                  </option>
                ))}
              </select>
              
              <button
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center"
                onClick={handleOpenModal}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                ADD EMPLOYEE
              </button>
            </div>
          )}
        </div>

        {view === "grid" ? (
          /* Employee Cards Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEmployees.map((emp) => (
              <div
                key={emp.trainerId}
                className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border border-gray-100"
                onClick={() => handleEmployeeClick(emp)}
              >
                <div className="relative">
                  <div className="h-24 bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                    <img
                      src={emp.photo}
                      alt={emp.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>
                </div>
                <div className="pt-14 pb-5 px-5 text-center">
                  <h3 className="text-lg font-bold text-gray-800">{emp.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">ID: {emp.trainerId}</p>
                  <p className="text-sm text-gray-600 mb-3">{emp.domain}</p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {emp.traineeCount} Trainees
                    </span>
                    <span className={`flex items-center font-semibold ${getPerformanceColor(emp.performance)}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {emp.performance}%
                    </span>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3 text-left">
                    <p className="text-xs font-medium text-blue-800 mb-1">Batches:</p>
                    <p className="text-xs text-blue-700 truncate">{emp.batches}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredEmployees.length === 0 && (
              <div className="col-span-full text-center py-12 bg-white rounded-2xl shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No employees found</h3>
                <p className="text-gray-500">
                  {searchTerm || filterDomain !== "all" 
                    ? "Try adjusting your search or filter criteria" 
                    : "No employees have been added yet"}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Employee Detail View */
          selectedEmployee && (
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="relative">
                <div className="h-32 bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                <div className="absolute -bottom-16 left-8">
                  <img
                    src={selectedEmployee.photo}
                    alt={selectedEmployee.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
              </div>
              
              <div className="pt-20 pb-8 px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Left Column - Basic Info */}
                  <div className="md:col-span-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedEmployee.name}</h3>
                    <p className="text-sm text-gray-600 mb-6">ID: {selectedEmployee.trainerId}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Email</p>
                        <p className="text-sm text-gray-800">{selectedEmployee.email}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Phone</p>
                        <p className="text-sm text-gray-800">{selectedEmployee.phone}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Domain</p>
                        <p className="text-sm text-gray-800">{selectedEmployee.domain}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Experience</p>
                        <p className="text-sm text-gray-800">{selectedEmployee.experience}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Join Date</p>
                        <p className="text-sm text-gray-800">{selectedEmployee.joinDate}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Batches</p>
                        <p className="text-sm text-gray-800">{selectedEmployee.batches}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Middle Column - Performance */}
                  <div className="md:col-span-1">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Performance Metrics</h4>
                    
                    <div className="bg-blue-50 rounded-xl p-5 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Overall Score</span>
                        <span className={`text-lg font-bold ${getPerformanceColor(selectedEmployee.performance)}`}>
                          {selectedEmployee.performance}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${selectedEmployee.performance}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-blue-700">{selectedEmployee.traineeCount}</p>
                        <p className="text-xs text-blue-600">Trainees</p>
                      </div>
                      
                      <div className="bg-purple-50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-purple-700">{selectedEmployee.meetings.length}</p>
                        <p className="text-xs text-purple-600">Sessions</p>
                      </div>
                      
                      <div className="bg-yellow-50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-yellow-700">{(selectedEmployee.traineeCount * 3.2).toFixed(1)}</p>
                        <p className="text-xs text-yellow-600">Avg. Hours/Day</p>
                      </div>
                      
                      <div className="bg-teal-50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-teal-700">{(selectedEmployee.performance / 10).toFixed(1)}</p>
                        <p className="text-xs text-teal-600">Satisfaction</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column - Meetings */}
                  <div className="md:col-span-1">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Recent Sessions</h4>
                    
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                      {selectedEmployee.meetings.map((meeting, index) => (
                        <div key={index} className="bg-gray-50 rounded-xl p-4">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-medium text-gray-800">{meeting.topic}</span>
                            <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                              {meeting.duration}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">{new Date(meeting.date).toLocaleDateString()}</p>
                        </div>
                      ))}
                      
                      {selectedEmployee.meetings.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-8">No sessions scheduled yet</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={form.role ? `ADD ${form.role.toUpperCase()}` : "ADD EMPLOYEE"}
          width="max-w-4xl"
        >
          <form onSubmit={handleAddUser}>
            <div className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden">
              {/* Left: Profile Pic & Upload */}
              <div className="md:w-1/3 bg-blue-50 p-6 flex flex-col items-center justify-center">
                <div className="mb-6">
                  <img
                    src={photoPreview || "https://randomuser.me/api/portraits/lego/1.jpg"}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-full border-4 border-blue-400 shadow mx-auto"
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-2 font-medium text-gray-700">
                    Upload Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div>
              
              {/* Right: Form Fields */}
              <div className="md:w-2/3 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <select
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                      required
                    >
                      <option value="" disabled>Select Role</option>
                      <option value="Trainer">Trainer</option>
                      <option value="Trainee">Trainee</option>
                    </select>
                  </div>
                  
                  {form.role && (
                    <>
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Full Name"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                          required
                        />
                      </div>
                      
                      <div>
                        <input
                          type="text"
                          name="trainerId"
                          value={form.trainerId}
                          onChange={handleChange}
                          placeholder="Email ID"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                          required
                        />
                      </div>
                      
                      <div>
                        <input
                          type="text"
                          name="empId"
                          value={form.empId}
                          onChange={handleChange}
                          placeholder="Employee ID"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                          required
                        />
                      </div>
                      
                      <div>
                        <input
                          type="email"
                          name="personalEmail"
                          value={form.personalEmail}
                          onChange={handleChange}
                          placeholder="Personal Email"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                          required
                        />
                      </div>
                      
                      <div>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                          required
                        />
                      </div>
                      
                      <div>
                        <input
                          type="text"
                          name="domain"
                          value={form.domain}
                          onChange={handleChange}
                          placeholder="Domain/Expertise"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                          required
                        />
                      </div>
                      
                      <div>
                        <input
                          type="text"
                          name="experience"
                          value={form.experience}
                          onChange={handleChange}
                          placeholder="Experience (e.g., 3 years)"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                        />
                      </div>
                      
                      <div>
                        <input
                          type="date"
                          name="joinDate"
                          value={form.joinDate}
                          onChange={handleChange}
                          placeholder="Join Date"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <input
                          type="password"
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          placeholder="Password"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                          required
                        />
                      </div>
                      
                      <div className="md:col-span-2 mt-4">
                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-2.5 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all"
                        >
                          ADD {form.role.toUpperCase()}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Modal>

        {/* Toast */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}