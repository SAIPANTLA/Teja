import React from "react";
import { GraduationCap, Target, TrendingUp } from "lucide-react";

const TraineeCard = ({ trainee, onClick }) => {
  return (
    <div
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:bg-gray-100 rounded-lg border"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold">
            {trainee.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>

          {/* Details */}
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{trainee.name}</h3>
              <p className="text-sm text-gray-500">ID: {trainee.empId}</p>
            </div>

            {/* Batch & Domain */}
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-blue-500" />
              <span className="px-2 py-0.5 border rounded text-xs">
                {trainee.batch}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">{trainee.domain}</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
              {/* Tasks */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Target className="h-3 w-3 text-blue-500" />
                  <span className="text-xs font-medium">
                    {trainee.assignedTasks}
                  </span>
                </div>
                <p className="text-xs text-gray-500">Tasks</p>
              </div>

              {/* Meetings Attendance */}
              <div className="text-center">
                <div
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    trainee.meetingAttendance.attendancePercentage >= 90
                      ? "bg-green-100 text-green-600"
                      : trainee.meetingAttendance.attendancePercentage >= 75
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {trainee.meetingAttendance.attendancePercentage}%
                </div>
                <p className="text-xs text-gray-500">Meetings</p>
              </div>

              {/* Performance Score */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <div
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      trainee.performance >= 90
                        ? "bg-green-100 text-green-600"
                        : trainee.performance >= 75
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {trainee.performance}
                  </div>
                </div>
                <p className="text-xs text-gray-500">Score</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraineeCard;
