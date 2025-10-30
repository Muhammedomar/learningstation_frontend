import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllAssignmentsReportQuery, // Admin
} from "../api/adminApi";
import {
  useCreateAssignmentMutation,
  useGetMyCoursesQuery,
  useGetCourseAssignmentsQuery as useTeacherAssignmentsQuery,
} from "../api/teacherApi";
import {
  useGetCourseAssignmentsQuery as useStudentAssignmentsQuery,
} from "../api/studentApi";

export default function Assignments({ user }) {
  const navigate = useNavigate();
  const { courseId: routeCourseId } = useParams();
  console.log("routeCourseId:", routeCourseId);
  // --- State ---
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    courseId: routeCourseId || "",
  });
  const [expanded, setExpanded] = useState(null);

  // --- Queries ---
  const { data: adminData, isLoading: adminLoading, error: adminError, refetch } =
    useGetAllAssignmentsReportQuery(undefined, { skip: user.role !== "admin" });

  const { data: teacherCourses } = useGetMyCoursesQuery(undefined, {
    skip: user.role !== "teacher",
  });
  const [createAssignment, { isLoading: creating }] =
    useCreateAssignmentMutation();

  const {
    data: teacherAssignments,
    isLoading: teacherLoading,
    isError: teacherError,
    refetch: refetchTeacherAssignments,
  } = useTeacherAssignmentsQuery(formData.courseId, {
    skip: user.role !== "teacher" || !formData.courseId,
  });

  const {
    data: studentAssignments,
    isLoading: studentLoading,
    isError: studentError,
  } = useStudentAssignmentsQuery(routeCourseId, {
    skip: user.role !== "student" || !routeCourseId,
  });

    console.log("student assignments:", studentAssignments, "studentError:", studentError, "studentLoading:", studentLoading);

  // --- Handlers ---
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.courseId) return alert("Select a course!");
    try {
      await createAssignment(formData).unwrap();
      alert("✅ Assignment created!");
      setFormData({ ...formData, title: "", description: "", dueDate: "" });
      refetchTeacherAssignments();
    } catch {
      alert("❌ Failed to create");
    }
  };

  // --- Render ---
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Assignments</h2>

      {/* --- ADMIN VIEW --- */}
      {user.role === "admin" && (
        <>
          {adminLoading && <p>Loading assignments...</p>}
          {adminError && <p className="text-red-500">Failed to load report.</p>}

          <button
            onClick={refetch}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Refresh
          </button>

          {adminData?.assignments?.map((a) => (
            <div key={a._id} className="border p-4 rounded-lg mb-3">
              <h3 className="font-bold">{a.title}</h3>
              <p>Course: {a.course?.title}</p>
              <p>Teacher: {a.teacher?.name}</p>
              <p>Due: {new Date(a.dueDate).toLocaleDateString()}</p>
              <button
                onClick={() => setExpanded(expanded === a._id ? null : a._id)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                {expanded === a._id ? "Hide Submissions" : "View Submissions"}
              </button>

              {expanded === a._id && (
                <div className="mt-3">
                  {a.submissions?.length ? (
                    <ul>
                      {a.submissions.map((s) => (
                        <li key={s._id}>
                          {s.student?.name} – {s.grade || "Pending"} –{" "}
                          {s.feedback || "No feedback"}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No submissions</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {/* --- TEACHER VIEW --- */}
      {user.role === "teacher" && (
        <div className="space-y-6">
          <form onSubmit={handleCreate} className="border p-4 rounded">
            <h3 className="text-xl font-bold">Create Assignment</h3>
            <select
              value={formData.courseId}
              onChange={(e) =>
                setFormData({ ...formData, courseId: e.target.value })
              }
              className="border p-2 rounded w-full"
            >
              <option value="">-- Select Course --</option>
              {teacherCourses?.courses?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.title}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
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
              disabled={creating}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {creating ? "Creating..." : "Create"}
            </button>
          </form>

          {/* Teacher’s assignments */}
          {teacherLoading && <p>Loading assignments...</p>}
          {teacherError && <p className="text-red-500">Error loading</p>}
          {teacherAssignments?.assignments?.map((a) => (
            <div key={a._id} className="border p-3 rounded">
              <h4 className="font-semibold">{a.title}</h4>
              <button
                onClick={() =>
                  navigate(`/teacher/submissions?assignmentId=${a._id}`)
                }
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                View Submissions
              </button>
            </div>
          ))}
        </div>
      )}

      {/* --- STUDENT VIEW --- */}
      {user.role === "student" && (
        <>
          {studentLoading && <p>Loading...</p>}
          {studentError && <p className="text-red-500">Error loading</p>}
          {studentAssignments?.assignments?.map((a) => (
            <div key={a._id} className="border p-3 rounded">
              <h4 className="font-semibold">{a.title}</h4>
              <p>{a.description}</p>
              <button
                onClick={() =>
                  navigate(`/student/assignments/${routeCourseId}/submit/${a._id}`)
                }
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Submit
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
