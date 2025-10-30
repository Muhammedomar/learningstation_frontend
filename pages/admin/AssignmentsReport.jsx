import React, { useState } from "react";
import { useGetAllAssignmentsReportQuery } from "../../api/adminApi";

const AttendanceReport = () => {
  const { data, error, isLoading, refetch } = useGetAllAssignmentsReportQuery();
  const [expanded, setExpanded] = useState(null);

  if (isLoading) return <p>Loading assignments...</p>;
  if (error) return <p className="text-red-500">Failed to load report.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📚 All Assignments Report</h2>
      <button
        onClick={refetch}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Refresh
      </button>

      {data?.assignments?.length === 0 && <p>No assignments found.</p>}

      <div className="space-y-4">
        {data?.assignments?.map((assignment) => (
          <div key={assignment._id} className="border p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{assignment.title}</h3>
                <p className="text-gray-600">
                  Course: {assignment.course?.title || "Unknown"}
                </p>
                <p className="text-gray-600">
                  Teacher: {assignment.teacher?.name || "Unknown"}
                </p>
                <p className="text-gray-600">
                  Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() =>
                  setExpanded(
                    expanded === assignment._id ? null : assignment._id
                  )
                }
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                {expanded === assignment._id
                  ? "Hide Submissions"
                  : "View Submissions"}
              </button>
            </div>

            {expanded === assignment._id && (
              <div className="mt-4">
                {assignment.submissions?.length > 0 ? (
                  <table className="border-collapse border border-gray-400 w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2">Student</th>
                        <th className="border p-2">Submitted At</th>
                        <th className="border p-2">File</th>
                        <th className="border p-2">Answer</th>
                        <th className="border p-2">Grade</th>
                        <th className="border p-2">Feedback</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignment.submissions.map((sub) => (
                        <tr key={sub._id}>
                          <td className="border p-2">
                            {sub.student?.name || "Unknown"}
                          </td>
                          <td className="border p-2">
                            {new Date(sub.submittedAt).toLocaleString()}
                          </td>
                          <td className="border p-2">
                            {sub.fileUrl ? (
                              <a
                                href={sub.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                              >
                                View File
                              </a>
                            ) : (
                              "No File"
                            )}
                          </td>
                          <td className="border p-2">
                            {sub.answerText || "N/A"}
                          </td>
                          <td className="border p-2">
                            {sub.grade || "Pending"}
                          </td>
                          <td className="border p-2">
                            {sub.feedback || "No Feedback"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500">No submissions yet.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceReport;
