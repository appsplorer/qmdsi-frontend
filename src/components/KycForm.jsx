/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { countryOptions, nationalityOptions } from "../data/countries";
import {
  genderOptions,
  maritalStatusOptions,
  nationalIdTypeOptions,
} from "../constants/KYC";
import {
  updatePersonalInfo,
  updateProfileImages,
} from "../services/users.service";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import { customStyles } from "../styles";

const FormField = ({
  label,
  name,
  control,
  type = "text",
  placeholder,
  rules,
}) => (
  <div className="w-full mb-4">
    <label className="block text-sm mb-2" htmlFor={name}>
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      rules={rules} // Add rules here
      render={({ field, fieldState: { error } }) => (
        <>
          <input
            className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
            type={type}
            placeholder={placeholder}
            {...field}
          />
          {error && (
            <span className="text-red-500 text-sm">{error.message}</span>
          )}
        </>
      )}
    />
  </div>
);

const SelectField = ({ label, name, control, options, placeholder, rules }) => (
  <div className="w-full mb-4">
    <label className="block text-sm mb-2" htmlFor={name}>
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      rules={rules} // Add rules here
      render={({ field, fieldState: { error } }) => (
        <>
          <Select
            {...field}
            options={options}
            styles={customStyles}
            onChange={(selectedOption) => field.onChange(selectedOption.value)}
            placeholder={placeholder}
            value={options.find((option) => option.value === field.value)}
          />
          {error && (
            <span className="text-red-500 text-sm">{error.message}</span>
          )}
        </>
      )}
    />
  </div>
);

const FileUploadField = ({ label, name, setValue }) => (
  <div className="w-full mb-4">
    <label className="block text-sm mb-2" htmlFor={name}>
      {label}
    </label>
    <input
      type="file"
      name={name}
      onChange={(e) => setValue(name, e.target.files[0])}
      className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
    />
  </div>
);

const KycForm = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });
  const { auth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await updateProfileImages(
        auth.accessToken,
        data.profilePic,
        data.personalId
      );

      const personalInfoData = {
        name: data.name,
        employeeName: data.employerName,
        incomePerAnnum: parseFloat(data.income),
        dateOfBirth: data.dateOfBirth,
        address: data.address,
        city: data.city,
        postalCode: data.zipCode,
        country: data.country,
        citizenship: data.citizenship,
        currency: data.currency,
        motherName: data.motherName,
        incomeTaxNo: data.incomeTaxNo,
        idType: data.idType,
        idNumber: data.idNumber,
        industry: data.industry,
        occupation: data.occupation,
        sourceOfIncome: data.income,
        email: data.email,
        email2: data.email2,
        mobilePhone: data.mobilePhone,
        phone2: data.phone2,
        faxNo: data.faxNumber,
        maritalStatus: data.marital,
        gender: data.gender,
      };

      await updatePersonalInfo(auth.accessToken, personalInfoData);

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="w-full max-w-[1200px] bg-accent rounded-md p-4 md:p-8 text-white"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl md:text-3xl mb-6 text-center">
        Personal Information
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          label="Name"
          name="name"
          control={control}
          placeholder="Enter Your Name"
          rules={{ required: "Name is required" }}
        />
        <FormField
          label="Employer's Name"
          name="employerName"
          control={control}
          placeholder="Enter Your Employer's Name"
          rules={{ required: "Employer's name is required" }}
        />
        <FormField
          label="Income Per Annum"
          name="income"
          control={control}
          placeholder="₱200,001 - ₱500,000"
          rules={{ required: "Income is required" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          label="Date of Birth"
          name="dateOfBirth"
          control={control}
          type="date"
        />
        <div className="md:col-span-2">
          <FormField
            label="Address"
            name="address"
            control={control}
            placeholder="Enter Your Address"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="City"
          name="city"
          control={control}
          placeholder="Enter Your City Name"
        />
        <FormField
          label="Postal Code / Zip Code"
          name="zipCode"
          control={control}
          placeholder="Enter Your Zip Code"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectField
          label="Country"
          name="country"
          control={control}
          options={countryOptions}
          placeholder="Select Country"
        />
        <SelectField
          label="Citizenship"
          name="citizenship"
          control={control}
          options={nationalityOptions}
          placeholder="Select Citizenship"
        />
        <SelectField
          label="Currency"
          name="currency"
          control={control}
          options={countryOptions}
          placeholder="Select Currency"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Mother's Name"
          name="motherName"
          control={control}
          placeholder="Enter Your Mother's Name"
        />
        <FormField
          label="Income Tax No"
          name="incomeTaxNo"
          control={control}
          placeholder="Enter Income Tax No"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="ID Type"
          name="idType"
          control={control}
          options={nationalIdTypeOptions}
          placeholder="Select ID Type"
        />
        <FormField
          label="ID Number"
          name="idNumber"
          control={control}
          placeholder="Enter ID Number"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          label="Industry"
          name="industry"
          control={control}
          placeholder="Industry"
        />
        <FormField
          label="Occupation"
          name="occupation"
          control={control}
          placeholder="Occupation"
        />
        <FormField
          label="Source of Income"
          name="sourceOfIncome"
          control={control}
          placeholder="Source of Income"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Email"
          name="email"
          control={control}
          type="email"
          placeholder="Email"
        />
        <FormField
          label="Email 2"
          name="email2"
          control={control}
          type="email"
          placeholder="Email 2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          label="Mobile Phone"
          name="mobilePhone"
          control={control}
          placeholder="Mobile Phone"
        />
        <FormField
          label="Phone 2"
          name="phone2"
          control={control}
          placeholder="Phone 2"
        />
        <FormField
          label="Fax No"
          name="faxNumber"
          control={control}
          placeholder="Fax Number"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="Marital Status"
          name="marital"
          control={control}
          options={maritalStatusOptions}
          placeholder="Select Marital Status"
          rules={{ required: "Marital is required" }}
        />
        <SelectField
          label="Gender"
          name="gender"
          control={control}
          options={genderOptions}
          placeholder="Select Gender"
          rules={{ required: "Gender is required" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FileUploadField
          label="Upload Profile Picture"
          name="profilePic"
          setValue={setValue}
          rules={{ required: "Profile picture is required" }}
        />
        <FileUploadField
          label="Upload ID"
          name="personalId"
          setValue={setValue}
          rules={{ required: "ID is required" }}
        />
      </div>

      <button
        type="submit"
        className={`w-full p-3 rounded text-white flex items-center justify-center ${
          isValid
            ? "bg-primary hover:bg-secondary"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!isValid || isLoading}
      >
        {isLoading ? (
          <>
            <FaSpinner className="animate-spin mr-2" />
            Updating...
          </>
        ) : (
          "Update Profile"
        )}
      </button>
    </form>
  );
};

export default KycForm;
