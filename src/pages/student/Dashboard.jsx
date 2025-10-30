// import { Routes, Route } from "react-router-dom";
// import Sidebar from "../../components/Sidebar";
// import Courses from "./Courses";
// import Assignments from "./Assignments";
// import Attendance from "./Attendance";
// import SubmitAssignment from "./SubmitAssignment";
// import ChatWidget from "../../components/ChatWidget";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
// export default function StudentDashboard() {
//   const { user, logout } = useContext(AuthContext);
//   console.log("StudentDashboard rendered");
//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar />
//       <div style={{ flex: 1, padding: 20 }}>
//         <Routes>
//           <Route index element={<h2>Welcome Student</h2>} />
//           <Route path="courses" element={<Courses user={user} />} />
//           <Route path="assignments/:courseId" element={<Assignments />} />
//           <Route
//             path="assignments/:courseId/submit/:assignmentId"
//             element={<SubmitAssignment />}
//           />

//           <Route path="attendance" element={<Attendance />} />
//         </Routes>
//       </div>
//       {/* Chat widget at bottom-right */}
//       <ChatWidget
//         user={user} // Ahmed
//         receiver={{ id: "68baa06f29eb9c64e74fce7e", name: "Admin User" }} // Admin
//       />
//     </div>
//   );
// }
// import { Routes, Route, useNavigate } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import Sidebar from "../../components/Sidebar";
// import Courses from "./Courses";
// import Assignments from "./Assignments";
// import Attendance from "./Attendance";
// import SubmitAssignment from "./SubmitAssignment";
// import Clock from "../../components/Clock";
// import ChatWidget from "../../components/ChatWidget";
// import { AuthContext } from "../../context/AuthContext";
// import Navbar from "../../components/Navbar";
// // import "./StudentDashboard.css";

// // Create a socket here — same as AdminDashboard
// const socket = io("http://localhost:5000");

// export default function StudentDashboard() {
//   const { user, logout } = useContext(AuthContext);
//   const nav = useNavigate();

//   const [receiver, setReceiver] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);

//   useEffect(() => {
//     if (!user) return;

//     // Notify server that this student is online
//     socket.emit("join-user", { id: user.id, name: user.name });
//     socket.emit("get-online-users");

//     // Listen for updates of online users
//     const handler = (users) => {
//       // Filter out the current user
//       setOnlineUsers(users.filter((u) => u.id !== user.id));
//     };
//     socket.on("online-users", handler);

//     return () => {
//       socket.off("online-users", handler);
//     };
//   }, [user]);

//   const onLogout = () => {
//     logout();
//     nav("/login");
//   };

//   const links = [
//     { to: "courses", label: "Courses" },
//     { to: "attendance", label: "Attendance" },
//     { to: "assignments/:courseId", label: "Assignments" },
//   ];

//   return (
//     <div className="student-dashboard">
//       <Navbar title={`Student • ${user?.name || ""}`} onLogout={onLogout} />

//       <div className="dashboard-layout">
//         <Sidebar links={links} />

//         <div className="dashboard-content">
//           <Routes>
//             <Route
//               index
//               element={<h2>Welcome, {user?.name || "Student"} 👋</h2>}
//             />
//             <Route path="courses" element={<Courses user={user} />} />
//             <Route path="assignments/:courseId" element={<Assignments />} />
//             <Route
//               path="assignments/:courseId/submit/:assignmentId"
//               element={<SubmitAssignment />}
//             />
//             <Route path="attendance" element={<Attendance />} />
//           </Routes>

//           <h5 style={{ textAlign: "center", marginTop: "10px", color: "#555" }}>
//             <Clock />
//           </h5>

//           {/* ✅ Select chat receiver (like admin) */}
//           <div style={{ textAlign: "center", margin: "10px 0" }}>
//             <label>Select a user to chat with: </label>
//             <select
//               onChange={(e) => {
//                 const selected = onlineUsers.find(
//                   (u) => u.id === e.target.value
//                 );
//                 setReceiver(selected || null);
//               }}
//               value={receiver?.id || ""}
//             >
//               <option value="">-- Select User --</option>
//               {onlineUsers.map((u) => (
//                 <option key={u.id} value={u.id}>
//                   {u.name} 🟢
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* ✅ Private Chat */}
//         <ChatWidget user={user} receiver={receiver} />
//       </div>
//     </div>
//   );
// }
