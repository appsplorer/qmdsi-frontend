import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { verifyOtp } from "../services/auth.service";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { Input } from "antd";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6 && /^[0-9]*$/.test(value)) {
      setOtp(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    setIsLoading(true);

    try {
      await verifyOtp(otp);
      toast.success("Email verification successful!");
      navigate("/signin");
    } catch (err) {
      console.error(err);
      toast.error(err?.detail || "Invalid OTP. Please try again.");
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
            OTP Verification
          </h1>
          <span className="text-xl md:text-2xl text-white font-semibold tracking-wide">
            Please Verify
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-24">
        <div className="w-full md:w-1/2 blur-bg border py-7 px-5 border-ash/20 rounded-md  flex flex-col justify-center  gap-7 relative z-20">
          <p className="text-white">
            Please enter the OTP(One-Time Password) sent to your registered
            email/phone number to complete your verification
          </p>
          <Input.OTP size="large" className="p-4" onChange={handleOtpChange} />
          <button
            onClick={handleSubmit}
            className=" text-lg font-medium p-3 border  w-full bg-golden text-white rounded-lg"
            disabled={isLoading}
          >
            Verify OTP
          </button>
          <div className="flex gap-2 items-center justify-center">
            <p className="text-white">
              Didn’t receive the code?{" "}
              <Link to="#" className="text-primary underline">
                Resend OTP
              </Link>
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-4 items-center md:items-start ">
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
  );
};

export default VerifyEmail;
