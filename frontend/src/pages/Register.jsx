import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { authSignup } from "../services/auth.service";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { countryOptions } from "../data/countries";
import { Button, Input } from "antd";

const Register = () => {
  const [searchParams] = useSearchParams();
  const refBy = searchParams.get("ref");

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
    confirmPin: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [pinError, setPinError] = useState("");
  const [confirmPinError, setConfirmPinError] = useState("");
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

  const validatePin = (pin) => {
    const isNumeric = /^\d+$/.test(pin);
    if (!isNumeric) {
      setPinError("PIN must contain only numbers");
    } else if (pin.length !== 4) {
      setPinError("PIN must be exactly 4 digits");
    } else {
      setPinError("");
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

    if (name === "pin") {
      validatePin(value);
      if (value !== formData.confirmPin) {
        setConfirmPinError("PINs do not match");
      } else {
        setConfirmPinError("");
      }
    }

    if (name === "confirmPin") {
      if (value !== formData.pin) {
        setConfirmPinError("PINs do not match");
      } else {
        setConfirmPinError("");
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

    if (formData.pin !== formData.confirmPin) {
      setConfirmPinError("PINs do not match");
      setIsLoading(false);
      return;
    }

    if (pinError || passwordError || confirmPinError) {
      setIsLoading(false);
      return;
    }

    try {
      await authSignup(formData);
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
        confirmPin: "",
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.detail || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full px-4 md:px-10 pb-5 flex flex-col gap-5">
      <div className="w-full relative z-20">
        <div className="flex flex-col gap-2 mb-7">
          <h1 className="text-5xl  md:text-7xl text-white font-medium">
            Register
          </h1>
          <span className="text-2xl font-normal text-white mb-6 mt-2">
            Hi. Guest
          </span>
        </div>
        <form className="flex flex-col md:flex-row items-center justify-center gap-5 w-full">
          <div className="w-full flex flex-col md:flex-row gap-5">
            {/* Information */}
            <div className="w-full md:w-1/2 py-7 px-5 blur-bg border border-ash/20 rounded-md flex flex-col gap-4">
              <h1 className="text-2xl text-gray-300 tracking-wider">
                Information
              </h1>
              <div className="flex flex-col md:flex-row gap-3">
                <Input
                  type="text"
                  className="text-slate-800 text-lg p-3 rounded-lg w-full bg-smoke"
                  placeholder="First Name"
                  onChange={handleChange}
                  name="firstName"
                  value={formData.firstName}
                  required
                />
                <Input
                  type="text"
                  className="text-slate-800 text-lg p-3 rounded-lg w-full bg-smoke"
                  placeholder="Middle Name"
                  onChange={handleChange}
                  name="middleName"
                  value={formData.middleName}
                />
                <Input
                  type="text"
                  className="text-slate-800 text-lg p-3 rounded-lg w-full bg-smoke"
                  placeholder="Last Name"
                  onChange={handleChange}
                  name="lastName"
                  value={formData.lastName}
                  required
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="text-lg rounded-lg w-full p-3 bg-smoke"
                  required
                >
                  <option value="">Select a country</option>
                  {countryOptions.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
                <Input
                  type="number"
                  className="text-slate-800 text-lg p-3 rounded-lg w-full bg-smoke"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  required
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <Input
                  type="email"
                  className="text-slate-800 text-lg p-3 rounded-lg w-full bg-smoke"
                  placeholder="Email"
                  onChange={handleChange}
                  name="email"
                  value={formData.email}
                  required
                />
                <Input
                  type="text"
                  className="text-slate-800 text-lg p-3 rounded-lg w-full bg-smoke"
                  placeholder="Referred By"
                  onChange={handleChange}
                  name="refBy"
                  value={formData.refBy}
                />
              </div>
            </div>

            {/* Security */}
            <div className="w-full md:w-1/2 flex flex-col gap-3">
              <div className="py-7 px-5 blur-bg border border-ash/20 rounded-md flex flex-col gap-3">
                <h1 className="text-2xl text-gray-300 tracking-wider">
                  Security
                </h1>
                <div className="flex flex-col md:flex-row gap-3">
                  <Input.Password
                    className="text-slate-800 text-lg p-3 rounded-lg w-full bg-smoke"
                    placeholder="Password"
                    onChange={handleChange}
                    name="password"
                    value={formData.password}
                    required
                  />
                  {passwordError && (
                    <span className="text-red-500 text-sm">
                      {passwordError}
                    </span>
                  )}
                  <Input.Password
                    className="text-slate-800 text-lg p-3 rounded-lg w-full bg-smoke"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    required
                  />
                  {confirmPasswordError && (
                    <span className="text-red-500 text-sm">
                      {confirmPasswordError}
                    </span>
                  )}
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                  <Input
                    type="password"
                    className="text-slate-800 text-lg p-3 rounded-lg w-full bg-smoke"
                    placeholder="Enter a 4-Digit PIN"
                    onChange={handleChange}
                    name="pin"
                    value={formData.pin}
                    required
                  />
                  {pinError && (
                    <span className="text-red-500 text-sm">{pinError}</span>
                  )}
                  <Input
                    type="password"
                    className="text-slate-800 text-lg p-3 rounded-lg w-full bg-smoke"
                    placeholder="Confirm 4-Digit PIN"
                    onChange={handleChange}
                    name="confirmPin"
                    value={formData.confirmPin}
                    required
                  />
                  {confirmPinError && (
                    <span className="text-red-500 text-sm">
                      {confirmPinError}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="text-lg font-medium p-3 border w-full bg-golden text-white rounded-lg"
                loading={isLoading}
              >
                {isLoading ? <FaSpinner /> : "Register"}
              </button>
            </div>
          </div>
        </form>
        <p className="text-center text-slate-500 text-base mt-5">
          Already have an account?{" "}
          <Link to="/signin" className="text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
