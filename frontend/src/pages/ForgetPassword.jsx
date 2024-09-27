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
    <div className="relative w-full px-4 flex flex-col justify-between items-top mb-12">
      {isLoading && <Loading />}
      <div className="flex justify-start items-start h-max">
        <div className="flex flex-col gap-4 mb-7">
          <h1 className="text-5xl  md:text-7xl text-white font-medium">
            Forgot Password
          </h1>
          <span className="text-xl md:text-2xl text-white font-semibold tracking-wide">
            Fear not
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-24">
        <div className="w-full md:w-1/2 blur-bg border py-7 px-5 border-ash/20 rounded-md  flex flex-col items-center justify-center gap-7 relative z-20">
          <p className="text-white">
            Enter the email address associated with your account and we&rsquo;ll
            send you a link to reset your password
          </p>
          <Input
            type="text"
            className="bg-gray-200 text-base p-4 md:p-3 rounded-lg w-full"
            placeholder="Email Address"
            onChange={(e) => handleChange(e)}
          />
          <button
            onClick={handleSubmit}
            className=" text-lg font-medium p-3 border  w-full bg-golden text-white rounded-lg"
            disabled={isLoading}
          >
            Submit
          </button>
          <div className="flex gap-2 items-center justify-center">
            <p className="text-gray-500 flex justify-center">
              Remember your password?
            </p>
            <Link to="/signin" className="text-primary">
              Login
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-4 items-center md:items-start ">
          <h1 className="text-white text-5xl md:text-8xl font-medium font tracking-wide whitespace-nowrap">
            Buy & Sell
          </h1>
          <p className="text-xl  md:text-3xl font-normal text-white tracking-wide">
            The Ultimate currency.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
