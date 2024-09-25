import { useState, useContext, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import {updateImages, updateNomineeInfo, getUserNominee } from "../services/nominee.service";
import { countryOptions } from "../data/countries";
import { nationalIdTypeOptions } from "../constants/KYC";
import { customStyles } from "../styles";
import { useNavigate } from "react-router-dom";

const Nominee = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    firstName: null,
    middleName: null,
    lastName: null,
    dateOfBirth: null,
    address: null,
    city: null,
    zipCode: null,
    country: null,
    relation: null,
    contactInfo: null,
    idType: null,
    idNumber: null,
    idFile: null,
  });
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchNomineeData = async () => {
      try {
        const data = await getUserNominee(auth.accessToken);
        setFormValues({
          firstName: data.firstName || null,
          middleName: data.middleName || null,
          lastName: data.lastName || null,
          dateOfBirth: data.dateOfBirth || null,
          address: data.address || null,
          city: data.city || null,
          zipCode: data.postalCode || null,
          country: data.country || null,
          relation: data.relationshipToTestator || null,
          contactInfo: data.contactInfo || null,
          idType: data.idType || null,
          idNumber: data.idNumber ? data.idNumber.toString() : null,
          idFile: null,
        });
      } catch (error) {
        console.error("Error fetching nominee info:", error);
      }
    };

    fetchNomineeData();
  }, [auth.accessToken]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value || null,
    }));
  };

  const handleSelectChange = (name) => (selectedOption) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : null,
    }));
  };

  const onSubmitInfo = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const nomineeData = {
        firstName: formValues.firstName || "",
        middleName: formValues.middleName || "",
        lastName: formValues.lastName || "",
        dateOfBirth: formValues.dateOfBirth || "",
        address: formValues.address || "",
        city: formValues.city || "",
        postalCode: formValues.zipCode || "",
        country: formValues.country || "",
        relationshipToTestator: formValues.relation || "",
        contactInfo: formValues.contactInfo || "",
        idType: formValues.idType || "",
        idNumber: formValues.idNumber
      };
      await updateNomineeInfo(auth.accessToken, nomineeData);
      toast.success("Nominee information submitted!");
      setActiveTab("image");
    } catch (error) {
      console.error("Error updating nominee information:", error);
      toast.error(error.response.data.detail || "Failed to update nominee information");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitImage = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (formValues.idFile) {
        // Assume some upload logic here
        await updateImages(auth.accessToken, 
          formValues.idFile
        )
        setTimeout(() => {
          toast.success("Nominee ID image uploaded successfully!");
          setIsLoading(false);
        }, 2000);
        navigate("/profile");
      } else {
        toast.error("Please select an image file to upload.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error uploading nominee ID image:", error.response.data.detail);
      toast.error(error.response.data.detail);
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
        <form onSubmit={onSubmitInfo} className="space-y-6">
          {/* First Name, Middle Name, Last Name */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-1/3">
              <label className="block text-sm mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                name="firstName"
                value={formValues.firstName || ""}
                onChange={handleChange}
                className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                type="text"
                placeholder="Enter Nominee's First Name"
                required
              />
            </div>
            <div className="w-full md:w-1/3">
              <label className="block text-sm mb-2" htmlFor="middleName">
                Middle Name
              </label>
              <input
                name="middleName"
                value={formValues.middleName || ""}
                onChange={handleChange}
                className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                type="text"
                placeholder="Enter Nominee's Middle Name"
                required
              />
            </div>
            <div className="w-full md:w-1/3">
              <label className="block text-sm mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                name="lastName"
                value={formValues.lastName || ""}
                onChange={handleChange}
                className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                type="text"
                placeholder="Enter Nominee's Last Name"
                required
              />
            </div>
          </div>

          {/* Date of Birth, Address */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-1/3">
              <label className="block text-sm mb-2" htmlFor="dateOfBirth">
                Date of Birth
              </label>
              <input
                name="dateOfBirth"
                value={formValues.dateOfBirth || ""}
                onChange={handleChange}
                className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                type="date"
                required
              />
            </div>
            <div className="w-full md:w-2/3">
              <label className="block text-sm mb-2" htmlFor="address">
                Address
              </label>
              <textarea
                name="address"
                value={formValues.address || ""}
                onChange={handleChange}
                className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                rows={2}
                placeholder="Enter Nominee's Address"
                required
              />
            </div>
          </div>

          {/* City, Postal Code, Country */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-1/3">
              <label className="block text-sm mb-2" htmlFor="city">
                City
              </label>
              <input
                name="city"
                value={formValues.city || ""}
                onChange={handleChange}
                className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                type="text"
                placeholder="Enter Nominee's City"
                required
              />
            </div>
            <div className="w-full md:w-1/3">
              <label className="block text-sm mb-2" htmlFor="zipCode">
                Postal Code
              </label>
              <input
                name="zipCode"
                value={formValues.zipCode || ""}
                onChange={handleChange}
                className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                type="text"
                placeholder="Enter Nominee's Postal Code"
                required
              />
            </div>
            <div className="w-full md:w-1/3">
              <label className="block text-sm mb-2" htmlFor="country">
                Country
              </label>
              <Select
                name="country"
                value={
                  countryOptions.find(
                    (option) => option.value === formValues.country
                  ) || null
                }
                onChange={handleSelectChange("country")}
                options={countryOptions}
                styles={customStyles}
                placeholder="Select Country"
                required
              />
            </div>
          </div>

          {/* Relation, Contact Info */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-1/2">
              <label className="block text-sm mb-2" htmlFor="relation">
                Relation to Testator
              </label>
              <input
                name="relation"
                value={formValues.relation || ""}
                onChange={handleChange}
                className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                type="text"
                placeholder="Enter Relation to Testator"
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="block text-sm mb-2" htmlFor="contactInfo">
                Contact Information
              </label>
              <input
                name="contactInfo"
                value={formValues.contactInfo || ""}
                onChange={handleChange}
                className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                type="text"
                placeholder="Enter Contact Information"
                required
              />
            </div>
          </div>

          {/* ID Type, ID Number */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-1/2">
              <label className="block text-sm mb-2" htmlFor="idType">
                ID Type
              </label>
              <Select
                name="idType"
                value={
                  nationalIdTypeOptions.find(
                    (option) => option.value === formValues.idType
                  ) || null
                }
                onChange={handleSelectChange("idType")}
                options={nationalIdTypeOptions}
                styles={customStyles}
                placeholder="Select ID Type"
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="block text-sm mb-2" htmlFor="idNumber">
                ID Number
              </label>
              <input
                name="idNumber"
                value={formValues.idNumber || ""}
                onChange={handleChange}
                className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                type="text"
                placeholder="Enter ID Number"
                required
              />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="px-8 py-2 bg-primary text-white rounded"
              disabled={isLoading}
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : "Save"}
            </button>
          </div>
        </form>
      )}

      {activeTab === "image" && (
        <form onSubmit={onSubmitImage} className="space-y-6">
          <div>
            <label className="block text-sm mb-2" htmlFor="idFile">
              Upload ID Image
            </label>
            <input
              name="idFile"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm"
            />
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="px-8 py-2 bg-primary text-white rounded"
              disabled={isLoading}
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : "Upload"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Nominee;
