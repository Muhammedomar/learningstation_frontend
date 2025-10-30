// src/pages/student/SubmitAssignment.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSubmitAssignmentMutation } from "../../api/studentApi";

export default function SubmitAssignment() {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const [answerText, setAnswerText] = useState("");
  const [file, setFile] = useState(null);
  const [submitAssignment, { isLoading }] = useSubmitAssignmentMutation();
  console.log("assignmentId", assignmentId);
  console.log("file", file);
  console.log("answerText", answerText);
  console.log(submitAssignment, " submitAssignment");
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitAssignment({ assignmentId, answerText, file }).unwrap();
      alert("Submitted successfully!");
      navigate(-1);
    } catch (err) {
      alert("Failed to submit: " + (err?.data?.message || "Unknown error"));
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Submit Assignment</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          placeholder="Write your answer here"
          rows={6}
          style={{ width: "100%", marginBottom: "1rem" }}
          required
        />
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          style={{ marginBottom: "1rem" }}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
