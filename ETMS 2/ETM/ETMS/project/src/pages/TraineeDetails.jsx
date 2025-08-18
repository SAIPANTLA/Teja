import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

// Replace icons with simple emojis or text placeholders
const icons = {
  ArrowLeft: "←",
  Calendar: "📅",
  CheckCircle: "✔️",
  Clock: "⏰",
  XCircle: "❌",
  Trophy: "🏆",
  BookOpen: "📖"
};

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
        description: "Create a complete REST API using Flask framework with authentication",
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
  // ... other trainees (Bob, Carol) same as your data
];

function getStatusColor(status) {
  switch (status) {
    case "completed": return "#4caf50"; // green
    case "in-progress": return "#ff9800"; // orange
    case "pending": return "#9e9e9e"; // grey
    case "attended": return "#4caf50"; // green
    case "late": return "#ff9800"; // orange
    case "absent": return "#f44336"; // red
    default: return "#9e9e9e";
  }
}

function getStatusIcon(status) {
  switch (status) {
    case "completed":
    case "attended": return icons.CheckCircle;
    case "in-progress":
    case "late": return icons.Clock;
    case "absent": return icons.XCircle;
    default: return icons.Clock;
  }
}

const TraineeDetails = () => {
  const { empId } = useParams();
  const trainee = traineesData.find(t => t.empId === empId);

  const [activeTab, setActiveTab] = useState("overview");

  if (!trainee) {
    return (
      <div style={{ minHeight: "100vh", padding: 24, textAlign: "center" }}>
        <h1 style={{ fontSize: 24, fontWeight: "bold" }}>Trainee Not Found</h1>
        <Link to="/trainees" style={{ color: "blue", textDecoration: "underline", marginTop: 16, display: "inline-block" }}>
          Back to Trainees
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: 24, maxWidth: 960, margin: "auto" }}>
      {/* Back link */}
      <Link to="/trainees" style={{ textDecoration: "none", color: "#666", display: "inline-flex", alignItems: "center", marginBottom: 20 }}>
        <span style={{ marginRight: 8 }}>{icons.ArrowLeft}</span> Back to Trainees
      </Link>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 32, fontWeight: "bold" }}>{trainee.name}</h1>
        <p style={{ color: "#555", fontSize: 18 }}>{trainee.domain} - {trainee.batch}</p>
      </div>

      {/* Quick stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 16, marginBottom: 32 }}>
        <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8, textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#4caf50" }}>{trainee.meetingAttendance.attendancePercentage}%</div>
          <div style={{ fontSize: 14, color: "#666" }}>
            {trainee.meetingAttendance.attended}/{trainee.meetingAttendance.totalMeetings} meetings
          </div>
          <div style={{ marginTop: 8, fontWeight: "600" }}>Meeting Attendance</div>
        </div>
        <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8, textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#ff9800" }}>{trainee.performance}%</div>
          <div style={{ fontSize: 14, color: "#666" }}>Overall Performance</div>
        </div>
        <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8, textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#3f51b5" }}>{trainee.assignedTasks}</div>
          <div style={{ fontSize: 14, color: "#666" }}>Assigned Tasks</div>
        </div>
        <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8, textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#9c27b0" }}>{trainee.assessments.length}</div>
          <div style={{ fontSize: 14, color: "#666" }}>Assessments Completed</div>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div style={{ display: "flex", borderBottom: "1px solid #ccc", marginBottom: 24 }}>
          {["overview", "tasks", "assessments", "meetings"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: "12px 0",
                cursor: "pointer",
                background: activeTab === tab ? "#3f51b5" : "transparent",
                color: activeTab === tab ? "white" : "#333",
                border: "none",
                borderBottom: activeTab === tab ? "3px solid #303f9f" : "3px solid transparent",
                fontWeight: activeTab === tab ? "600" : "normal"
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {/* Personal Info */}
            <section style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
              <h2 style={{ marginBottom: 12 }}>Personal Information</h2>
              <p><strong>Employee ID:</strong> {trainee.empId}</p>
              <p><strong>Email:</strong> {trainee.email}</p>
              <p><strong>Phone:</strong> {trainee.phone}</p>
              <p><strong>Domain:</strong> {trainee.domain}</p>
              <p><strong>Batch:</strong> {trainee.batch}</p>
            </section>

            {/* Performance Summary */}
            <section style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
              <h2 style={{ marginBottom: 12 }}>Performance Summary</h2>
              <div>
                <label style={{ display: "block", marginBottom: 4 }}>Overall Performance: {trainee.performance}%</label>
                <div style={{ background: "#eee", borderRadius: 4, height: 12, marginBottom: 16 }}>
                  <div
                    style={{
                      width: `${trainee.performance}%`,
                      height: "100%",
                      backgroundColor: "#ff9800",
                      borderRadius: 4,
                      transition: "width 0.3s ease"
                    }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 4 }}>Meeting Attendance: {trainee.meetingAttendance.attendancePercentage}%</label>
                <div style={{ background: "#eee", borderRadius: 4, height: 12 }}>
                  <div
                    style={{
                      width: `${trainee.meetingAttendance.attendancePercentage}%`,
                      height: "100%",
                      backgroundColor: "#4caf50",
                      borderRadius: 4,
                      transition: "width 0.3s ease"
                    }}
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === "tasks" && (
          <div>
            {trainee.tasks.map((task, i) => (
              <div key={i} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16, marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div>
                    <h3 style={{ margin: 0 }}>{task.title}</h3>
                    <p style={{ margin: 0, color: "#666" }}>{task.description}</p>
                  </div>
                  <span
                    style={{
                      backgroundColor: getStatusColor(task.status),
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: 12,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 12,
                      textTransform: "capitalize",
                      fontWeight: "600"
                    }}
                  >
                    {getStatusIcon(task.status)} {task.status.replace("-", " ")}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#666" }}>
                  <div>Due: {task.dueDate}</div>
                  {task.score != null && <div style={{ color: "#4caf50", fontWeight: "600" }}>Score: {task.score}%</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "assessments" && (
          <div>
            {trainee.assessments.map((assessment, i) => {
              const percent = Math.round((assessment.score / assessment.maxScore) * 100);
              return (
                <div key={i} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div>
                      <h3 style={{ margin: 0 }}>{assessment.title}</h3>
                      <p style={{ margin: 0, color: "#666" }}>{assessment.type}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 18, fontWeight: "bold", color: "#4caf50" }}>
                        {assessment.score}/{assessment.maxScore}
                      </div>
                      <div style={{ fontSize: 12, color: "#666" }}>{percent}%</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", fontSize: 12, color: "#666", gap: 4 }}>
                    <span>{icons.Calendar}</span>
                    <span>Completed on {assessment.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "meetings" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 16, marginBottom: 32, textAlign: "center" }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: "bold" }}>{trainee.meetingAttendance.totalMeetings}</div>
                <div style={{ fontSize: 14, color: "#666" }}>Total Meetings</div>
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: "bold", color: "#4caf50" }}>{trainee.meetingAttendance.attended}</div>
                <div style={{ fontSize: 14, color: "#666" }}>Attended</div>
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: "bold", color: "#ff9800" }}>{trainee.meetingAttendance.late}</div>
                <div style={{ fontSize: 14, color: "#666" }}>Late</div>
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: "bold", color: "#f44336" }}>{trainee.meetingAttendance.absent}</div>
                <div style={{ fontSize: 14, color: "#666" }}>Absent</div>
              </div>
            </div>

            <div>
              {trainee.recentMeetings.map((meeting, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #ddd", padding: 12, borderRadius: 8, marginBottom: 12 }}>
                  <div>
                    <h4 style={{ margin: 0 }}>{meeting.title}</h4>
                    <p style={{ margin: 0, color: "#666" }}>{meeting.date}</p>
                  </div>
                  <span
                    style={{
                      backgroundColor: getStatusColor(meeting.status),
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: 12,
                      fontSize: 12,
                      textTransform: "capitalize",
                      fontWeight: "600"
                    }}
                  >
                    {getStatusIcon(meeting.status)} {meeting.status}
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
