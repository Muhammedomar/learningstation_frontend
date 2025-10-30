// frontend/src/pages/teacher/Attendance.jsx
import { useState } from "react";
import {
  useGetMyCoursesQuery,
  useMarkAttendanceMutation,
  useGetCourseAttendanceQuery,
} from "../../api/teacherApi";

export default function Attendance() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [status, setStatus] = useState("present");

  // Fetch teacher's courses (students are populated)
  const { data: coursesData, isLoading: coursesLoading } =
    useGetMyCoursesQuery();

  // Fetch attendance for selected course
  const {
    data: attendanceData,
    isLoading: attendanceLoading,
    isError: attendanceError,
    refetch: refetchAttendance,
  } = useGetCourseAttendanceQuery(selectedCourse, { skip: !selectedCourse });

  // Mutation to mark attendance
  const [markAttendance, { isLoading: marking }] = useMarkAttendanceMutation();

  // Handle marking attendance
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourse || !selectedStudent) {
      alert("Please select course and student");
      return;
    }

    try {
      await markAttendance({
        courseId: selectedCourse,
        studentId: selectedStudent,
        status,
      }).unwrap();

      alert("Attendance marked successfully!");
      setSelectedStudent("");
      setStatus("present");
      refetchAttendance();
    } catch (err) {
      console.error(err);
      alert("Failed to mark attendance");
    }
  };

  // Get students of the selected course
  const selectedCourseData = coursesData?.courses?.find(
    (c) => c._id === selectedCourse
  );
  const students = selectedCourseData?.students || [];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Attendance</h2>

      {/* Select Course */}
      <div className="mb-4">
        <label className="block mb-1">Select Course:</label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">-- Select Course --</option>
          {coursesData?.courses?.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* Select Student */}
      {selectedCourse && (
        <div className="mb-4">
          <label className="block mb-1">Select Student:</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">-- Select Student --</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} ({s.email})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Status */}
      {selectedCourse && (
        <div className="mb-4">
          <label className="block mb-1">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
        </div>
      )}

      {/* Submit Button */}
      {selectedCourse && (
        <button
          onClick={handleSubmit}
          disabled={marking}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
        >
          {marking ? "Marking..." : "Mark Attendance"}
        </button>
      )}

      {/* Attendance Records */}
      <h3 className="text-xl font-semibold mb-2">Attendance Records</h3>
      {attendanceLoading && <p>Loading attendance...</p>}
      {attendanceError && (
        <p className="text-red-500">Failed to load attendance</p>
      )}
      {attendanceData?.attendance?.length > 0 ? (
        <ul className="space-y-2">
          {attendanceData.attendance.map((record) => (
            <li key={record._id}>
              {record.student.name} - {record.status} (
              {new Date(record.date).toLocaleDateString()})
            </li>
          ))}
        </ul>
      ) : (
        <p>No attendance records yet.</p>
      )}
    </div>
  );
}
