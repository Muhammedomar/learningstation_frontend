// frontend/src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../pages/auth/Login";
// import Register from "../pages/auth/Register";
import StudentDashboard from "../pages/student/Dashboard";
import TeacherDashboard from "../pages/teacher/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";
import { AuthProvider, useAuth } from "../context/AuthContext";

// 🔹 PrivateRoute wrapper (checks login + role)
function PrivateRoute({ children, allowedRole }) {
  const { user } = useAuth();
  console.log("Redirecting to role:", user);
  // If no user → go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If role doesn’t match → redirect to correct dashboard
  if (allowedRole && user.role !== allowedRole) {
    console.log("Redirecting to correct dashboard for role:", user.role);
    return <Navigate to={`/${user.role}`} replace />;
  }

  return children;
}

export default function App() {
  console.log("App rendered");
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}

          {/* Student Dashboard (Protected) */}
          <Route
            path="/student/*"
            element={
              <PrivateRoute allowedRole="student">
                <StudentDashboard />
              </PrivateRoute>
            }
          />

          {/* Teacher Dashboard (Protected) */}
          <Route
            path="/teacher/*"
            element={
              <PrivateRoute allowedRole="teacher">
                <TeacherDashboard />
              </PrivateRoute>
            }
          />

          {/* Admin Dashboard (Protected) */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute allowedRole="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          {/* Catch-all route */}
          <Route
            path="*"
            element={<div style={{ padding: 40 }}>404 • Not found</div>}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
