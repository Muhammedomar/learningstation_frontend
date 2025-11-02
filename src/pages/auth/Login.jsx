import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../api/authApi";
import { setCredentials } from "./authSlice";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import heroImg from "../../assets/hero-bg.jpg";
import AuthLayout from "./AuthLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginApi, { isLoading }] = useLoginMutation();
  const { login: saveToContext } = useAuth();

  const handleSubmit = async (e) => {
    console.log("i am here when i am logged in");
    e.preventDefault();
    setError("");
    try {
      const response = await loginApi({ email, password }).unwrap();
      const userData = response.user || response;

      dispatch(setCredentials({ token: response.token, user: userData }));
      saveToContext(userData, response.token);

      if (userData.role === "student") navigate("/student");
      else if (userData.role === "teacher") navigate("/teacher");
      else if (userData.role === "admin") navigate("/admin");
      else navigate("/login");
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }
  };

  return (
    <AuthLayout leftImage={heroImg}>
      <form className="space-y-6 p-5" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Sign in to our platform
        </h5>
        {error && <span className="text-red-500">{error}</span>}

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                       dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                       dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none 
                     focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                     dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? "Logging in..." : "Login to your account"}
        </button>

        <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?{" "}
          <Link
            to="/register"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Create account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
