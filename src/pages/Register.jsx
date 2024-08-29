import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authSignup } from "../services/auth.service";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    phoneNumber: "",
    email: "",
    refBy: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      await authSignup(formData);
      toast.success("Registration successful!");
      navigate("/signin");
      setFormData({
        fullName: "",
        country: "",
        phoneNumber: "",
        email: "",
        refBy: "",
        password: "",
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.detail || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 md:px-24 pt-4 min-h-screen">
      <div className="border border-primary border-b-0 p-3 min-h-[100vh] flex justify-center items-center">
        <div className="w-full max-w-[1200px] bg-accent rounded-md p-4 md:p-8 text-white">
          <h1 className="text-2xl mb-6 text-center">Register</h1>
          <form onSubmit={handleSubmit} className="space-y-4 px-4 md:px-24">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:justify-between md:space-x-4">
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                  <label className="block mb-2" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-black text-white"
                    required
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block mb-2" htmlFor="country">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-black text-white"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:space-x-4">
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                  <label className="block mb-2" htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-black text-white"
                    required
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-black text-white"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:space-x-4">
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                  <label className="block mb-2" htmlFor="refBy">
                    Referred By
                  </label>
                  <input
                    type="text"
                    id="refBy"
                    name="refBy"
                    value={formData.refBy}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-black text-white"
                  />
                </div>
                <div className="w-full md:w-1/2">
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
              </div>
            </div>
            <button
              type="submit"
              className="bg-primary w-full py-2 rounded text-dark mt-4 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>
          <div className="text-center mt-4">
            <span>Already have an account? </span>
            <Link to="/signin" className="text-primary underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hollow-text z-100 touch-none">REGISTER</div>
    </div>
  );
};

export default Register;
