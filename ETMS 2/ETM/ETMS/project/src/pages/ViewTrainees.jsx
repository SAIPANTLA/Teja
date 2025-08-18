import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TraineeCard from "./TraineeCard"; // Local component
import { Search, Users, GraduationCap, TrendingUp } from "lucide-react";

// Dummy trainee data
const traineesData = [
  {
    name: "Alice Brown",
    empId: "T201",
    batch: "Python-01",
    email: "alice@company.com",
    phone: "1112223333",
    domain: "Python Development",
    assignedBatch: "Python-01",
    assignedTasks: 5,
    performance: 88,
    meetingAttendance: {
      totalMeetings: 15,
      attended: 14,
      attendancePercentage: 93
    },
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
    meetingAttendance: {
      totalMeetings: 12,
      attended: 10,
      attendancePercentage: 83
    },
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
    meetingAttendance: {
      totalMeetings: 18,
      attended: 17,
      attendancePercentage: 94
    },
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
  }
];

const ViewTrainees = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBatch, setFilterBatch] = useState("all");
  const [filterDomain, setFilterDomain] = useState("all");

  const filteredTrainees = traineesData.filter((trainee) => {
    const matchesSearch =
      trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainee.empId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = filterBatch === "all" || trainee.batch === filterBatch;
    const matchesDomain = filterDomain === "all" || trainee.domain.includes(filterDomain);

    return matchesSearch && matchesBatch && matchesDomain;
  });

  const totalTrainees = traineesData.length;
  const avgAttendance = Math.round(
    traineesData.reduce((sum, t) => sum + t.meetingAttendance.attendancePercentage, 0) /
      totalTrainees
  );
  const avgPerformance = Math.round(
    traineesData.reduce((sum, t) => sum + t.performance, 0) / totalTrainees
  );

  return (
    <div style={{ minHeight: "100vh", padding: "20px", background: "#f8f9fa" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>Trainee Management System</h1>
          <p>Monitor progress, track performance, and manage trainee development</p>
        </div>

        {/* Statistics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <span>Total Trainees</span>
              <Users size={18} />
            </div>
            <div style={cardBodyStyle}>
              <div style={bigNumberStyle}>{totalTrainees}</div>
              <small>Across all batches</small>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <span>Average Attendance</span>
              <GraduationCap size={18} />
            </div>
            <div style={cardBodyStyle}>
              <div style={{ ...bigNumberStyle, color: "green" }}>{avgAttendance}%</div>
              <small>Average meeting attendance</small>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <span>Average Performance</span>
              <TrendingUp size={18} />
            </div>
            <div style={cardBodyStyle}>
              <div style={{ ...bigNumberStyle, color: "orange" }}>{avgPerformance}%</div>
              <small>Performance score</small>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ ...cardStyle, marginBottom: "20px", padding: "20px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {/* Search */}
            <div style={{ flex: 1, position: "relative" }}>
              <Search style={{ position: "absolute", top: "10px", left: "10px" }} size={16} />
              <input
                type="text"
                placeholder="Search trainees by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 8px 8px 30px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              />
            </div>

            {/* Batch Filter */}
            <select
              value={filterBatch}
              onChange={(e) => setFilterBatch(e.target.value)}
              style={selectStyle}
            >
              <option value="all">All Batches</option>
              <option value="Python-01">Python-01</option>
              <option value="Java-02">Java-02</option>
              <option value="React-03">React-03</option>
            </select>

            {/* Domain Filter */}
            <select
              value={filterDomain}
              onChange={(e) => setFilterDomain(e.target.value)}
              style={selectStyle}
            >
              <option value="all">All Domains</option>
              <option value="Python">Python Development</option>
              <option value="Java">Java Development</option>
              <option value="Frontend">Frontend Development</option>
            </select>
          </div>
        </div>

        {/* Trainee Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredTrainees.map((trainee) => (
            <TraineeCard
              key={trainee.empId}
              trainee={trainee}
              onClick={() => navigate(`/trainee/${trainee.empId}`)}
            />
          ))}
        </div>

        {filteredTrainees.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "#777" }}>
            No trainees found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
};

// Inline styles
const cardStyle = {
  background: "#fff",
  borderRadius: "8px",
  padding: "15px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

const cardHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontWeight: "bold",
  marginBottom: "10px",
};

const cardBodyStyle = {
  fontSize: "14px",
  color: "#555",
};

const bigNumberStyle = {
  fontSize: "24px",
  fontWeight: "bold",
};

const selectStyle = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

export default ViewTrainees;
