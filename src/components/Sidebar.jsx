import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import MyCourses from "../pages/student/Courses";
import Assignments from "./AssignmentReport";
import Submissions from "../pages/teacher/Submissions";
import ManageMeetLink from "../pages/teacher/ManageMeetLink";
import Students from "../pages/admin/Students";
import Teachers from "../pages/admin/Teachers";
import Courses from "../pages/admin/Courses";
import Attendance from "./Attendance";

const roleMenus = (user) => ({
  student: [
    { label: "Dashboard", icon: "🏠", component: <h2>Welcome Student 👋</h2> },
    { label: "My Courses", icon: "📘", component: <MyCourses /> },
    { label: "Assignments", icon: "📝", component: <Assignments user={user} /> },
    { label: "Attendance", icon: "📊", component: <Attendance user={user} /> },
  ],
  teacher: [
    { label: "Dashboard", icon: "🏠", component: <h2>Welcome Teacher 👋</h2> },
    { label: "My Courses", icon: "📘", component: <MyCourses /> },
    { label: "Assignments", icon: "📝", component: <Assignments user={user} /> },
    { label: "Attendance", icon: "📊", component: <Attendance user={user} /> },
    { label: "Submissions", icon: "📂", component: <Submissions /> },
    { label: "Manage Meet Link", icon: "🔗", component: <ManageMeetLink /> },
  ],
  admin: [
    { label: "Dashboard", icon: "🏠", component: <h2>Welcome Admin 👋</h2> },
    { label: "Students", icon: "👩‍🎓", component: <Students /> },
    { label: "Assignments", icon: "📝", component: <Assignments user={user} /> },
    { label: "Teachers", icon: "👨‍🏫", component: <Teachers /> },
    { label: "Courses", icon: "📘", component: <Courses /> },
    { label: "Attendance Report", icon: "📊", component: <Attendance user={user} /> },
  ],
});


export default function Dashboard() {
  const { user } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);

  if (!user) return null;
  console.log("Sidebar rendering for user:", user);
  // now menus is a function of user
  const menus = roleMenus(user)[user.role] || [];
  const ActiveComponent = menus[activeIndex]?.component;

  return (
    <div className="md:flex min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      {/* Sidebar */}
      <ul className="flex flex-col space-y-2 text-sm font-medium text-gray-700 dark:text-gray-300 w-64">
        {menus.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => setActiveIndex(index)}
              className={`inline-flex items-center w-full px-4 py-3 rounded-lg transition-colors
                ${activeIndex === index 
                  ? "bg-gray-300 dark:bg-gray-700 font-semibold" 
                  : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white dark:bg-gray-800 rounded-lg shadow ml-4">
        {ActiveComponent}
      </div>
    </div>
  );
}
