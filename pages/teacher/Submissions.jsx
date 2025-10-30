//---------------------------------------------------------------------------
import React, { useState } from "react";
import {
  useViewSubmissionsQuery,
  useGradeSubmissionMutation,
} from "../../api/teacherApi";

export default function Submissions({ assignmentId }) {
  const { data, isLoading, isError, refetch } = useViewSubmissionsQuery(
    assignmentId,
    { skip: !assignmentId }
  );
  const [gradeSubmission] = useGradeSubmissionMutation();
  const [grades, setGrades] = useState({}); // track grades per submission

  if (!assignmentId) return <p>Select an assignment to view submissions</p>;
  if (isLoading) return <p>Loading submissions...</p>;
  if (isError)
    return <p className="text-red-500">Failed to load submissions</p>;

  const handleGrade = async (submissionId) => {
    const gradeValue = grades[submissionId];
    if (!gradeValue) {
      alert("Please enter a grade before saving.");
      return;
    }

    try {
      await gradeSubmission({
        assignmentId,
        submissionId,
        body: { grade: gradeValue },
      }).unwrap();

      alert("✅ Grade updated!");
      refetch(); // refresh list
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update grade");
    }
  };
  console.log(data, "file url");
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Submissions</h2>
      {data?.submissions?.length > 0 ? (
        <ul className="space-y-3">
          {data.submissions.map((sub) => (
            <li
              key={sub._id}
              className="border p-3 rounded flex flex-col gap-3 bg-gray-50"
            >
              <div>
                <p>
                  <strong>{sub.student.name}</strong> –{" "}
                  {new Date(sub.submittedAt).toLocaleString()}
                </p>

                {/* ✅ Show file link with name */}
                {sub.fileUrl ? (
                  <a
                    // href={sub.fileUrl}
                    href={`https://learningstation-kr6z.onrender.com/${sub.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {sub.fileName || "View Submission"}
                  </a>
                ) : (
                  <span className="text-gray-500">No file uploaded</span>
                )}

                {/* Show answer text if provided */}
                {sub.answerText && <p>{sub.answerText}</p>}
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Grade"
                  value={grades[sub._id] ?? sub.grade ?? ""}
                  onChange={(e) =>
                    setGrades({ ...grades, [sub._id]: e.target.value })
                  }
                  className="border rounded p-1"
                />
                <button
                  onClick={() => handleGrade(sub._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Save Grade
                </button>
              </div>

              {sub.grade && (
                <p className="text-green-700">
                  ✅ Already graded: <strong>{sub.grade}</strong>
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No submissions yet</p>
      )}
    </div>
  );
}

//================================================================================
