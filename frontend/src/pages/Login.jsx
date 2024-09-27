import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authLogin } from "../services/auth.service";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../components/Loading";
import { Input } from "antd";

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
      login(response.access_token);
      toast.success("Login successful!");
      navigate("/profile");
    } catch (error) {
      toast.error(error?.detail || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full  px-4 md:px-10 pb-5 flex flex-col  gap-5">
      {isLoading && <Loading />}
      <div className="w-full relative z-20">
        <div className="flex flex-col gap-4 mb-7">
          <h1 className="text-5xl  md:text-7xl text-white font-medium">
            Log In
          </h1>
          <span className="text-xl md:text-2xl text-white font-semibold tracking-wide">
            Welcome
          </span>
        </div>
        <div className="flex   flex-col md:flex-row items-center justify-center gap-5 w-full ">
          <div className="w-full flex  flex-col  md:flex-row  gap-14 md:gap-24">
            {/* information */}
            <div className="w-full md:w-1/2 py-7 px-5 blur-bg border border-ash/20 rounded-md flex flex-col gap-4">
              <h1 className="text-2xl text-gray-300 font-medium tracking-wider">
                Information
              </h1>
              <Input
                type="text"
                className="text-slate-800 text-lg p-3 rounded-lg w-full bg-smoke"
                placeholder="Username"
                onChange={handleChange}
                name="username"
              />
              <Input.Password
                type="password"
                className="text-slate-800 text-lg p-3 rounded-lg w-full bg-smoke"
                placeholder="Password"
                onChange={handleChange}
                name="password"
              />

              <button
                disabled={isLoading}
                onClick={handleSubmit}
                className=" text-lg font-medium p-3 border  w-full bg-golden text-white rounded-lg"
              >
                Login
              </button>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm tracking-wider">
                    Don&rsquo;t have an Account?{" "}
                  </span>{" "}
                  <Link
                    to="/signup"
                    className="text-golden tracking-wider"
                    href="/"
                  >
                    Sign Up
                  </Link>
                </div>
                <Link
                  to="/forget-password"
                  className="text-sm text-white text-rights tracking-wider"
                >
                  Forgot Password
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2   flex flex-col gap-4 items-center md:items-start ">
              <h1 className="text-white text-5xl md:text-8xl font-medium font tracking-wide whitespace-nowrap">
                Buy & Sell
              </h1>
              <p className="text-xl  md:text-3xl font-normal text-white tracking-wide">
                The Ultimate currency.
              </p>
              <h1 className="text-white text-3xl md:text-7xl font-mediu tracking-wide mt-12">
                Get Mobile Wallet
              </h1>
              <p className="text-xl  md:text-3xl font-normal text-white tracking-wide">
                Status: Developing
              </p>
              <div className="flex flex-col md:flex-row gap-3 mt-3 w-full">
                <button className="text-white text-base tracking-wider py-3 px-7 rounded-full border">
                  Google Play
                </button>
                <button className="text-white text-base tracking-wider py-3 px-7 rounded-full border">
                  Apple Apps
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// end
