import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TraineeCard from "./TraineeCard";
import { Search, Users, GraduationCap, TrendingUp } from "lucide-react";

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
    <div className="min-h-screen p-5 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold">Trainee Management System</h1>
          <p className="text-gray-600">
            Monitor progress, track performance, and manage trainee development
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] mb-5">
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex justify-between font-bold mb-2">
              <span>Total Trainees</span>
              <Users size={18} />
            </div>
            <div className="text-gray-600">
              <div className="text-2xl font-bold">{totalTrainees}</div>
              <small>Across all batches</small>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex justify-between font-bold mb-2">
              <span>Average Attendance</span>
              <GraduationCap size={18} />
            </div>
            <div className="text-gray-600">
              <div className="text-2xl font-bold text-green-600">{avgAttendance}%</div>
              <small>Average meeting attendance</small>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex justify-between font-bold mb-2">
              <span>Average Performance</span>
              <TrendingUp size={18} />
            </div>
            <div className="text-gray-600">
              <div className="text-2xl font-bold text-orange-500">{avgPerformance}%</div>
              <small>Performance score</small>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-5 mb-5">
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute top-2.5 left-3 text-gray-500" size={16} />
              <input
                type="text"
                placeholder="Search trainees by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
            <select
              value={filterDomain}
              onChange={(e) => setFilterDomain(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            >
              <option value="all">All Domains</option>
              <option value="Python">Python Development</option>
              <option value="Java">Java Development</option>
              <option value="Frontend">Frontend Development</option>
            </select>
            {/* Batch Filter */}
            <select
              value={filterBatch}
              onChange={(e) => setFilterBatch(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
            >
              <option value="all">All Batches</option>
              <option value="Python-01">Python-01</option>
              <option value="Java-02">Java-02</option>
              <option value="React-03">React-03</option>
            </select>

            
          </div>
        </div>

        {/* Trainee Cards */}
        <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {filteredTrainees.map((trainee) => (
            <TraineeCard
              key={trainee.empId}
              trainee={trainee}
              onClick={() => navigate(`/trainee/${trainee.empId}`)}
            />
          ))}
        </div>

        {filteredTrainees.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No trainees found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTrainees;



























