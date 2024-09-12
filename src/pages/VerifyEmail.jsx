import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { verifyOtp } from "../services/auth.service";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

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
    <div className="px-4 md:px-24 pt-4 min-h-screen">
      <div className="border border-primary border-b-0 p-3 min-h-[100vh] flex justify-center items-center">
        <div className="w-full max-w-[400px] bg-accent rounded-md p-4 md:p-8 text-white">
          <h1 className="text-2xl mb-6 text-center">Verify Your Email</h1>
          <p className="text-center mb-6">
            Enter the 6-digit OTP sent to your email.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                maxLength="6"
                value={otp}
                onChange={handleOtpChange}
                className="w-full p-3 rounded bg-black text-white text-center text-xl tracking-widest"
                placeholder="Enter OTP"
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
                "Verify OTP"
              )}
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-white">
              Didn’t receive the code?{" "}
              <Link to="#" className="text-primary underline">
                Resend OTP
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hollow-text z-100 touch-none">VERIFY EMAIL</div>
    </div>
  );
};

export default VerifyEmail;
