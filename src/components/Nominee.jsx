import { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { countryOptions } from "../data/countries";
import { nationalIdTypeOptions } from "../constants/KYC";
import {
  updateNomineeInfo,
  updateNomineeImages,
} from "../services/nominee.service";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import { customStyles } from "../styles";

const Nominee = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useContext(AuthContext);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (data.idFile) {
        const formData = new FormData();
        formData.append("id_picture", data.idFile[0]);
        await updateNomineeImages(formData);
      }

      const nomineeData = {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        address: data.address,
        city: data.city,
        postalCode: data.zipCode,
        country: data.country,
        relationshipToTestator: data.relation,
        contactInfo: data.contactInfo,
        idType: data.idType,
        idNumber: parseInt(data.idNumber, 10),
      };

      await updateNomineeInfo(auth.accessToken, nomineeData);

      toast.success("KYC submitted successfully!");
    } catch (error) {
      console.error("Error updating nominee information:", error);
      toast.error("Failed to submit KYC. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="w-full max-w-[1200px] bg-accent rounded-md p-4 md:p-8 text-white"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl mt-6 md:mt-12 text-center">
          Nominee Information
        </h1>

        {/* First Name, Middle, Last */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="w-full md:w-1/3">
            <label className="block text-sm mb-2" htmlFor="firstName">
              First Name
            </label>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: "First Name is required" }}
              render={({ field }) => (
                <>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    placeholder="Enter Nominee's First Name"
                    {...field}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div className="w-full md:w-1/3 mt-3 md:mt-0">
            <label className="block text-sm mb-2" htmlFor="middleName">
              Middle Name
            </label>
            <Controller
              name="middleName"
              control={control}
              rules={{ required: "Middle Name is required" }}
              render={({ field }) => (
                <>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    placeholder="Enter Nominee's Middle Name"
                    {...field}
                  />
                  {errors.middleName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.middleName.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div className="w-full md:w-1/3 mt-3 md:mt-0">
            <label className="block text-sm mb-2" htmlFor="lastName">
              Last Name
            </label>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: "Last Name is required" }}
              render={({ field }) => (
                <>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    placeholder="Enter Nominee's Last Name"
                    {...field}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        </div>

        {/* DOB, Address */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="w-full md:w-1/3">
            <label className="block text-sm mb-2" htmlFor="dateOfBirth">
              Date Of Birth
            </label>
            <Controller
              name="dateOfBirth"
              control={control}
              rules={{ required: "Date of Birth is required" }}
              render={({ field }) => (
                <>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="date"
                    {...field}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div className="w-full md:w-2/3 mt-3 md:mt-0">
            <label className="block text-sm mb-2" htmlFor="address">
              Address
            </label>
            <Controller
              name="address"
              control={control}
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <>
                  <textarea
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    placeholder="Enter Your Address"
                    rows={2}
                    {...field}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        </div>

        {/* City, Postal Code, Country */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="w-full md:w-1/3">
            <label className="block text-sm mb-2" htmlFor="city">
              City
            </label>
            <Controller
              name="city"
              control={control}
              rules={{ required: "City is required" }}
              render={({ field }) => (
                <>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    placeholder="Enter Nominee's City Name"
                    {...field}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div className="w-full md:w-1/3 mt-3 md:mt-0">
            <label className="block text-sm mb-2" htmlFor="zipCode">
              Postal Code / Zip Code
            </label>
            <Controller
              name="zipCode"
              control={control}
              rules={{ required: "Postal Code/Zip Code is required" }}
              render={({ field }) => (
                <>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    placeholder="Enter Postal/Zip Code"
                    {...field}
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.zipCode.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div className="w-full md:w-1/3 mt-3 md:mt-0">
            <label className="block text-sm mb-2" htmlFor="country">
              Country
            </label>
            <Controller
              name="country"
              control={control}
              rules={{ required: "Country is required" }}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    options={countryOptions}
                    onChange={(option) => field.onChange(option)}
                    styles={customStyles}
                    placeholder="Select Country"
                    value={field.value}
                  />
                  {errors.country && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.country.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        </div>

        {/* Relationship, Contact Info */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="w-full md:w-1/2">
            <label className="block text-sm mb-2" htmlFor="relation">
              Relationship to Testator
            </label>
            <Controller
              name="relation"
              control={control}
              rules={{ required: "Relationship is required" }}
              render={({ field }) => (
                <>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    placeholder="Enter Relationship to Testator"
                    {...field}
                  />
                  {errors.relation && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.relation.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div className="w-full md:w-1/2 mt-3 md:mt-0">
            <label className="block text-sm mb-2" htmlFor="contactInfo">
              Contact Info
            </label>
            <Controller
              name="contactInfo"
              control={control}
              rules={{ required: "Contact Info is required" }}
              render={({ field }) => (
                <>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    placeholder="Enter Contact Information"
                    {...field}
                  />
                  {errors.contactInfo && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.contactInfo.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        </div>

        {/* ID Type, ID Number */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="w-full md:w-1/2">
            <label className="block text-sm mb-2" htmlFor="idType">
              ID Type
            </label>
            <Controller
              name="idType"
              control={control}
              rules={{ required: "ID Type is required" }}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    options={nationalIdTypeOptions}
                    onChange={(option) => field.onChange(option)}
                    styles={customStyles}
                    placeholder="Select ID Type"
                    value={field.value} // Ensure the selected value is controlled
                  />
                  {errors.idType && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.idType.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div className="w-full md:w-1/2 mt-3 md:mt-0">
            <label className="block text-sm mb-2" htmlFor="idNumber">
              ID Number
            </label>
            <Controller
              name="idNumber"
              control={control}
              rules={{ required: "ID Number is required" }}
              render={({ field }) => (
                <>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    placeholder="Enter ID Number"
                    {...field}
                  />
                  {errors.idNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.idNumber.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        </div>

        {/* ID File */}
        <div>
          <label className="block text-sm mb-2" htmlFor="idFile">
            ID File
          </label>
          <Controller
            name="idFile"
            control={control}
            render={({ field }) => (
              <input
                className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                type="file"
                accept="image/*"
                {...field}
              />
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className={`w-full bg-primary p-3 rounded text-white hover:bg-secondary flex items-center justify-center ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              "Submit KYC"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Nominee;
