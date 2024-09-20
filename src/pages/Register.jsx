import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";

import { authSignup } from "../services/auth.service";
import { toast } from "react-toastify";
import { FaSpinner, FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import { countryOptions } from "../data/countries";
import { Button, Input } from "antd";
import { FiArrowLeft } from "react-icons/fi";

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
    <div className="w-full px-4 md:px-10 pb-5 flex flex-col  gap-5">
      <div className="w-full relative z-20">
        <div className="flex flex-col gap-2 mb-7">
          <h1 className="text-5xl  md:text-7xl text-white font-medium">
            Register
          </h1>
          <span className="text-2xl font-normal text-white mb-6 mt-2">
            Hi. Guest
          </span>
        </div>
        <form className="flex   flex-col md:flex-row items-center justify-center gap-5 w-full ">
          <div className="w-full flex  flex-col  md:flex-row  gap-5">
            {/* information */}
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
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className=" text-lg rounded-lg w-full p-3 bg-smoke"
                  required
                  placeholder="test"
                >
                  <option value="" className="">
                    Select a country
                  </option>
                  {countryOptions.map((country) => (
                    <option
                      key={country.value}
                      value={country.value}
                      className="text-charcoalBlue bg-smoke"
                    >
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
                />
                <Input
                  type="text"
                  className="text-slate-800 text-lg p-3 rounded-lg w-full bg-smoke"
                  placeholder="Reffered By"
                  onChange={handleChange}
                  name="refBy"
                  value={formData.refBy}
                />
              </div>
            </div>
            {/* security */}
            <div className="w-full md:w-1/2   flex flex-col gap-3">
              <div className="py-7 px-5 blur-bg border border-ash/20 rounded-md  flex flex-col gap-3">
                <h1 className="text-2xl text-gray-300 tracking-wider">
                  Security
                </h1>
                <div className="flex flex-col md:flex-row gap-3">
                  <Input.Password
                    type="password"
                    className="text-slate-800 text-lg p-3 rounded-lg w-full bg-smoke"
                    placeholder="Password"
                    onChange={handleChange}
                    name="password"
                    value={formData.password}
                  />
                  <Input.Password
                    type="password"
                    className="text-slate-800 text-lg p-3 rounded-lg w-full bg-smoke"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                  />
                </div>
                <Input
                  type="text"
                  className="text-slate-800 text-lg p-3 rounded-lg w-full bg-smoke"
                  placeholder="Enter PIN"
                  onChange={handleChange}
                  name="pin"
                  value={formData.pin}
                />
              </div>
              <div className="w-full px-5">
                <button
                  onClick={handleSubmit}
                  className=" text-lg font-medium p-3 border  w-full bg-golden text-white rounded-lg"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
