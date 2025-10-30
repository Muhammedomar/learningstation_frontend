// import { Routes, Route } from "react-router-dom";
// import Students from "./Students";
// import Teachers from "./Teachers";
// import Courses from "./Courses";
// import AssignmentsReport from "./AssignmentsReport";
// import AttendanceReport from "./AttendanceReport";
// import Sidebar from "../../components/Sidebar";
// import Navbar from "../../components/Navbar";
// import { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import "./AdminDashboard.css";
// import Clock from "../../components/Clock";
// import ChatWidget from "../../components/ChatWidget";
// export default function AdminDashboard() {
//   const links = [
//     { to: "students", label: "Students" },
//     { to: "teachers", label: "Teachers" },
//     { to: "courses", label: "Courses" },
//     { to: "assignments-report", label: "Assignments Report" },
//     { to: "attendance-report", label: "Attendance Report" },
//   ];
//   const { user, logout } = useContext(AuthContext);
//   const nav = useNavigate();
//   const [time, setTime] = useState(new Date());
//   // Update time every second
//   // useEffect(() => {
//   //   const timer = setInterval(() => setTime(new Date()), 1000);
//   //   return () => clearInterval(timer); // cleanup on unmount
//   // }, []);
//   const onLogout = () => {
//     logout();
//     nav("/login");
//   };

//   return (
//     <div className="container">
//       {/* <Navbar title={`Admin • ${user?.name || ""}`} onLogout={onLogout} />
//       <div className="layout">
//         <Sidebar links={links} />
//         <div className="content">
//           <Routes>
//             <Route path="teachers" element={<Teachers />} />
//             <Route path="courses" element={<Courses />} />
//             <Route path="students" element={<Students />} />
//             <Route path="assignments-report" element={<AssignmentsReport />} />
//             <Route path="attendance-report" element={<AttendanceReport />} />
//             <Route path="*" element={<h2>Welcome, MGH Admin</h2>} />
//           </Routes>
//         </div>
//       </div> */}
//       <div className="admin-dashboard">
//         <Navbar title={`Admin • ${user?.name || ""}`} onLogout={onLogout} />
//         <div className="dashboard-layout">
//           <Sidebar links={links} />
//           <div className="dashboard-content">
//             <Routes>
//               <Route path="teachers" element={<Teachers />} />
//               <Route path="courses" element={<Courses />} />
//               <Route path="students" element={<Students />} />
//               <Route
//                 path="assignments-report"
//                 element={<AssignmentsReport />}
//               />
//               <Route path="attendance-report" element={<AttendanceReport />} />
//               <Route path="*" element={<h2>Welcome, MGH Admin</h2>} />
//             </Routes>
//           </div>
//           <h5 style={{ textAlign: "center", marginTop: "10px", color: "#555" }}>
//             <Clock />
//           </h5>
//           <ChatWidget user={user} />
//         </div>
//       </div>
//     </div>
//   );
// }

// new code
import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Students from "./Students";
import Teachers from "./Teachers";
import Courses from "./Courses";
import AssignmentsReport from "./AssignmentsReport";
import AttendanceReport from "./AttendanceReport";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { AuthContext } from "../../context/AuthContext";
import Clock from "../../components/Clock";
import ChatWidget from "../../components/ChatWidget";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const links = [
    { to: "students", label: "Students" },
    { to: "teachers", label: "Teachers" },
    { to: "courses", label: "Courses" },
    { to: "assignments-report", label: "Assignments Report" },
    { to: "attendance-report", label: "Attendance Report" },
  ];

  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();
  const [receiver, setReceiver] = useState(null); // 👈 selected chat partner

  const onLogout = () => {
    logout();
    nav("/login");
  };

  // Dummy user list (replace with real API later)
  const dummyUsers = [
    { id: "68ba86c2c0e84d6a07feb921", name: "Ahmed" },
    { id: "102", name: "Ansari" },
    { id: "103", name: "Fatima" },
  ];

  return (
    <div className="admin-dashboard">
      <Navbar title={`Admin • ${user?.name || ""}`} onLogout={onLogout} />
      <div className="dashboard-layout">
        <Sidebar links={links} />

        <div className="dashboard-content">
          <Routes>
            <Route path="teachers" element={<Teachers />} />
            <Route path="courses" element={<Courses />} />
            <Route path="students" element={<Students />} />
            <Route path="assignments-report" element={<AssignmentsReport />} />
            <Route path="attendance-report" element={<AttendanceReport />} />
            <Route path="*" element={<h2>Welcome, MGH Admin</h2>} />
          </Routes>

          <h5 style={{ textAlign: "center", marginTop: "10px", color: "#555" }}>
            <Clock />
          </h5>

          {/* User list for testing */}
          {/* <div className="p-2 border mt-4">
            <h4>Select user to chat:</h4>
            {dummyUsers.map((u) => (
              <div
                key={u.id}
                onClick={() => setReceiver(u)}
                className="cursor-pointer hover:bg-gray-100 p-1"
              >
                {u.name}
              </div>
            ))}
          </div> */}
        </div>

        {/* Chat widget at bottom-right */}
        <ChatWidget
          user={user}
          receiver={{ id: "68ba86c2c0e84d6a07feb921", name: "Ahmed" }}
        />
      </div>
    </div>
  );
}
