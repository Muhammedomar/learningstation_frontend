// src/pages/student/Assignments.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCourseAssignmentsQuery } from "../../api/studentApi";
export default function Assignments() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCourseAssignmentsQuery(courseId);
  console.log("data", data);
  if (isLoading) return <p>Loading assignments...</p>;
  if (isError)
    return <p className="text-red-500">Failed to load assignments</p>;
  const assignments = data?.assignments || []; // ✅ Safely extract array
  return (
    <div>
      <h2>Assignments tab</h2>
      <ul>
        {assignments?.map((assignment) => (
          <li key={assignment._id}>
            <h3>{assignment.title}</h3>
            <p>{assignment.description}</p>
            <button
              onClick={() =>
                navigate(
                  `/student/assignments/${courseId}/submit/${assignment._id}`
                )
              }
            >
              Submit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
