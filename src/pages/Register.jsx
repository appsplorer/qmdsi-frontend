import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";

import { authSignup } from "../services/auth.service";
import { toast } from "react-toastify";
import { FaSpinner, FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import { countryOptions } from "../data/countries";

const Register = () => {
  const [searchParams] = useSearchParams();
  const refBy = searchParams.get('ref');

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    country: "",
    phoneNumber: "",
    email: "",
    refBy: refBy ? refBy : "",
    password: "",
    confirmPassword: "",
    pin: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  
  

  const navigate = useNavigate();

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@#,!]/.test(password);
    const isLongEnough = password.length >= 8;
    setPasswordValid(
      hasUppercase && hasNumber && hasSpecialChar && isLongEnough
    );
    if (!isLongEnough) {
      setPasswordError("Password must be at least 8 characters long");
    } else if (!hasUppercase) {
      setPasswordError("Password must contain at least one uppercase letter");
    } else if (!hasNumber) {
      setPasswordError("Password must contain at least one number");
    } else if (!hasSpecialChar) {
      setPasswordError(
        "Password must contain at least one special character (@, #, !)"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      validatePassword(value);

      if (value !== formData.confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
      } else {
        setConfirmPasswordError("");
      }
    }

    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setConfirmPasswordError("Passwords do not match");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const { firstName, middleName, lastName, ...rest } = formData;
    const fullName = `${firstName} ${
      middleName ? middleName + " " : ""
    }${lastName}`;

    try {
      await authSignup({ ...rest, fullName });
      toast.success("Registration successful!");
      navigate("/signin");
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        country: "",
        phoneNumber: "",
        email: "",
        refBy: "",
        password: "",
        confirmPassword: "",
        pin: "",
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
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                  <label className="block mb-2" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-black text-white"
                    required
                  />
                </div>
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                  <label className="block mb-2" htmlFor="middleName">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    id="middleName"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-black text-white"
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <label className="block mb-2" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-black text-white"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:space-x-4">
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                  <label className="block mb-2" htmlFor="country">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-black text-white"
                    required
                  >
                    <option value="">Select a country</option>
                    {countryOptions.map((country) => (
                      <option key={country.value} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full md:w-1/2">
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
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:space-x-4">
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
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
                <div className="w-full md:w-1/2">
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
              </div>
              <div className="w-full mb-4 relative">
                <label className="block mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-black text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center -bottom-7"
                >
                  {showPassword ? (
                    <FaEyeSlash color="white" />
                  ) : (
                    <FaEye color="white" />
                  )}
                </button>
                <div className="mt-2 flex items-center space-x-2">
                  {passwordValid && !passwordError ? (
                    <FaCheck className="text-green-500" />
                  ) : null}
                  {passwordError && (
                    <p className="text-red-500 text-sm">{passwordError}</p>
                  )}
                </div>
              </div>
              <div className="w-full mb-4 relative">
                <label className="block mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-black text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center -bottom-7"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash color="white" />
                  ) : (
                    <FaEye color="white" />
                  )}
                </button>
                {confirmPasswordError && (
                  <p className="text-red-500 text-sm mt-1">
                    {confirmPasswordError}
                  </p>
                )}
              </div>
              <div className="w-full mb-4">
                <label className="block mb-2" htmlFor="pin">
                  PIN
                </label>
                <input
                  type="text"
                  id="pin"
                  name="pin"
                  value={formData.pin}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-black text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full p-2 rounded bg-primary text-white ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <Link to="/signin" className="text-primary">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
