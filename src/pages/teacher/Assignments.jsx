// frontend/src/pages/teacher/Assignments.jsx
import React, { useState } from "react";
// import ChatWidget from "../../components/ChatWidget";
import {
  useCreateAssignmentMutation,
  useGetMyCoursesQuery,
  useGetCourseAssignmentsQuery,
} from "../../api/teacherApi";
import { useNavigate } from "react-router-dom";
export default function CreateAssignment({ user, courseId }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    courseId: courseId || "", // fallback if prop not provided
  });

  const { data: coursesData } = useGetMyCoursesQuery();
  const [createAssignment, { isLoading, isError }] =
    useCreateAssignmentMutation();

  // 🆕 State for viewing assignments
  const selectedCourse = formData.courseId;
  const {
    data: assignmentsData,
    isLoading: loadingAssignments,
    isError: assignmentsError,
    refetch,
  } = useGetCourseAssignmentsQuery(selectedCourse, {
    skip: !selectedCourse,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.courseId) {
      alert("Please select a course");
      return;
    }

    try {
      await createAssignment(formData).unwrap();
      alert("✅ Assignment created!");
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        courseId: formData.courseId,
      });

      // Refresh assignments after successful creation
      refetch();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create assignment");
    }
  };

  return (
    <div className="space-y-6">
      {/* --- CREATE ASSIGNMENT (unchanged) --- */}
      <form onSubmit={handleSubmit} className="p-4 space-y-4 border rounded-md">
        <h3 className="text-xl font-bold">Create Assignment</h3>

        {!courseId && (
          <select
            value={formData.courseId}
            onChange={(e) =>
              setFormData({ ...formData, courseId: e.target.value })
            }
            className="border p-2 rounded w-full"
          >
            <option value="">-- Select Course --</option>
            {coursesData?.courses?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
        )}

        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="border p-2 rounded w-full"
        />

        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) =>
            setFormData({ ...formData, dueDate: e.target.value })
          }
          className="border p-2 rounded w-full"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Assignment"}
        </button>

        {isError && (
          <p className="text-red-500 mt-2">Failed to create assignment</p>
        )}
      </form>

      {/* --- VIEW ASSIGNMENTS --- */}
      {selectedCourse && (
        <div className="p-4 border rounded-md">
          <h3 className="text-xl font-bold mb-3">View Assignments</h3>

          {loadingAssignments && <p>Loading assignments...</p>}
          {assignmentsError && (
            <p className="text-red-500">Failed to load assignments</p>
          )}

          {assignmentsData?.assignments?.length > 0 ? (
            <ul className="space-y-3">
              {assignmentsData.assignments.map((a) => (
                <li key={a._id} className="border p-3 rounded">
                  <h4 className="font-semibold">{a.title}</h4>
                  <p className="text-gray-600">{a.description}</p>
                  <p className="text-sm text-gray-500">
                    Due: {new Date(a.dueDate).toLocaleDateString()}
                  </p>
                  {/* adding button */}
                  <button
                    onClick={() =>
                      navigate(`/teacher/submissions?assignmentId=${a._id}`)
                    }
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    View Submissions
                  </button>

                  {/* //button added */}
                </li>
              ))}
            </ul>
          ) : (
            !loadingAssignments && (
              <p className="text-gray-500">No assignments found.</p>
            )
          )}
        </div>
      )}
      {/* <ChatWidget user={user} courseId={formData.courseId} /> */}
    </div>
  );
}
//view and grade submissions will be in another component
