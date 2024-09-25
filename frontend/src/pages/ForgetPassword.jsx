import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { forgetPassword } from "../services/auth.service";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { Input } from "antd";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await forgetPassword(email);
      toast.success("Password reset link has been sent to your email.");
      navigate("/signin");
    } catch (error) {
      console.error("Failed to send password reset:", error);
      toast.error(
        error?.detail || "Failed to send password reset link. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center p-5 md:px-24">
      {/* Left Side - Form */}
      {isLoading && <Loading />}
      <div className="w-full md:w-1/2 max-w-lg blur-bg border py-7 px-5 border-ash/20 rounded-md flex flex-col items-center justify-center gap-7">
        <h1 className="text-xl md:text-3xl font-normal text-white">
          Forgot Password
        </h1>
        <p className="text-white text-center">
          Enter the email address associated with your account and we’ll send
          you a link to reset your password.
        </p>
        <Input
          type="text"
          className="bg-gray-200 text-base p-4 md:p-3 rounded-lg w-full"
          placeholder="Email Address"
          onChange={handleChange}
        />
        <button
          onClick={handleSubmit}
          className="text-lg font-medium p-3 border w-full bg-golden text-white rounded-lg"
          disabled={isLoading}
        >
          Proceed
        </button>
        <div className="flex gap-2 items-center justify-center">
          <p className="text-gray-500">Remember your password?</p>
          <Link to="/signin" className="text-golden hover:underline">
            Login
          </Link>
        </div>
      </div>

      {/* Right Side - Promo Section */}
      <div className="w-full md:w-1/2 mt-10 md:mt-0 flex flex-col items-center md:items-start text-center md:text-left gap-5">
        <h1 className="text-white text-5xl md:text-8xl font-medium tracking-wide">
          Buy & Sell
        </h1>
        <p className="text-xl md:text-3xl font-normal text-white tracking-wide">
          The Ultimate currency.
        </p>
        <h1 className="text-white text-3xl md:text-7xl font-medium tracking-wide mt-12">
          Get Mobile Wallet
        </h1>
        <p className="text-xl md:text-3xl font-normal text-white tracking-wide">
          Status: Developing
        </p>
        <div className="flex flex-col md:flex-row gap-3 mt-3 w-full justify-center md:justify-start">
          <button className="text-white text-base tracking-wider py-3 px-7 rounded-full border">
            Google Play
          </button>
          <button className="text-white text-base tracking-wider py-3 px-7 rounded-full border">
            Apple Apps
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
