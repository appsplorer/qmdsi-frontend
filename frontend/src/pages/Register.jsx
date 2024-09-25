import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { authSignup } from "../services/auth.service";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { countryOptions } from "../data/countries";
import { Input } from "antd";

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
  const [errors, setErrors] = useState({});
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
      return "Password must be at least 8 characters long";
    } else if (!hasUppercase) {
      return "Password must contain at least one uppercase letter";
    } else if (!hasNumber) {
      return "Password must contain at least one number";
    } else if (!hasSpecialChar) {
      return "Password must contain at least one special character (@, #, !)";
    }
    return "";
  };

  const validatePin = (pin) => {
    const isNumeric = /^\d+$/.test(pin);
    if (!isNumeric) {
      return "PIN must contain only numbers";
    } else if (pin.length !== 4) {
      return "PIN must be exactly 4 digits";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    let newErrors = { ...errors };

    if (name === "password") {
      newErrors.password = validatePassword(value);
      if (value !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      } else {
        delete newErrors.confirmPassword;
      }
    }

    if (name === "confirmPassword") {
      if (value !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match";
      } else {
        delete newErrors.confirmPassword;
      }
    }

    if (name === "pin") {
      newErrors.pin = validatePin(value);
      if (value !== formData.confirmPin) {
        newErrors.confirmPin = "PINs do not match";
      } else {
        delete newErrors.confirmPin;
      }
    }

    if (name === "confirmPin") {
      if (value !== formData.pin) {
        newErrors.confirmPin = "PINs do not match";
      } else {
        delete newErrors.confirmPin;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = {};
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (formData.pin !== formData.confirmPin) {
      newErrors.confirmPin = "PINs do not match";
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    const pinError = validatePin(formData.pin);
    if (pinError) newErrors.pin = pinError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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

  const InputWithError = ({
    type,
    name,
    placeholder,
    value,
    onChange,
    error,
  }) => (
    <div className="flex flex-col w-full">
      <Input
        type={type}
        className={`text-slate-800 text-lg p-3 rounded-lg w-full bg-smoke ${
          error ? "border-red-500" : ""
        }`}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
        required
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );

  return (
    <div className="w-full px-4 md:px-10 pb-5 flex flex-col gap-5">
      {isLoading && <Loading />}
      <div className="w-full relative z-20">
        <div className="flex flex-col gap-2 mb-7">
          <h1 className="text-4xl md:text-5xl lg:text-7xl text-white font-medium">
            Register
          </h1>
          <span className="text-xl md:text-2xl font-normal text-white mb-6 mt-2">
            Hi. Guest
          </span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-start justify-center gap-5 w-full"
        >
          <div className="w-full flex flex-col md:flex-row gap-5">
            {/* Information */}
            <div className="w-full md:w-1/2 py-7 px-5 blur-bg border border-ash/20 rounded-md flex flex-col gap-4">
              <h1 className="text-2xl text-gray-300 tracking-wider">
                Information
              </h1>
              <div className="flex flex-col md:flex-row gap-3">
                <InputWithError
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                />
                <InputWithError
                  type="text"
                  name="middleName"
                  placeholder="Middle Name"
                  value={formData.middleName}
                  onChange={handleChange}
                  error={errors.middleName}
                />
                <InputWithError
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex flex-col w-full">
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`text-lg rounded-lg w-full p-3 bg-smoke ${
                      errors.country ? "border-red-500" : ""
                    }`}
                    required
                  >
                    <option value="">Select a country</option>
                    {countryOptions.map((country) => (
                      <option key={country.value} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                  {errors.country && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.country}
                    </span>
                  )}
                </div>
                <InputWithError
                  type="number"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  error={errors.phoneNumber}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <InputWithError
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <InputWithError
                  type="text"
                  name="refBy"
                  placeholder="Referred By"
                  value={formData.refBy}
                  onChange={handleChange}
                  error={errors.refBy}
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
                  <InputWithError
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                  />
                  <InputWithError
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                  <InputWithError
                    type="password"
                    name="pin"
                    placeholder="Enter a 4-Digit PIN"
                    value={formData.pin}
                    onChange={handleChange}
                    error={errors.pin}
                  />
                  <InputWithError
                    type="password"
                    name="confirmPin"
                    placeholder="Confirm 4-Digit PIN"
                    value={formData.confirmPin}
                    onChange={handleChange}
                    error={errors.confirmPin}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-lg font-medium p-3 border w-full bg-golden text-white rounded-lg"
                disabled={isLoading}
              >
                Register
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
