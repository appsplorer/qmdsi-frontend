import { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { forgetPassword, resetPassword } from "../services/auth.service";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { FaCheck } from "react-icons/fa";
import { validatePassword } from "../utils";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  
  const navigate = useNavigate();
  

  useEffect(() => {
    if(!token){
    navigate("/signin")
  }
  }, [])

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if(!password && !confirmPassword){
      setPasswordError(" ")
      return
    }
    try{
      validatePassword(password)
      if(password && (password != confirmPassword)){
        setPasswordError("Password Mismatch")
        return 
    }
      setPasswordError("")
      
    }catch(e){
      setPasswordError(e.message)
    }
    

  }, [password, confirmPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try{
      validatePassword(password)
    }catch(e){
      toast.warn(e.message)
      setIsLoading(true);
      return 
    }
    
    try {
      
      
      const res = await resetPassword(password, token);
      toast.success("Password Resetted");
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
          <h1 className="text-2xl mb-6 text-center">Reset Your Password</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2" htmlFor="email">
                New  Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                className="w-full p-2 rounded bg-black text-white"
                required
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="email">
                Confirm New  Password
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 rounded bg-black text-white"
                required
              />
            </div>
            <div className="mt-2 flex items-center space-x-2">
                  {passwordError && (
                    <p className="text-red-500 text-sm">{passwordError}</p>
                  )}
                </div>
            <button
              type="submit"
              className="bg-primary w-full py-2 rounded text-dark mt-4 flex items-center justify-center"
              disabled={isLoading || passwordError}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
          
        </div>
      </div>
      
    </div>
  );
};

export default ResetPassword;
