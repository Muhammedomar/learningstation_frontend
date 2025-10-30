import React from "react";
import { useGetAllTeachersQuery } from "../../api/adminApi";
import Register from "../auth/Register";
const Teachers = () => {
  const { data, isLoading, isError, error, refetch } = useGetAllTeachersQuery();

  if (isLoading) return <p>Loading teachers...</p>;
  if (isError)
    return <p>Error: {error?.data?.message || "Something went wrong"}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Teachers</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={refetch}
      >
        Refresh List
      </button>
      <ul className="space-y-2">
        {data?.teachers?.length > 0 ? (
          data.teachers.map((teacher) => (
            <li key={teacher._id} className="border p-2 rounded shadow">
              <p>
                <strong>Teacher Name:</strong> {teacher.name}
              </p>
              <p>
                <strong>Teacher Email:</strong> {teacher.email}
              </p>
            </li>
          ))
        ) : (
          <p>No teachers found</p>
        )}
      </ul>
      {/* Add Teacher Form */}
      <Register role={"teacher"} />
    </div>
  );
};

export default Teachers;
