import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiAward,
  FiBookOpen
} from "react-icons/fi";

const icons = {
  ArrowLeft: <FiArrowLeft />,
  Calendar: <FiCalendar />,
  CheckCircle: <FiCheckCircle />,
  Clock: <FiClock />,
  XCircle: <FiXCircle />,
  Trophy: <FiAward />,
  BookOpen: <FiBookOpen />
};

// --- your traineesData array here ---
const traineesData = [
  {
    name: "Alice Brown",
    empId: "T201",
    batch: "Python-01",
    email: "alice@company.com",
    phone: "1112223333",
    domain: "Python Development",
    assignedTasks: 5,
    performance: 88,
    tasks: [
      {
        title: "Build REST API with Flask",
        description:
          "Create a complete REST API using Flask framework with authentication",
        status: "completed",
        dueDate: "2024-08-15",
        score: 95
      },
      {
        title: "Data Analysis with Pandas",
        description: "Analyze customer data using Pandas and generate insights",
        status: "in-progress",
        dueDate: "2024-08-20",
        score: null
      },
      {
        title: "Web Scraping Project",
        description: "Build a web scraper to collect data from e-commerce sites",
        status: "pending",
        dueDate: "2024-08-25",
        score: null
      }
    ],
    assessments: [
      {
        title: "Python Fundamentals",
        type: "Technical Assessment",
        date: "2024-08-10",
        score: 92,
        maxScore: 100
      },
      {
        title: "Flask Framework",
        type: "Practical Assessment",
        date: "2024-08-12",
        score: 88,
        maxScore: 100
      }
    ],
    meetingAttendance: {
      totalMeetings: 15,
      attended: 14,
      late: 1,
      absent: 1,
      attendancePercentage: 93
    },
    recentMeetings: [
      { date: "2024-08-15", title: "Flask Advanced Concepts", status: "attended" },
      { date: "2024-08-14", title: "Database Integration", status: "attended" },
      { date: "2024-08-13", title: "API Design Patterns", status: "late" },
      { date: "2024-08-12", title: "Authentication & Security", status: "attended" },
      { date: "2024-08-11", title: "Testing Strategies", status: "absent" }
    ]
  },
  {
    name: "Bob Green",
    empId: "T202",
    batch: "Java-02",
    email: "bob@company.com",
    phone: "4445556666",
    domain: "Java Development",
    assignedBatch: "Java-02",
    assignedTasks: 4,
    performance: 80,
    tasks: [
      {
        title: "Spring Boot Application",
        description: "Build a microservice using Spring Boot with JPA",
        status: "completed",
        dueDate: "2024-08-14",
        score: 82
      },
      {
        title: "Database Design",
        description: "Design and implement relational database schema",
        status: "completed",
        dueDate: "2024-08-16",
        score: 78
      },
      {
        title: "Unit Testing with JUnit",
        description: "Write comprehensive unit tests for the application",
        status: "in-progress",
        dueDate: "2024-08-22",
        score: null
      }
    ],
    assessments: [
      {
        title: "Java Fundamentals",
        type: "Technical Assessment",
        date: "2024-08-08",
        score: 85,
        maxScore: 100
      },
      {
        title: "Spring Framework",
        type: "Practical Assessment",
        date: "2024-08-11",
        score: 75,
        maxScore: 100
      }
    ],
    meetingAttendance: {
      totalMeetings: 12,
      attended: 10,
      late: 1,
      absent: 2,
      attendancePercentage: 83
    },
    recentMeetings: [
      { date: "2024-08-15", title: "Spring Security", status: "attended" },
      { date: "2024-08-14", title: "Microservices Architecture", status: "late" },
      { date: "2024-08-13", title: "JPA Advanced", status: "attended" },
      { date: "2024-08-12", title: "REST API Best Practices", status: "absent" },
      { date: "2024-08-11", title: "Testing with JUnit", status: "attended" }
    ]
  },
  {
    name: "Carol White",
    empId: "T203",
    batch: "React-03",
    email: "carol@company.com",
    phone: "7778889999",
    domain: "Frontend Development",
    assignedBatch: "React-03",
    assignedTasks: 6,
    performance: 94,
    tasks: [
      {
        title: "React Component Library",
        description: "Build reusable component library with TypeScript",
        status: "completed",
        dueDate: "2024-08-13",
        score: 98
      },
      {
        title: "State Management with Redux",
        description: "Implement Redux for complex state management",
        status: "completed",
        dueDate: "2024-08-17",
        score: 92
      },
      {
        title: "Performance Optimization",
        description: "Optimize React app performance using best practices",
        status: "in-progress",
        dueDate: "2024-08-23",
        score: null
      }
    ],
    assessments: [
      {
        title: "React Fundamentals",
        type: "Technical Assessment",
        date: "2024-08-09",
        score: 96,
        maxScore: 100
      },
      {
        title: "TypeScript Advanced",
        type: "Practical Assessment",
        date: "2024-08-13",
        score: 94,
        maxScore: 100
      }
    ],
    meetingAttendance: {
      totalMeetings: 18,
      attended: 17,
      late: 1,
      absent: 0,
      attendancePercentage: 94
    },
    recentMeetings: [
      { date: "2024-08-15", title: "React Performance", status: "attended" },
      { date: "2024-08-14", title: "Advanced Hooks", status: "attended" },
      { date: "2024-08-13", title: "TypeScript Integration", status: "attended" },
      { date: "2024-08-12", title: "Component Design", status: "attended" },
      { date: "2024-08-11", title: "State Management", status: "late" }
    ]
  }
];
function getStatusColor(status) {
  switch (status) {
    case "completed":
      return "bg-green-500";
    case "in-progress":
      return "bg-orange-500";
    case "pending":
      return "bg-gray-500";
    case "attended":
      return "bg-green-500";
    case "late":
      return "bg-orange-500";
    case "absent":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}

function getStatusIcon(status) {
  switch (status) {
    case "completed":
    case "attended":
      return icons.CheckCircle;
    case "in-progress":
    case "late":
      return icons.Clock;
    case "absent":
      return icons.XCircle;
    default:
      return icons.Clock;
  }
}

const TraineeDetails = () => {
  const { empId } = useParams();
  const trainee = traineesData.find((t) => t.empId === empId);
  const [activeTab, setActiveTab] = useState("overview");

  if (!trainee) {
    return (
      <div className="min-h-screen p-6 text-center">
        <h1 className="text-2xl font-bold">Trainee Not Found</h1>
        <Link to="/trainees" className="text-blue-600 underline mt-4 inline-block">
          Back to Trainees
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-5 bg-gray-100">
      {/* Back link */}
      <Link to="/trainees" className="flex items-center text-gray-600 mb-5">
        <span className="mr-2 ">{icons.ArrowLeft}</span> Back to Trainees
      </Link>

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">{trainee.name}</h1>
        <p className="text-gray-600 text-lg">
          {trainee.domain} - {trainee.batch}
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 border rounded-lg text-center bg-white ">
          <div className="text-2xl font-bold text-green-500">
            {trainee.meetingAttendance.attendancePercentage}%
          </div>
          <div className="text-sm text-gray-600">
            {trainee.meetingAttendance.attended}/
            {trainee.meetingAttendance.totalMeetings} meetings
          </div>
          <div className="mt-2 font-semibold">Meeting Attendance</div>
        </div>
        <div className="p-4 border rounded-lg text-center bg-white ">
          <div className="text-2xl font-bold text-orange-500">{trainee.performance}%</div>
          <div className="text-sm text-gray-600">Overall Performance</div>
        </div>
        <div className="p-4 border rounded-lg text-center bg-white ">
          <div className="text-2xl font-bold text-indigo-600">{trainee.assignedTasks}</div>
          <div className="text-sm text-gray-600">Assigned Tasks</div>
        </div>
        <div className="p-4 border rounded-lg text-center bg-white ">
          <div className="text-2xl font-bold text-purple-600">
            {trainee.assessments.length}
          </div>
          <div className="text-sm text-gray-600">Assessments Completed</div>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex bg-gray-200 border-none mb-6">
          {["overview", "tasks", "assessments", "meetings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 capitalize ${
                activeTab === tab
                  ? "bg-white text-black font-semibold border-none rounded-xl m-1"
                  : "text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-6">
            <section className="border p-4 rounded-lg">
              <h2 className="mb-3 font-semibold">Personal Information</h2>
              <p><strong>Employee ID:</strong> {trainee.empId}</p>
              <p><strong>Email:</strong> {trainee.email}</p>
              <p><strong>Phone:</strong> {trainee.phone}</p>
              <p><strong>Domain:</strong> {trainee.domain}</p>
              <p><strong>Batch:</strong> {trainee.batch}</p>
            </section>

            <section className="border p-4 rounded-lg">
              <h2 className="mb-3 font-semibold">Performance Summary</h2>
              <label className="block mb-1">
                Overall Performance: {trainee.performance}%
              </label>
              <div className="w-full bg-gray-200 rounded h-3 mb-4">
                <div
                  className="h-3 bg-orange-500 rounded"
                  style={{ width: `${trainee.performance}%` }}
                />
              </div>
              <label className="block mb-1">
                Meeting Attendance: {trainee.meetingAttendance.attendancePercentage}%
              </label>
              <div className="w-full bg-gray-200 rounded h-3">
                <div
                  className="h-3 bg-green-500 rounded"
                  style={{ width: `${trainee.meetingAttendance.attendancePercentage}%` }}
                />
              </div>
            </section>
          </div>
        )}

        {/* Tasks */}
        {activeTab === "tasks" && (
          <div>
            {trainee.tasks.map((task, i) => (
              <div key={i} className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="m-0">{task.title}</h3>
                    <p className="text-gray-600 m-0">{task.description}</p>
                  </div>
                  <span
                    className={`${getStatusColor(task.status)} text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-semibold capitalize`}
                  >
                    {getStatusIcon(task.status)} {task.status.replace("-", " ")}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <div>Due: {task.dueDate}</div>
                  {task.score != null && (
                    <div className="text-green-500 font-semibold">
                      Score: {task.score}%
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Assessments */}
        {activeTab === "assessments" && (
          <div>
            {trainee.assessments.map((assessment, i) => {
              const percent = Math.round(
                (assessment.score / assessment.maxScore) * 100
              );
              return (
                <div key={i} className="border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="m-0">{assessment.title}</h3>
                      <p className="text-gray-600 m-0">{assessment.type}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-500">
                        {assessment.score}/{assessment.maxScore}
                      </div>
                      <div className="text-xs text-gray-600">{percent}%</div>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-600 gap-1">
                    {icons.Calendar}
                    <span>Completed on {assessment.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Meetings */}
        {activeTab === "meetings" && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center">
              <div>
                <div className="text-2xl font-bold">
                  {trainee.meetingAttendance.totalMeetings}
                </div>
                <div className="text-sm text-gray-600">Total Meetings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500">
                  {trainee.meetingAttendance.attended}
                </div>
                <div className="text-sm text-gray-600">Attended</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-500">
                  {trainee.meetingAttendance.late}
                </div>
                <div className="text-sm text-gray-600">Late</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">
                  {trainee.meetingAttendance.absent}
                </div>
                <div className="text-sm text-gray-600">Absent</div>
              </div>
            </div>

            <div>
              {trainee.recentMeetings.map((meeting, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border p-3 rounded-lg mb-3"
                >
                  <div>
                    <h4 className="m-0">{meeting.title}</h4>
                    <p className="text-gray-600 m-0">{meeting.date}</p>
                  </div>
                  <span
                    className={`${getStatusColor(
                      meeting.status
                    )} text-white px-2 py-1 rounded-full text-xs font-semibold capitalize inline-flex items-center gap-1`}
                  >
                    {getStatusIcon(meeting.status)}
                    <span>{meeting.status}</span>
                  </span>

                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TraineeDetails;
