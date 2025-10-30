// src/pages/student.js (or wherever your file is)
import React from "react";
import { useGetAllStudentsQuery } from "../../api/adminApi"; // adjust path if needed
import Register from "../auth/Register";
const Student = () => {
  const { data, isLoading, isError, error, refetch } = useGetAllStudentsQuery();

  if (isLoading) return <p>Loading students...</p>;
  if (isError)
    return <p>Error: {error?.data?.message || "Something went wrong"}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Students</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={refetch}
      >
        Refresh List
      </button>

      <ul className="space-y-2">
        {data?.students?.length > 0 ? (
          data.students.map((student) => (
            <li key={student._id} className="border p-2 rounded shadow">
              <p>
                <strong>Student Name:</strong> {student.name}
              </p>
              <p>
                <strong>Student Email:</strong> {student.email}
              </p>
            </li>
          ))
        ) : (
          <p>No students found</p>
        )}
      </ul>
      {/* Add Student Form */}
      <Register role={"student"} />
    </div>
  );
};

export default Student;
