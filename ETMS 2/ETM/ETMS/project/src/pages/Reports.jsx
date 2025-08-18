import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

const employees = [
  {
    name: "Alice Brown",
    attendance: 92,
    assignments: 90,
    assessment: 88,
  },
  {
    name: "Bob Green",
    attendance: 85,
    assignments: 80,
    assessment: 80,
  },
];

function getPieData(employee) {
  const overall = ((employee.attendance + employee.assignments + employee.assessment) / 3).toFixed(2);
  return {
    labels: ["Attendance", "Assignments", "Assessment"],
    datasets: [
      {
        label: `${employee.name} (Overall: ${overall}%)`,
        data: [employee.attendance, employee.assignments, employee.assessment],
        backgroundColor: ["#34d399", "#60a5fa", "#fbbf24"],
        borderWidth: 1,
      },
    ],
  };
}

function getOverallPieData(employees) {
  const total = employees.length;
  const avgAttendance = employees.reduce((sum, e) => sum + e.attendance, 0) / total;
  const avgAssignments = employees.reduce((sum, e) => sum + e.assignments, 0) / total;
  const avgAssessment = employees.reduce((sum, e) => sum + e.assessment, 0) / total;
  return {
    labels: ["Attendance", "Assignments", "Assessment"],
    datasets: [
      {
        label: "Overall Percentage",
        data: [avgAttendance, avgAssignments, avgAssessment],
        backgroundColor: ["#34d399", "#60a5fa", "#fbbf24"],
        borderWidth: 1,
      },
    ],
  };
}

const Reports = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-green-700 mb-4">Reports</h2>
      {/* Grid with 3 columns for employee cards */}
      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {employees.map((emp) => {
          const overall = ((emp.attendance + emp.assignments + emp.assessment) / 3).toFixed(2);
          return (
            <div key={emp.name} className="p-4 border rounded shadow flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-2 text-green-600">{emp.name}</h3>
              <div style={{ width: 120, height: 150}}>
                <Pie data={getPieData(emp)} options={{ maintainAspectRatio: false }} />
              </div>
              <div className="text-center mt-4 text-sm text-gray-700 font-medium">
                Overall Percentage: {overall}%
              </div>
            </div>
          );
        })}
      </div>
      <button className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 mt-6">Download Report</button>
    </div>
  );
};

export default Reports;
