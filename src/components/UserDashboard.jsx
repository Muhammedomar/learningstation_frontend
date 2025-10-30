import React from "react";

export default function UserDashboard({ user }) {
  if (!user) return null;

  return (
    <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-900 shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Welcome, {user.name || "User"} 👋
      </h2>

      <div className="space-y-2 text-gray-700 dark:text-gray-300">
        <p>
          <strong>Email:</strong> {user.email || "N/A"}
        </p>
        <p className="capitalize">
          <strong>Role:</strong> {user.role}
        </p>
      </div>

      <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {user.role === "admin" && (
          <p>As an admin, you can manage teachers, students, and courses.</p>
        )}
        {user.role === "teacher" && (
          <p>As a teacher, you can create assignments and view submissions.</p>
        )}
        {user.role === "student" && (
          <p>As a student, you can view courses, submit assignments, and track attendance.</p>
        )}
      </div>
    </div>
  );
}
