import React from "react";
import {
  useGetAttendanceReportQuery,
  useGetAllCoursesQuery,
} from "../../api/adminApi";

const AttendanceReport = () => {
  const {
    data: report,
    error,
    isLoading,
    refetch,
  } = useGetAttendanceReportQuery();

  const { data: courses } = useGetAllCoursesQuery(); // fetch all courses
  console.log(" Data:", courses);
  if (isLoading || !courses) return <p>Loading attendance report...</p>;
  if (error) return <p className="text-red-500">Failed to load report.</p>;

  // Find the course object by courseId
  const getCourseDetails = (courseId) => {
    return courses?.courses?.find((course) => course._id === courseId);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Attendance Report</h2>

      <button
        onClick={refetch}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Refresh
      </button>

      <table className="border-collapse border border-gray-400 w-full">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">Course</th>
            <th className="border border-gray-400 p-2">Students</th>
            <th className="border border-gray-400 p-2">Total Classes</th>
            <th className="border border-gray-400 p-2">Present</th>
            <th className="border border-gray-400 p-2">Absent</th>
          </tr>
        </thead>
        <tbody>
          {report?.map((item) => {
            const course = getCourseDetails(item.courseId);

            return (
              <tr key={item._id}>
                {/* ✅ Show course title instead of ID */}
                <td className="border border-gray-400 p-2">
                  {course ? course.title : "Unknown Course"}
                </td>

                {/* ✅ Show student names (if available) */}
                <td className="border border-gray-400 p-2">
                  {course?.students?.length
                    ? course.students.map((s) => s.name).join(", ")
                    : "No Students"}
                </td>

                <td className="border border-gray-400 p-2">
                  {item.totalClasses}
                </td>
                <td className="border border-gray-400 p-2">
                  {item.presentCount}
                </td>
                <td className="border border-gray-400 p-2">
                  {item.absentCount}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceReport;
