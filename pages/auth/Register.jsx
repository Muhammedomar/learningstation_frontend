// frontend/pages/auth/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../api/authApi";

export default function Register({ role, xyz }) {
  const [name, setName] = useState("");
  const [course, newCourse] = useState("");
  const [newrole, setNewrole] = useState(role);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  console.log(role);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // let xyz = role.toLowerCase();
    try {
      await register({ name, email, password, role }).unwrap();
      // after successful register → redirect to login
      if (role === "student") {
        navigate("/login");
      }
      if (role === "teacher") {
        navigate("/admin/students");
      }
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "60px auto" }}>
      <div className="card">
        <h2>{role} Register</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {role === "teacher" && (
            <input
              type="text"
              value={newrole}
              name="role"
              onChange={(e) => setNewrole(role.toLowerCase())}
            />
            // {(role === teacher) ? ("course") : (null)}
          )}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
