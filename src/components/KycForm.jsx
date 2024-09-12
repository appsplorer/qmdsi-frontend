/* eslint-disable react/no-unescaped-entities */
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import Select from "react-select";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import {
  updatePersonalInfo,
  getUserPersonalInfo,
  updateProfileImages,
} from "../services/users.service";
import {
  genderOptions,
  maritalStatusOptions,
  nationalIdTypeOptions,
} from "../constants/KYC";
import { countryOptions, nationalityOptions } from "../data/countries";
import { customStyles } from "../styles";

const KycForm = () => {
  const [defaultValues, setDefaultValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isPersonalInfoLoading, setIsPersonalInfoLoading] = useState(false);
  const [isImageUploadLoading, setIsImageUploadLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const { auth, profile } = useContext(AuthContext);
  const navigate = useNavigate();

  const splitFullName = (fullName) => {
    const nameParts = fullName.split(" ");
    return {
      firstName: nameParts[0] || "",
      middleName: nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "",
      lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : "",
    };
  };

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const data = await getUserPersonalInfo(auth.accessToken);
        const { firstName, middleName, lastName } = splitFullName(
          profile.fullName
        );
        setDefaultValues({
          firstName,
          middleName,
          lastName,
          employeeName: data.employee_name || "",
          income: data.income_per_annum?.toString() || "",
          dateOfBirth: data.date_of_birth || "",
          address: data.address || "",
          city: data.city || "",
          zipCode: data.postal_code || "",
          motherName: data.mother_name || "",
          incomeTaxNo: data.income_tax_no || "",
          country: data.country || "",
          citizenship: data.citizenship || "",
          currency: data.currency || "",
          idType: data.id_type || "",
          idNumber: data.id_number || "",
          industry: data.industry || "",
          occupation: data.occupation || "",
          sourceOfIncome: data.source_of_income || "",
          mobilePhone: data.mobile_phone || "",
          phone2: data.phone_2 || "",
          faxNumber: data.fax_no || "",
          marital: data.marital_status || "",
          gender: data.gender || "",
        });
      } catch (error) {
        console.error("Error fetching personal info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPersonalInfo();
  }, [auth.accessToken]);

  const handlePersonalInfoSubmit = async (event) => {
    event.preventDefault();
    setIsPersonalInfoLoading(true);
    try {
      const personalInfoData = {
        name: defaultValues.name,
        employeeName: defaultValues.employeeName,
        incomePerAnnum: parseFloat(defaultValues.income),
        dateOfBirth: defaultValues.dateOfBirth,
        address: defaultValues.address,
        city: defaultValues.city,
        postalCode: defaultValues.zipCode,
        country: defaultValues.country,
        citizenship: defaultValues.citizenship,
        currency: defaultValues.currency,
        idType: defaultValues.idType,
        motherName: defaultValues.motherName,
        incomeTaxNo: defaultValues.incomeTaxNo,
        idNumber: defaultValues.idNumber,
        industry: defaultValues.industry,
        occupation: defaultValues.occupation,
        sourceOfIncome: defaultValues.sourceOfIncome,
        mobilePhone: defaultValues.mobilePhone,
        phone2: defaultValues.phone2,
        faxNo: defaultValues.faxNumber,
        maritalStatus: defaultValues.marital,
        gender: defaultValues.gender,
      };

      await updatePersonalInfo(auth.accessToken, personalInfoData);
      toast.success("Personal information updated!");
      setSelectedTab(1);
    } catch (error) {
      console.error("Error updating personal info:", error);
      toast.error(error?.detail || "Failed to update personal information");
    } finally {
      setIsPersonalInfoLoading(false);
    }
  };

  const handleImageUploadSubmit = async (event) => {
    event.preventDefault();
    setIsImageUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append("profilePic", defaultValues.profilePic);
      formData.append("personalId", defaultValues.personalId);

      await updateProfileImages(auth.accessToken, formData);
      toast.success("Images uploaded successfully!");
      navigate("/verify");
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images. Please try again.");
    } finally {
      setIsImageUploadLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="w-full max-w-[1200px] bg-accent rounded-md p-4 md:p-8 text-white">
      <h1 className="text-2xl md:text-3xl mt-6 md:mt-12 text-center mb-6">
        KYC Form
      </h1>

      <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
        <TabList className="flex mb-4">
          <Tab
            className={({ selected }) =>
              `flex-1 py-2 ${selected ? "bg-primary" : "bg-gray-600"}`
            }
          >
            Personal Information
          </Tab>
          <Tab
            className={({ selected }) =>
              `flex-1 py-2 ${selected ? "bg-primary" : "bg-gray-600"}`
            }
          >
            Upload Images
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <form onSubmit={handlePersonalInfoSubmit} className="space-y-6">
              {/* Name, Employee Name */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full md:w-1/3">
                  <label className="block text-sm mb-2">First Name</label>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    value={defaultValues.firstName}
                    disabled
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <label className="block text-sm mb-2">Middle Name</label>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    value={defaultValues.middleName}
                    disabled
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <label className="block text-sm mb-2">Last Name</label>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    value={defaultValues.lastName}
                    disabled
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block text-sm mb-2">Employee Name</label>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    value={defaultValues.employeeName}
                    onChange={(e) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        employeeName: e.target.value,
                      }))
                    }
                    placeholder="Enter Employee Name"
                  />
                </div>
              </div>

              {/* Income, Date of Birth */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full md:w-1/2">
                  <label className="block text-sm mb-2">Income</label>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="number"
                    value={defaultValues.income}
                    onChange={(e) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        income: e.target.value,
                      }))
                    }
                    placeholder="Enter Annual Income"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block text-sm mb-2">Date of Birth</label>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="date"
                    value={defaultValues.dateOfBirth}
                    onChange={(e) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        dateOfBirth: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Address, City, Postal Code */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full md:w-1/2">
                  <label className="block text-sm mb-2">Address</label>
                  <textarea
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    rows={2}
                    value={defaultValues.address}
                    onChange={(e) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    placeholder="Enter Your Address"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block text-sm mb-2">City</label>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    value={defaultValues.city}
                    onChange={(e) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        city: e.target.value,
                      }))
                    }
                    placeholder="Enter Your City"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full md:w-1/2">
                  <label className="block text-sm mb-2">Postal Code</label>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    value={defaultValues.zipCode}
                    onChange={(e) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        zipCode: e.target.value,
                      }))
                    }
                    placeholder="Enter Postal Code"
                  />
                </div>
              </div>

              {/* Mother Name, Income Tax Number */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full md:w-1/2">
                  <label className="block text-sm mb-2">Mother's Name</label>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    value={defaultValues.motherName}
                    onChange={(e) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        motherName: e.target.value,
                      }))
                    }
                    placeholder="Enter Mother's Name"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block text-sm mb-2">
                    Income Tax Number
                  </label>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    value={defaultValues.incomeTaxNo}
                    onChange={(e) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        incomeTaxNo: e.target.value,
                      }))
                    }
                    placeholder="Enter Income Tax Number"
                  />
                </div>
              </div>

              {/* Country, Nationality */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full md:w-1/2">
                  <label className="block text-sm mb-2">Country</label>
                  <Select
                    options={countryOptions}
                    value={countryOptions.find(
                      (option) => option.value === defaultValues.country
                    )}
                    onChange={(selectedOption) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        country: selectedOption.value,
                      }))
                    }
                    styles={customStyles}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block text-sm mb-2">Citizenship</label>
                  <Select
                    options={nationalityOptions}
                    value={nationalityOptions.find(
                      (option) => option.value === defaultValues.citizenship
                    )}
                    onChange={(selectedOption) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        citizenship: selectedOption.value,
                      }))
                    }
                    styles={customStyles}
                  />
                </div>
              </div>

              {/* Currency, National ID Type */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full md:w-1/2">
                  <label className="block text-sm mb-2">Currency</label>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    value={defaultValues.currency}
                    onChange={(e) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        currency: e.target.value,
                      }))
                    }
                    placeholder="Enter Currency"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block text-sm mb-2">ID Type</label>
                  <Select
                    options={nationalIdTypeOptions}
                    value={nationalIdTypeOptions.find(
                      (option) => option.value === defaultValues.idType
                    )}
                    onChange={(selectedOption) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        idType: selectedOption.value,
                      }))
                    }
                    styles={customStyles}
                  />
                </div>
              </div>

              {/* ID Number, Industry */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full md:w-1/2">
                  <label className="block text-sm mb-2">ID Number</label>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    value={defaultValues.idNumber}
                    onChange={(e) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        idNumber: e.target.value,
                      }))
                    }
                    placeholder="Enter ID Number"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block text-sm mb-2">Industry</label>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    value={defaultValues.industry}
                    onChange={(e) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        industry: e.target.value,
                      }))
                    }
                    placeholder="Enter Industry"
                  />
                </div>
              </div>

              {/* Occupation, Source of Income */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full md:w-1/2">
                  <label className="block text-sm mb-2">Occupation</label>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    value={defaultValues.occupation}
                    onChange={(e) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        occupation: e.target.value,
                      }))
                    }
                    placeholder="Enter Occupation"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block text-sm mb-2">Source of Income</label>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    value={defaultValues.sourceOfIncome}
                    onChange={(e) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        sourceOfIncome: e.target.value,
                      }))
                    }
                    placeholder="Enter Source of Income"
                  />
                </div>
              </div>

              {/* Mobile Phone, Phone 2 */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full md:w-1/2">
                  <label className="block text-sm mb-2">Mobile Phone</label>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    value={defaultValues.mobilePhone}
                    onChange={(e) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        mobilePhone: e.target.value,
                      }))
                    }
                    placeholder="Enter Mobile Phone"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block text-sm mb-2">Phone 2</label>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    value={defaultValues.phone2}
                    onChange={(e) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        phone2: e.target.value,
                      }))
                    }
                    placeholder="Enter Phone 2"
                  />
                </div>
              </div>

              {/* Fax Number, Marital Status */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full md:w-1/2">
                  <label className="block text-sm mb-2">Fax Number</label>
                  <input
                    className="w-full bg-background p-3 rounded border-0 outline-none text-primary"
                    type="text"
                    value={defaultValues.faxNumber}
                    onChange={(e) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        faxNumber: e.target.value,
                      }))
                    }
                    placeholder="Enter Fax Number"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block text-sm mb-2">Marital Status</label>
                  <Select
                    options={maritalStatusOptions}
                    value={maritalStatusOptions.find(
                      (option) => option.value === defaultValues.marital
                    )}
                    onChange={(selectedOption) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        marital: selectedOption.value,
                      }))
                    }
                    styles={customStyles}
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="w-full">
                <label className="block text-sm mb-2">Gender</label>
                <Select
                  options={genderOptions}
                  value={genderOptions.find(
                    (option) => option.value === defaultValues.gender
                  )}
                  onChange={(selectedOption) =>
                    setDefaultValues((prev) => ({
                      ...prev,
                      gender: selectedOption.value,
                    }))
                  }
                  styles={customStyles}
                />
              </div>

              <button
                type="submit"
                className="bg-primary text-white p-3 rounded mt-6 w-full"
                disabled={isPersonalInfoLoading}
              >
                {isPersonalInfoLoading ? (
                  <FaSpinner className="animate-spin mx-auto" />
                ) : (
                  "Save Personal Information"
                )}
              </button>
            </form>
          </TabPanel>
          <TabPanel>
            <form onSubmit={handleImageUploadSubmit} className="space-y-6">
              <div className="w-full">
                <label className="block text-sm mb-2">Profile Picture</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setDefaultValues((prev) => ({
                      ...prev,
                      profilePic: e.target.files[0],
                    }))
                  }
                  className="file-input"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm mb-2">Personal ID</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setDefaultValues((prev) => ({
                      ...prev,
                      personalId: e.target.files[0],
                    }))
                  }
                  className="file-input"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm mb-2">Proof of Address</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setDefaultValues((prev) => ({
                      ...prev,
                      proofOfAddress: e.target.files[0],
                    }))
                  }
                  className="file-input"
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-white p-3 rounded w-full"
                disabled={isImageUploadLoading}
              >
                {isImageUploadLoading ? (
                  <FaSpinner className="animate-spin mx-auto" />
                ) : (
                  "Upload Documents"
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
