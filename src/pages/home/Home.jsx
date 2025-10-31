import { Link } from "react-router-dom";
import heroImg from "../../assets/hero-bg.jpg";
import AuthLayout from "../auth/AuthLayout";

const Home = () => {
  return (
    <AuthLayout leftImage={heroImg}>
      <div className="p-5 space-y-3">
        <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Welcome to Our Platform
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Access your dashboard based on your role.
        </p>
        <Link to="/login" className="btn-primary inline-flex items-center">
          Login Here
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Home;
