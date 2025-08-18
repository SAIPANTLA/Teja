import React, { useState } from "react";
import Modal from "../components/Modal";
import Toast from "../components/Toast";


const initialData = [
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
    password: ""
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
    setData((prev) => [
      ...prev,
      { ...form, photo: photoUrl }
    ]);
    setToast({ message: `${form.role} added successfully!`, type: "success" });

    setForm({
      name: "",
      trainerId: "",
      empId: "",
      personalEmail: "",
      phone: "",
      domain: "",
      role: "",
      password: ""
    });
    setPhotoFile(null);
    setPhotoPreview("");
    setIsModalOpen(false);
  };

  return (
    <div
      className="p-6 relative min-h-screen"
      style={{
        background: "rgba(246, 254, 251, 0.7)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center justify-between">
        Employee Management
        <button
          className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          onClick={handleOpenModal}
        >
          + ADD EMPLOYEE
        </button>
      </h2>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((emp) => (
          <div
            key={emp.trainerId}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center gap-4 hover:shadow-lg transition-shadow"
          >
            <img
              src={emp.photo}
              alt={emp.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-green-400 shadow"
            />
            <div className="text-lg font-bold text-green-700">{emp.name}</div>
            <div className="text-sm text-gray-500 mb-2">
              Emp ID:{" "}
              <span className="font-semibold text-gray-700">
                {emp.trainerId}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={form.role ? `ADD ${form.role.toUpperCase()}` : "ADD EMPLOYEE"}
      >
        <form onSubmit={handleAddUser}>
          <div className="flex justify-center items-center w-full">
            <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg p-8 gap-10 w-full max-w-7xl ">
              {/* Left: Profile Pic & Upload */}
              <div className="flex flex-col items-center justify-center md:w-80 w-full border-r md:pr-8 mb-8 md:mb-0">
                <img
                  src={photoPreview || "https://randomuser.me/api/portraits/lego/1.jpg"}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-full border-4 border-green-400 shadow mb-4"
                />
                <label className="block mb-1 font-medium text-gray-700">
                  Upload Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>
              {/* Right: Form Fields */}
              <div className="flex-1 flex flex-col gap-4">
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                  required
                >
                  <option value="" disabled>Select Role</option>
                  <option value="Trainer">Trainer</option>
                  <option value="Trainee">Trainee</option>
                </select>
                {form.role && (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Name"
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                      required
                    />
                    <input
                      type="text"
                      name="trainerId"
                      value={form.trainerId}
                      onChange={handleChange}
                      placeholder="Email ID"
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                      required
                    />
                    <input
                      type="text"
                      name="empId"
                      value={form.empId}
                      onChange={handleChange}
                      placeholder="Employee ID"
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                      required
                    />
                    <input
                      type="email"
                      name="personalEmail"
                      value={form.personalEmail}
                      onChange={handleChange}
                      placeholder="Personal Email ID"
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                      required
                    />
                    <input
                      type="text"
                      name="domain"
                      value={form.domain}
                      onChange={handleChange}
                      placeholder="Domain"
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
                    >
                      ADD {form.role.toUpperCase()}
                    </button>
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
  );
}