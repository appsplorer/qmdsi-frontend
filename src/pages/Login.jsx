import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authLogin } from "../services/auth.service";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authLogin(formData);
      console.log("Login successful:", response);
      await login(response.access_token);
      toast.success("Login successful!");
      navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error?.detail || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 md:px-24 pt-4 min-h-screen">
      <div className="border border-primary border-b-0 p-3 min-h-[100vh] flex justify-center items-center">
        <div className="w-full max-w-[400px] bg-accent rounded-md p-4 md:p-8 text-white">
          <h1 className="text-2xl mb-6 text-center">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2" htmlFor="username">
                Email Address
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 rounded bg-black text-white"
                required
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 rounded bg-black text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primary w-full py-2 rounded text-dark mt-4 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="text-center mt-4">
            <span>Don&apos;t have an account? </span>
            <Link to="/signup" className="text-primary underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hollow-text z-100 touch-none">LOGIN</div>
    </div>
  );
};

export default Login;
