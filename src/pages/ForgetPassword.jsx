import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { forgetPassword } from "../services/auth.service";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

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
    <div className="px-4 md:px-24 pt-4 min-h-screen">
      <div className="border border-primary border-b-0 p-3 min-h-[100vh] flex justify-center items-center">
        <div className="w-full max-w-[400px] bg-accent rounded-md p-4 md:p-8 text-white">
          <h1 className="text-2xl mb-6 text-center">Forgot Password</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
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
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
          <div className="text-center mt-4">
            <span>Remember your password? </span>
            <Link to="/signin" className="text-primary underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="hollow-text z-100 touch-none">FORGET PASSWORD</div>
    </div>
  );
};

export default ForgetPassword;
