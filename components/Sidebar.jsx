// src/components/Sidebar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();
  console.log("Sidebar render with user:", user);
  if (!user) return null;

  return (
    <div style={{ padding: 20, background: "#f5f5f5", minHeight: "100vh" }}>
      <h3>{user.role.toUpperCase()} Panel</h3>
      <ul>
        {user.role === "student" && (
          <>
            <li>
              <Link to="/student">Dashboard</Link>
            </li>
            <li>
              <Link to="/student/courses">My Courses</Link>
            </li>
            <li>
              <Link to="/student/assignments">Assignments</Link>
            </li>
            <li>
              <Link to="/student/attendance">Attendance</Link>
            </li>
          </>
        )}
        {user.role === "teacher" && (
          <>
            <li>
              <Link to="/teacher">Dashboard</Link>
            </li>
            <li>
              <Link to="/teacher/my-courses">My Courses</Link>
            </li>
            <li>
              <Link to="/teacher/assignments">Assignments</Link>
            </li>
            <li>
              <Link to="/teacher/attendance">Attendance</Link>
            </li>
            <li>
              <Link to="/teacher/submissions">Submissions</Link>
            </li>
            <li>
              <Link to="/teacher/manage-meet-link">Manage Meet Link</Link>
            </li>
          </>
        )}
        {user.role === "admin" && (
          <>
            <li>
              <Link to="/admin">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/students">Students</Link>
            </li>
            <li>
              <Link to="/admin/teachers">Teachers</Link>
            </li>
            <li>
              <Link to="/admin/courses">Courses</Link>
            </li>
            <li>
              <Link to="/admin/attendance-report">Attendance Report</Link>
            </li>
            {/* <li>
              <Link to="/admin/assignments-report">Assignments Report</Link>
            </li> */}
          </>
        )}
      </ul>

      <button onClick={logout} style={{ marginTop: 20 }}>
        Logout
      </button>
    </div>
  );
}

// import { Link } from "react-router-dom";

// export default function Sidebar({ links = [] }) {
//   return (
//     <div className="sidebar">
//       {links.map((l) => (
//         <Link key={l.to} to={l.to} className="nav-link">
//           <strong>{l.label}</strong>
//         </Link>
//       ))}
//     </div>
//   );
// }
