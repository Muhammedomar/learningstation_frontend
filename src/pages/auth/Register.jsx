import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterMutation } from "../../api/authApi";
import heroImg from "../../assets/hero-bg.jpg";
import AuthLayout from "./AuthLayout";

const Register = ({ role }) => {
  const [name, setName] = useState("");
  const [newRole, setNewRole] = useState(role);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register({ name, email, password, role }).unwrap();
      navigate(role === "student" ? "/login" : "/teacher");
    } catch (err) {
      setError("Registration failed. Try again.");
      console.error(err);
    }
  };

  // hello Register
  return (
    <AuthLayout leftImage={heroImg}>
      <form className="space-y-6 p-5" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Create an account
        </h5>
        {error && <span className="text-red-500">{error}</span>}

        {/* Name */}
        <input
          type="text"
          placeholder="John Doe"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                     dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="name@company.com"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                     dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                     dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Role if teacher */}
        {role === "teacher" && (
          <input
            type="text"
            placeholder="Role"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                       dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          />
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none 
                     focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                     dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
