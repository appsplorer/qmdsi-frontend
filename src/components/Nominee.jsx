import { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import {
  updateNomineeInfo,
  updateNomineeImages,
} from "../services/nominee.service";
import { countryOptions } from "../data/countries";
import { nationalIdTypeOptions } from "../constants/KYC";
import { customStyles } from "../styles";

const Nominee = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitInfo = async (data) => {
    setIsLoading(true);
    try {
      const nomineeData = {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        address: data.address,
        city: data.city,
        postalCode: data.zipCode,
        country: data.country.value,
        relationshipToTestator: data.relation,
        contactInfo: data.contactInfo,
        idType: data.idType.value,
        idNumber: parseInt(data.idNumber, 10),
      };

      await updateNomineeInfo(auth.accessToken, nomineeData);
      toast.success("Nominee information submitted successfully!");
      setActiveTab("image");
    } catch (error) {
      console.log(error);
      console.error("Error updating nominee information:", error);
      toast.error(error?.detail);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitImage = async (data) => {
    setIsLoading(true);
    try {
      if (data.idFile && data.idFile.length > 0) {
        const formData = new FormData();
        formData.append("id_picture", data.idFile[0]);
        await updateNomineeImages(auth.accessToken, formData);
        toast.success("Nominee ID image uploaded successfully!");
      } else {
        toast.error("Please select an image file to upload.");
      }
    } catch (error) {
      console.error("Error uploading nominee ID image:", error);
      toast.error("Failed to upload nominee ID image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1200px] bg-accent rounded-md p-4 md:p-8 text-white">
      <h1 className="text-2xl md:text-3xl mt-6 md:mt-12 text-center mb-6">
        Nominee KYC
      </h1>

      <div className="flex mb-4">
        <button
          className={`flex-1 py-2 ${
            activeTab === "info" ? "bg-primary" : "bg-gray-600"
          }`}
          onClick={() => setActiveTab("info")}
        >
          Nominee Information
        </button>
        <button
          className={`flex-1 py-2 ${
            activeTab === "image" ? "bg-primary" : "bg-gray-600"
          }`}
          onClick={() => setActiveTab("image")}
        >
          Upload ID Image
        </button>
      </div>

      {activeTab === "info" && (
        <form onSubmit={handleSubmit(onSubmitInfo)} className="space-y-6">
          {/* First Name, Middle Name, Last Name */}
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
                  <input
                    {...field}
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    placeholder="Enter Nominee's First Name"
                  />
                )}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="w-full md:w-1/3">
              <label className="block text-sm mb-2" htmlFor="middleName">
                Middle Name
              </label>
              <Controller
                name="middleName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    placeholder="Enter Nominee's Middle Name"
                  />
                )}
              />
            </div>
            <div className="w-full md:w-1/3">
              <label className="block text-sm mb-2" htmlFor="lastName">
                Last Name
              </label>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: "Last Name is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    placeholder="Enter Nominee's Last Name"
                  />
                )}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Date of Birth, Address */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-1/3">
              <label className="block text-sm mb-2" htmlFor="dateOfBirth">
                Date of Birth
              </label>
              <Controller
                name="dateOfBirth"
                control={control}
                rules={{ required: "Date of Birth is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="date"
                  />
                )}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>
            <div className="w-full md:w-2/3">
              <label className="block text-sm mb-2" htmlFor="address">
                Address
              </label>
              <Controller
                name="address"
                control={control}
                rules={{ required: "Address is required" }}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    rows={2}
                    placeholder="Enter Nominee's Address"
                  />
                )}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.address.message}
                </p>
              )}
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
                  <input
                    {...field}
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    placeholder="Enter Nominee's City"
                  />
                )}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div className="w-full md:w-1/3">
              <label className="block text-sm mb-2" htmlFor="zipCode">
                Postal Code
              </label>
              <Controller
                name="zipCode"
                control={control}
                rules={{ required: "Postal Code is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    placeholder="Enter Postal Code"
                  />
                )}
              />
              {errors.zipCode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.zipCode.message}
                </p>
              )}
            </div>
            <div className="w-full md:w-1/3">
              <label className="block text-sm mb-2" htmlFor="country">
                Country
              </label>
              <Controller
                name="country"
                control={control}
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={countryOptions}
                    styles={customStyles}
                    placeholder="Select Country"
                  />
                )}
              />
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.country.message}
                </p>
              )}
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
                  <input
                    {...field}
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    placeholder="Enter Relationship to Testator"
                  />
                )}
              />
              {errors.relation && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.relation.message}
                </p>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <label className="block text-sm mb-2" htmlFor="contactInfo">
                Contact Info
              </label>
              <Controller
                name="contactInfo"
                control={control}
                rules={{ required: "Contact Info is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    placeholder="Enter Contact Information"
                  />
                )}
              />
              {errors.contactInfo && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.contactInfo.message}
                </p>
              )}
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
                  <Select
                    {...field}
                    options={nationalIdTypeOptions}
                    styles={customStyles}
                    placeholder="Select ID Type"
                  />
                )}
              />
              {errors.idType && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.idType.message}
                </p>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <label className="block text-sm mb-2" htmlFor="idNumber">
                ID Number
              </label>
              <Controller
                name="idNumber"
                control={control}
                rules={{ required: "ID Number is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    placeholder="Enter ID Number"
                  />
                )}
              />
              {errors.idNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.idNumber.message}
                </p>
              )}
            </div>
          </div>

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
              "Submit Nominee Information"
            )}
          </button>
        </form>
      )}

      {activeTab === "image" && (
        <form onSubmit={handleSubmit(onSubmitImage)} className="space-y-6">
          <div>
            <label className="block text-sm mb-2" htmlFor="idFile">
              ID File
            </label>
            <Controller
              name="idFile"
              control={control}
              rules={{ required: "ID File is required" }}
              render={({ field }) => (
                <input
                  className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              )}
            />
            {errors.idFile && (
              <p className="text-red-500 text-xs mt-1">
                {errors.idFile.message}
              </p>
            )}
          </div>

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
                Uploading...
              </>
            ) : (
              "Upload ID Image"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default Nominee;
