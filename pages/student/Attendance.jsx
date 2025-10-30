// src/pages/student/Attendance.jsx
import { useState } from "react";
import {
  useGetMyCoursesQuery,
  useGetAttendanceQuery,
  useGetAttendanceStatsQuery,
} from "../../api/studentApi";

export default function Attendance() {
  const [courseId, setCourseId] = useState(""); // select course manually for now
  const { data: coursesData } = useGetMyCoursesQuery();
  const { data: attendanceData, isLoading } = useGetAttendanceQuery(courseId, {
    skip: !courseId,
  });

  const { data: statsData } = useGetAttendanceStatsQuery(courseId, {
    skip: !courseId,
  });

  return (
    <div>
      <h2>Attendance</h2>

      {/* Temporary input to select course */}
      <select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
        <option value="">Select a course</option>
        {coursesData?.courses?.map((c) => (
          <option key={c._id} value={c._id}>
            {c.title}
          </option>
        ))}
      </select>

      {isLoading && <p>Loading attendance...</p>}

      {attendanceData?.attendance?.length > 0 ? (
        <ul className="mt-4">
          {attendanceData.attendance.map((record) => (
            <li key={record._id}>
              {new Date(record.date).toLocaleDateString()} –{" "}
              <span
                style={{
                  color: record.status === "present" ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {record.status.toUpperCase()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        courseId && <p>No attendance records found</p>
      )}

      {/* Stats Section */}
      {statsData && (
        <div className="mt-4 p-3 border rounded">
          <p>
            <strong>Total Classes:</strong> {statsData.totalClasses}
          </p>
          <p>
            <strong>Present:</strong> {statsData.presentCount}
          </p>
          <p>
            <strong>Absent:</strong> {statsData.absentCount}
          </p>
          <p>
            <strong>Percentage:</strong> {statsData.percentage}
          </p>
        </div>
      )}
    </div>
  );
}
