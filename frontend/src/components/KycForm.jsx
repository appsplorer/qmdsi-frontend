import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
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
import { Form } from "antd";
import TextInput from "./ui/input";
import CustomDatePicker from "./ui/datePicker";
import TextareaInput from "./ui/textArea";
import SelectInput from "./ui/select";
import Loading from "./Loading";

const KycForm = () => {
  const [form] = Form.useForm();
  const [defaultValues, setDefaultValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isPersonalInfoLoading, setIsPersonalInfoLoading] = useState(false);
  const [isImageUploadLoading, setIsImageUploadLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const { auth, profile } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        let data = await getUserPersonalInfo(auth.accessToken);
        data = data ? data : {};
        console.log(data);
        setDefaultValues({
          firstName: profile.first_name || "",
          middleName: profile.middle_name || "",
          lastName: profile.last_name || "",
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
        firstName: profile.firstName,
        middleName: profile.middleName,
        lastName: profile.lastName,

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
      console.log(personalInfoData);
      await updatePersonalInfo(auth.accessToken, personalInfoData);
      toast.success("Personal information updated!");
      form.resetFields();
      setSelectedTab(1);
    } catch (error) {
      console.error("Error updating personal info:", error);
      toast.error(
        error.response.data.detail || "Failed to update personal information"
      );
    } finally {
      setIsPersonalInfoLoading(false);
    }
  };

  const handleImageUploadSubmit = async (event) => {
    event.preventDefault();
    setIsImageUploadLoading(true);
    try {
      await updateProfileImages(
        auth.accessToken,
        defaultValues.profilePic,
        defaultValues.personalId,
        defaultValues.proofOfAddress
      );
      toast.success("Images uploaded successfully!");
      navigate("/verify");
    } catch (error) {
      console.error("Error uploading images:", error.response.data.detail);
      toast.error(error.response.data.detail);
    } finally {
      setIsImageUploadLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full px-4 md:px-10 pb-5 flex flex-col gap-5">
      {isPersonalInfoLoading && <Loading />}
      <div className="w-full relative z-20">
        <div className="flex flex-col gap-4 mb-7">
          <h1 className="text-5xl md:text-7xl text-white font-medium">
            KYC Form
          </h1>
          <span className="text-xl md:text-2xl text-white font-semibold tracking-wide">
            Complete Your Profile
          </span>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-5 w-full">
          <div className="w-full flex flex-col md:flex-row gap-14 md:gap-24">
            <div className="w-full py-7 px-5 blur-bg border border-ash/20 rounded-md flex flex-col gap-4">
              <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
                <TabList className="flex mb-8">
                  <Tab
                    className={({ selected }) =>
                      `flex-1 py-2 ${
                        selected
                          ? "bg-golden text-white"
                          : "bg-gray-600 text-white"
                      }`
                    }
                  >
                    Personal Information
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      `flex-1 py-2 ${
                        selected
                          ? "bg-golden text-white"
                          : "bg-gray-600 text-white"
                      }`
                    }
                  >
                    Upload Images
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Form
                      form={form}
                      initialValues={defaultValues}
                      layout="vertical"
                      onFinish={handlePersonalInfoSubmit}
                      className="space-y-6 text-white"
                    >
                      {/* Name, Employee Name */}
                      <div className="flex flex-col md:flex-row flex-wrap gap-3">
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "First Name is required",
                            },
                          ]}
                          className="flex-1 mb-1"
                          label="First Name"
                          name="firstName"
                        >
                          <TextInput />
                        </Form.Item>
                        <Form.Item
                          className="flex-1 mb-1"
                          label="Middle Name"
                          name="middleName"
                          rules={[
                            {
                              required: true,
                              message: "Middle Name is required",
                            },
                          ]}
                        >
                          <TextInput />
                        </Form.Item>
                        <Form.Item
                          className="flex-1 mb-1"
                          label="Last Name"
                          name="lastName"
                          rules={[
                            {
                              required: true,
                              message: "Last Name is required",
                            },
                          ]}
                        >
                          <TextInput />
                        </Form.Item>
                        <Form.Item
                          className="flex-1 mb-1"
                          label="Employee Name"
                          name="employeeName"
                          rules={[
                            {
                              required: true,
                              message: "Employee Name is required",
                            },
                          ]}
                        >
                          <TextInput placeholder="Enter Employee Name" />
                        </Form.Item>
                      </div>

                      {/* Income, Date of Birth */}
                      <div className="flex flex-col md:flex-row gap-3">
                        <Form.Item
                          className="flex-1 mb-1"
                          label="Income"
                          name="income"
                          rules={[
                            { required: true, message: "Income is required" },
                          ]}
                        >
                          <TextInput
                            type="number"
                            placeholder="Enter Annual Income"
                          />
                        </Form.Item>
                        <Form.Item
                          className="flex-1 mb-1"
                          label="Date of Birth"
                          name="dateOfBirth"
                          rules={[
                            {
                              required: true,
                              message: "Date of Birth is required",
                            },
                          ]}
                        >
                          <CustomDatePicker />
                        </Form.Item>
                      </div>

                      {/* Address, City, Postal Code */}
                      <div className="flex flex-col md:flex-row gap-3">
                        <Form.Item
                          className="flex-1 mb-1"
                          label="Address"
                          name="address"
                          rules={[
                            { required: true, message: "Address is required" },
                          ]}
                        >
                          <TextareaInput
                            rows={2}
                            placeholder="Enter your Address"
                          />
                        </Form.Item>
                        <Form.Item
                          className="flex-1 mb-1"
                          label="City"
                          name="city"
                          rules={[
                            { required: true, message: "City is required" },
                          ]}
                        >
                          <TextInput placeholder="Enter your City" />
                        </Form.Item>
                      </div>
                      <div className="flex flex-col md:flex-row gap-3">
                        <Form.Item
                          className="w-1/2 mb-1"
                          label="Postal Code"
                          name="zipCode"
                          rules={[
                            {
                              required: true,
                              message: "Postal Code is required",
                            },
                          ]}
                        >
                          <TextInput placeholder="Enter your Postal Code" />
                        </Form.Item>
                      </div>

                      {/* Mother Name, Income Tax Number */}
                      <div className="flex flex-col md:flex-row gap-3">
                        <Form.Item
                          className="flex-1 mb-1"
                          label="Mother's Name"
                          name="motherName"
                          rules={[
                            {
                              required: true,
                              message: "Mother's Name is required",
                            },
                          ]}
                        >
                          <TextInput placeholder="Enter Mother's Name" />
                        </Form.Item>
                        <Form.Item
                          className="flex-1 mb-1"
                          label="Income Tax Number"
                          name="incomeTaxNo"
                          rules={[
                            {
                              required: true,
                              message: "Income Tax Number is required",
                            },
                          ]}
                        >
                          <TextInput placeholder="Enter Incom Tax Number" />
                        </Form.Item>
                      </div>

                      {/* Country, Nationality */}
                      <div className="flex flex-col md:flex-row flex-nowrap gap-3">
                        <Form.Item
                          className="flex-1 mb-1"
                          name="country"
                          label="Country"
                          rules={[
                            { required: true, message: "Country is required" },
                          ]}
                        >
                          <SelectInput options={countryOptions} />
                        </Form.Item>
                        <Form.Item
                          className="flex-1 mb-1"
                          name="citizenship"
                          label="Citizenship"
                          rules={[
                            {
                              required: true,
                              message: "Citizenship is required",
                            },
                          ]}
                        >
                          <SelectInput options={nationalityOptions} />
                        </Form.Item>
                      </div>

                      {/* Currency, National ID Type */}
                      <div className="flex flex-col md:flex-row gap-3">
                        <Form.Item
                          className="flex-1 mb-1"
                          label="Currency"
                          name="currency"
                          rules={[
                            { required: true, message: "Currency is required" },
                          ]}
                        >
                          <TextInput placeholder="Enter Currency" />
                        </Form.Item>
                        <Form.Item
                          className="flex-1 mb-1"
                          label="ID Type"
                          name="idType"
                          rules={[
                            { required: true, message: "ID Type is required" },
                          ]}
                        >
                          <SelectInput options={nationalIdTypeOptions} />
                        </Form.Item>
                      </div>

                      {/* ID Number, Industry */}
                      <div className="flex flex-col md:flex-row gap-3">
                        <Form.Item
                          className="flex-1 mb-1"
                          label="ID Number"
                          name="idNumber"
                          rules={[
                            {
                              required: true,
                              message: "ID Number is required",
                            },
                          ]}
                        >
                          <TextInput placeholder="Enter ID Number" />
                        </Form.Item>
                        <Form.Item
                          className="flex-1 mb-1"
                          label="Industry"
                          name="industry"
                          rules={[
                            { required: true, message: "Industry is required" },
                          ]}
                        >
                          <TextInput placeholder="Enter Industry" />
                        </Form.Item>
                      </div>

                      {/* Occupation, Source of Income */}
                      <div className="flex flex-col md:flex-row gap-3">
                        <Form.Item
                          className="flex-1 mb-1"
                          label="Occupation"
                          name="occupation"
                          rules={[
                            {
                              required: true,
                              message: "Occupation is required",
                            },
                          ]}
                        >
                          <TextInput placeholder="Enter Occupation" />
                        </Form.Item>
                        <Form.Item
                          className="flex-1 mb-1"
                          label="Source of Income"
                          name="sourceOfIncome"
                          rules={[
                            {
                              required: true,
                              message: "Source of Income is required",
                            },
                          ]}
                        >
                          <TextInput
                            type="number"
                            placeholder="Enter Source of Income"
                          />
                        </Form.Item>
                      </div>

                      {/* Mobile Phone, Phone 2 */}
                      <div className="flex flex-col md:flex-row gap-3">
                        <Form.Item
                          className="flex-1 mb-1"
                          label="Mobile Phone"
                          name="mobilePhone"
                          rules={[
                            {
                              required: true,
                              message: "Mobile Phone is required",
                            },
                          ]}
                        >
                          <TextInput
                            type="number"
                            placeholder="Enter Mobile Phone"
                          />
                        </Form.Item>
                        <Form.Item
                          className="flex-1 mb-1"
                          label="Phone 2"
                          name="phone2"
                          rules={[
                            { required: true, message: "Phone 2 is required" },
                          ]}
                        >
                          <TextInput
                            type="number"
                            placeholder="Enter Phone 2"
                          />
                        </Form.Item>
                      </div>

                      {/* Fax Number, Marital Status */}
                      <div className="flex flex-col md:flex-row gap-3">
                        <Form.Item
                          className="flex-1 mb-1"
                          label="Fax Number"
                          name="faxNumber"
                          rules={[
                            {
                              required: true,
                              message: "Fax Number is required",
                            },
                          ]}
                        >
                          <TextInput
                            type="number"
                            placeholder="Enter Fax Number"
                          />
                        </Form.Item>
                        <Form.Item
                          className="flex-1 mb-1"
                          label="Marital Status"
                          name="marital"
                          rules={[
                            {
                              required: true,
                              message: "Marital Status is required",
                            },
                          ]}
                        >
                          <SelectInput options={maritalStatusOptions} />
                        </Form.Item>
                      </div>
                      <Form.Item
                        className="flex-1 mb-1"
                        label="Gender"
                        name="gender"
                        rules={[
                          { required: true, message: "Gender is required" },
                        ]}
                      >
                        <SelectInput options={genderOptions} />
                      </Form.Item>

                      <button
                        type="submit"
                        className="text-lg font-medium p-3 border w-full bg-golden text-white rounded-lg"
                        disabled={isPersonalInfoLoading}
                      >
                        Save Personal Information
                      </button>
                    </Form>
                  </TabPanel>
                  <TabPanel>
                    <form
                      onSubmit={handleImageUploadSubmit}
                      className="space-y-6"
                    >
                      <div className="w-full">
                        <label className="block text-sm mb-2">
                          Profile Picture
                        </label>
                        <input
                          type="file"
                          onChange={(e) =>
                            setDefaultValues((prev) => ({
                              ...prev,
                              profilePic: e.target.files[0],
                            }))
                          }
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        />
                      </div>
                      <div className="w-full">
                        <label className="block text-sm mb-2">
                          Personal ID
                        </label>
                        <input
                          type="file"
                          onChange={(e) =>
                            setDefaultValues((prev) => ({
                              ...prev,
                              personalId: e.target.files[0],
                            }))
                          }
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        />
                      </div>
                      <div className="w-full">
                        <label className="block text-sm mb-2">
                          Proof of Address
                        </label>
                        <input
                          type="file"
                          onChange={(e) =>
                            setDefaultValues((prev) => ({
                              ...prev,
                              proofOfAddress: e.target.files[0],
                            }))
                          }
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        />
                      </div>
                      <button
                        type="submit"
                        className="text-lg font-medium p-3 border w-full bg-golden text-white rounded-lg"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default KycForm;
