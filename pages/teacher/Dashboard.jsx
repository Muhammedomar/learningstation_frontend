import { Routes, Route, useNavigate } from "react-router-dom";
import MyCourses from "./MyCourses";
import Assignments from "./Assignments";
import Submissions from "./Submissions";
import ManageMeetLink from "./ManageMeetLink";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Attendance from "./Attendance";
import { useLocation } from "react-router-dom";
import ChatWidget from "../../components/ChatWidget";
export default function TeacherDashboard() {
  const links = [
    { to: "my-courses", label: "My Courses" },
    { to: "assignments", label: "Assignments" },
    { to: "submissions", label: "Submissions" },
    { to: "attendance", label: "Attendance" },
    { to: "manage-meet-link", label: "Manage Meet Link" },
  ];
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();
  const onLogout = () => {
    logout();
    nav("/login");
  };
  // adding params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const assignmentId = queryParams.get("assignmentId");

  return (
    <div className="container">
      <Navbar title={`Teacher • ${user?.name || ""}`} onLogout={onLogout} />
      <div className="layout">
        <Sidebar links={links} />
        <div className="content">
          <Routes>
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="assignments" element={<Assignments user={user} />} />
            <Route
              path="submissions"
              element={<Submissions assignmentId={assignmentId} />}
            />
            <Route path="attendance" element={<Attendance />} />
            <Route path="*" element={<h2>Welcome, Teacher</h2>} />
            <Route path="manage-meet-link" element={<ManageMeetLink />} />
          </Routes>
        </div>
        <ChatWidget user={user} />
      </div>
    </div>
  );
}
