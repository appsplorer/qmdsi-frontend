import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import { countryOptions, nationalityOptions } from "../data/countries";
import {
  genderOptions,
  maritalStatusOptions,
  nationalIdTypeOptions,
} from "../constants/KYC";
import { useNavigate, Link } from "react-router-dom";
import {
  updatePersonalInfo,
  updateProfileImages,
} from "../services/users.service";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import FormField from "./FormField";
import SelectField from "./SelectField";
import FileUploadField from "./FileUploadField";

const KycForm = () => {
  const {
    control: personalInfoControl,
    handleSubmit: handlePersonalInfoSubmit,
    formState: { isValid: isPersonalInfoValid },
  } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();
  const {
    handleSubmit: handleImageUploadSubmit,
    setValue: setImageUploadValue,
    formState: { isValid: isImageUploadValid },
  } = useForm({
    mode: "onChange",
  });

  const { auth } = useContext(AuthContext);
  const [isPersonalInfoLoading, setIsPersonalInfoLoading] = useState(false);
  const [isImageUploadLoading, setIsImageUploadLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const onPersonalInfoSubmit = async (data) => {
    setIsPersonalInfoLoading(true);
    try {
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
      toast.success("Personal information updated successfully!");
      navigate("/verify");
    } catch (error) {
      console.log(error);
      console.error("Error updating personal info:", error);
      if (error?.detail ==="400: Personal Information already exists"){
        toast.success("Personal Information already exists,redirect to verify page");
        navigate("/verify");
      }else{
        toast.error(error?.detail);
      }
    } finally {
      setIsPersonalInfoLoading(false);
    }
  };

  const onImageUploadSubmit = async (data) => {
    setIsImageUploadLoading(true);
    try {
      await updateProfileImages(
        auth.accessToken,
        data.profilePic,
        data.personalId
      );
      toast.success("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images. Please try again.");
    } finally {
      setIsImageUploadLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1200px] bg-accent rounded-md p-4 md:p-8 text-white">
      <h1 className="text-2xl md:text-3xl mb-6 text-center">
        Personal Information
      </h1>

      <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
        <TabList className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-4">
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white
              ${
                selected
                  ? "bg-primary shadow"
                  : "text-white hover:bg-white/[0.12] hover:text-white"
              }`
            }
          >
            Info
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white
              ${
                selected
                  ? "bg-primary shadow"
                  : "text-white hover:bg-white/[0.12] hover:text-white"
              }`
            }
          >
            Image
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <form onSubmit={handlePersonalInfoSubmit(onPersonalInfoSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  label="Name"
                  name="name"
                  control={personalInfoControl}
                  placeholder="Enter Your Name"
                  rules={{ required: "Name is required" }}
                />
                <FormField
                  label="Employer's Name"
                  name="employerName"
                  control={personalInfoControl}
                  placeholder="Enter Your Employer's Name"
                  rules={{ required: "Employer's name is required" }}
                />
                <FormField
                  label="Income Per Annum"
                  name="income"
                  control={personalInfoControl}
                  placeholder="₱200,001 - ₱500,000"
                  rules={{ required: "Income is required" }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  label="Date of Birth"
                  name="dateOfBirth"
                  control={personalInfoControl}
                  type="date"
                />
                <div className="md:col-span-2">
                  <FormField
                    label="Address"
                    name="address"
                    control={personalInfoControl}
                    placeholder="Enter Your Address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="City"
                  name="city"
                  control={personalInfoControl}
                  placeholder="Enter Your City Name"
                />
                <FormField
                  label="Postal Code / Zip Code"
                  name="zipCode"
                  control={personalInfoControl}
                  placeholder="Enter Your Zip Code"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SelectField
                  label="Country"
                  name="country"
                  control={personalInfoControl}
                  options={countryOptions}
                  placeholder="Select Country"
                />
                <SelectField
                  label="Citizenship"
                  name="citizenship"
                  control={personalInfoControl}
                  options={nationalityOptions}
                  placeholder="Select Citizenship"
                />
                <SelectField
                  label="Currency"
                  name="currency"
                  control={personalInfoControl}
                  options={countryOptions}
                  placeholder="Select Currency"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Mother's Name"
                  name="motherName"
                  control={personalInfoControl}
                  placeholder="Enter Your Mother's Name"
                />
                <FormField
                  label="Income Tax No"
                  name="incomeTaxNo"
                  control={personalInfoControl}
                  placeholder="Enter Income Tax No"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField
                  label="ID Type"
                  name="idType"
                  control={personalInfoControl}
                  options={nationalIdTypeOptions}
                  placeholder="Select ID Type"
                />
                <FormField
                  label="ID Number"
                  name="idNumber"
                  control={personalInfoControl}
                  placeholder="Enter ID Number"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  label="Industry"
                  name="industry"
                  control={personalInfoControl}
                  placeholder="Industry"
                />
                <FormField
                  label="Occupation"
                  name="occupation"
                  control={personalInfoControl}
                  placeholder="Occupation"
                />
                <FormField
                  label="Source of Income"
                  name="sourceOfIncome"
                  control={personalInfoControl}
                  placeholder="Source of Income"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Email"
                  name="email"
                  control={personalInfoControl}
                  type="email"
                  placeholder="Email"
                />
                <FormField
                  label="Email 2"
                  name="email2"
                  control={personalInfoControl}
                  type="email"
                  placeholder="Email 2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  label="Mobile Phone"
                  name="mobilePhone"
                  control={personalInfoControl}
                  placeholder="Mobile Phone"
                />
                <FormField
                  label="Phone 2"
                  name="phone2"
                  control={personalInfoControl}
                  placeholder="Phone 2"
                />
                <FormField
                  label="Fax No"
                  name="faxNumber"
                  control={personalInfoControl}
                  placeholder="Fax Number"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField
                  label="Marital Status"
                  name="marital"
                  control={personalInfoControl}
                  options={maritalStatusOptions}
                  placeholder="Select Marital Status"
                  rules={{ required: "Marital status is required" }}
                />
                <SelectField
                  label="Gender"
                  name="gender"
                  control={personalInfoControl}
                  options={genderOptions}
                  placeholder="Select Gender"
                  rules={{ required: "Gender is required" }}
                />
              </div>

              <button
                type="submit"
                className={`w-full p-3 rounded text-white flex items-center justify-center ${
                  isPersonalInfoValid
                    ? "bg-primary hover:bg-secondary"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!isPersonalInfoValid || isPersonalInfoLoading}
              >
                {isPersonalInfoLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Updating...
                  </>
                ) : (
                  "Update Personal Info"
                )}
              </button>
            </form>
          </TabPanel>
          <TabPanel>
            <form onSubmit={handleImageUploadSubmit(onImageUploadSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FileUploadField
                  label="Upload Profile Picture"
                  name="profilePic"
                  setValue={setImageUploadValue}
                />
                <FileUploadField
                  label="Upload ID"
                  name="personalId"
                  setValue={setImageUploadValue}
                />
              </div>

              <button
                type="submit"
                className={`w-full p-3 rounded text-white flex items-center justify-center ${
                  isImageUploadValid
                    ? "bg-primary hover:bg-secondary"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!isImageUploadValid || isImageUploadLoading}
              >
                {isImageUploadLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Uploading...
                  </>
                ) : (
                  "Upload Images"
                )}
              </button>
            </form>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default KycForm;
