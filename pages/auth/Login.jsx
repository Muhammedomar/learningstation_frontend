import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../api/authApi";
import { setCredentials } from "./authSlice";
import { useAuth } from "../../context/AuthContext";
import Register from "./Register";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ RTK Query hook
  const [loginApi, { isLoading }] = useLoginMutation();

  // ✅ Context hook (renamed to avoid name clash)
  const { login: saveToContext } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ Use the correct function from RTK Query
      const response = await loginApi({ email, password }).unwrap();
      console.log("Full Login Response:", response);

      // ✅ Handle cases where backend returns { token, user: {...} }
      const userData = response.user || response;

      // ✅ Save to Redux store
      dispatch(setCredentials({ token: response.token, user: userData }));

      // ✅ Save to AuthContext (used in PrivateRoute)
      saveToContext(userData, response.token);

      // ✅ Redirect based on role
      if (userData.role === "student") navigate("/student");
      else if (userData.role === "teacher") navigate("/teacher");
      else if (userData.role === "admin") navigate("/admin");
      else navigate("/login"); // fallback if no role
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "60px auto" }}>
      <div className="card">
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      <Register role="student" />
    </div>
  );
}
