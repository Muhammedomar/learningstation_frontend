import { Routes, Route } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Courses from "./Courses";
import Assignments from "./Assignments";
import Attendance from "./Attendance";
import SubmitAssignment from "./SubmitAssignment";
import ChatWidget from "../../components/ChatWidget";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function StudentDashboard() {
  const { user, logout } = useContext(AuthContext);
  console.log("StudentDashboard rendered");
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: 20 }}>
        <Routes>
          <Route index element={<h2>Welcome Student</h2>} />
          <Route path="courses" element={<Courses user={user} />} />
          <Route path="assignments/:courseId" element={<Assignments />} />
          <Route
            path="assignments/:courseId/submit/:assignmentId"
            element={<SubmitAssignment />}
          />

          <Route path="attendance" element={<Attendance />} />
        </Routes>
      </div>
      {/* Chat widget at bottom-right */}
      <ChatWidget
        user={user} // Ahmed
        receiver={{ id: "68baa06f29eb9c64e74fce7e", name: "Admin User" }} // Admin
      />
    </div>
  );
}
