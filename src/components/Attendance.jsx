import { useState } from "react";
import { useAuth } from "../context/AuthContext";

// Hooks from APIs
import {
  useGetMyCoursesQuery as useStudentCourses,
  useGetAttendanceQuery,
  useGetAttendanceStatsQuery,
} from "../api/studentApi";

import {
  useGetMyCoursesQuery as useTeacherCourses,
  useMarkAttendanceMutation,
  useGetCourseAttendanceQuery,
} from "../api/teacherApi";

import {
  useGetAttendanceReportQuery,
  useGetAllCoursesQuery,
} from "../api/adminApi";

export default function Attendance() {
  const { user } = useAuth();
  const role = user?.role;

  // Common states
  const [courseId, setCourseId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState("present");

  // ---- Student hooks ----
  const { data: studentCourses } = useStudentCourses(undefined, {
    skip: role !== "student",
  });
  const { data: studentAttendance, isLoading: studentLoading } =
    useGetAttendanceQuery(courseId, { skip: role !== "student" || !courseId });
  const { data: studentStats } = useGetAttendanceStatsQuery(courseId, {
    skip: role !== "student" || !courseId,
  });

  // ---- Teacher hooks ----
  const { data: teacherCourses } = useTeacherCourses(undefined, {
    skip: role !== "teacher",
  });
  const {
    data: teacherAttendance,
    isLoading: teacherLoading,
    refetch: refetchTeacherAttendance,
  } = useGetCourseAttendanceQuery(courseId, {
    skip: role !== "teacher" || !courseId,
  });
  const [markAttendance, { isLoading: marking }] = useMarkAttendanceMutation();

  // ---- Admin hooks ----
  const {
    data: report,
    isLoading: adminLoading,
    error: adminError,
    refetch: refetchAdmin,
  } = useGetAttendanceReportQuery(undefined, { skip: role !== "admin" });
  const { data: allCourses } = useGetAllCoursesQuery(undefined, {
    skip: role !== "admin",
  });

  // ---- Handlers ----
  const handleMarkAttendance = async () => {
    if (!courseId || !studentId) {
      alert("Please select course and student");
      return;
    }
    try {
      await markAttendance({ courseId, studentId, status }).unwrap();
      alert("Attendance marked!");
      setStudentId("");
      setStatus("present");
      refetchTeacherAttendance();
    } catch (err) {
      alert("Failed to mark attendance");
    }
  };

  // ---- Render based on role ----
  if (role === "student") {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">My Attendance</h2>
        <select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
          <option value="">Select a course</option>
          {studentCourses?.courses?.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>

        {studentLoading && <p>Loading attendance...</p>}
        {studentAttendance?.attendance?.length ? (
          <ul className="mt-4">
            {studentAttendance.attendance.map((record) => (
              <li key={record._id}>
                {new Date(record.date).toLocaleDateString()} -{" "}
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

        {studentStats && (
          <div className="mt-4 p-3 border rounded">
            <p><b>Total Classes:</b> {studentStats.totalClasses}</p>
            <p><b>Present:</b> {studentStats.presentCount}</p>
            <p><b>Absent:</b> {studentStats.absentCount}</p>
            <p><b>Percentage:</b> {studentStats.percentage}%</p>
          </div>
        )}
      </div>
    );
  }

  if (role === "teacher") {
    const selectedCourse = teacherCourses?.courses?.find((c) => c._id === courseId);
    const students = selectedCourse?.students || [];

    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>
        <select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
          <option value="">-- Select Course --</option>
          {teacherCourses?.courses?.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>

        {courseId && (
          <>
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            >
              <option value="">-- Select Student --</option>
              {students.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>

            <button
              onClick={handleMarkAttendance}
              disabled={marking}
              className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
            >
              {marking ? "Marking..." : "Mark Attendance"}
            </button>
          </>
        )}

        <h3 className="text-xl mt-4 font-semibold">Attendance Records</h3>
        {teacherLoading && <p>Loading attendance...</p>}
        {teacherAttendance?.attendance?.length ? (
          <ul>
            {teacherAttendance.attendance.map((r) => (
              <li key={r._id}>
                {r.student.name} - {r.status} (
                {new Date(r.date).toLocaleDateString()})
              </li>
            ))}
          </ul>
        ) : (
          courseId && <p>No records yet</p>
        )}
      </div>
    );
  }

  if (role === "admin") {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Attendance Report (Admin)</h2>
        <button
          onClick={refetchAdmin}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Refresh
        </button>

        {adminLoading && <p>Loading...</p>}
        {adminError && <p className="text-red-500">Failed to load</p>}

        <table className="border-collapse border border-gray-400 w-full">
          <thead>
            <tr>
              <th className="border p-2">Course</th>
              <th className="border p-2">Students</th>
              <th className="border p-2">Total Classes</th>
              <th className="border p-2">Present</th>
              <th className="border p-2">Absent</th>
            </tr>
          </thead>
          <tbody>
            {report?.map((item) => {
              const course = allCourses?.courses?.find(
                (c) => c._id === item.courseId
              );
              return (
                <tr key={item._id}>
                  <td className="border p-2">{course?.title || "Unknown"}</td>
                  <td className="border p-2">
                    {course?.students?.map((s) => s.name).join(", ") ||
                      "No Students"}
                  </td>
                  <td className="border p-2">{item.totalClasses}</td>
                  <td className="border p-2">{item.presentCount}</td>
                  <td className="border p-2">{item.absentCount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return <p>No access</p>;
}
