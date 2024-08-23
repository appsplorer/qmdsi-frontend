import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { countryOptions, nationalityOptions } from '../data/countries';

const Nominee = () => {
    const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Add form submission logic here
        console.log(data);
    };

    const nationalIdTypeOptions = [
        { value: 'Passport', label: 'Passport' },
        { value: 'Driver License', label: 'Driver License' },
        { value: 'National ID Card', label: 'National ID Card' },
        // Add more options as needed
    ];

    const maritalStatusOptions = [
        { value: 'Single', label: 'Single' },
        { value: 'Married', label: 'Married' },
        { value: 'Divorced', label: 'Divorced' },
        { value: 'Widowed', label: 'Widowed' },
        // Add more options as needed
    ];

    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' },
        // Add more options as needed
    ];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#fff',
            borderColor: '#1E1E20',
            minHeight: '50px',
            height: '50px',
            outline: 'none'
        }),
        valueContainer: (provided) => ({
            ...provided,
            height: '40px',
            display: 'flex',
            alignItems: 'center',
        }),
        input: (provided) => ({
            ...provided,
            margin: '0px',
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            height: '50px',
            borderColor: '#1E1E20'
        }),
        indicatorSeparator: (provided) => ({
            display: 'none',
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#1E1E20',
            borderRadius: '5px',
            marginTop: '0px',
            padding: '5px'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'blue' : state.isFocused ? 'lightblue' : 'white',
            color: state.isSelected ? 'white' : 'black',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
        }),
    };

    return (
        <form
            className="w-full max-w-[1200px] bg-accent rounded-md p-8 text-white"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="">
                <h1 className='text-xl block'>Personal Information:</h1>

                {/* Name , Employer, Income  */}
                <div className='flex gap-3 mb-3 mt-3'>
                    <div className='w-1/3'>
                        <label className="block text-sm mb-2" htmlFor="firstName">
                            Name
                        </label>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Enter Your Name"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className='w-1/3'>
                        <label className="block text-sm mb-2" htmlFor="lastName">
                            Employer's Name
                        </label>
                        <Controller
                            name="employerName"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Enter Your Employers Name"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className='w-1/3'>
                        <label className="block text-sm mb-2" htmlFor="middleName">
                            Income Per Annum
                        </label>
                        <Controller
                            name="income"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="₱200,001 - ₱500,000"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </div>

                {/* DOB , Address  */}
                <div className='flex gap-3 mb-3 mt-3'>
                    <div className='w-1/3'>
                        <label className="block text-sm mb-2" htmlFor="dateOfBirth">
                            Date Of Birth
                        </label>
                        <Controller
                            name="dateOfBirth"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="date"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className='w-2/3'>
                        <label className="block text-sm mb-2" htmlFor="address">
                            Address
                        </label>
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <textarea
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Enter Your Address"
                                    rows={3}
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </div>

                {/* City , Postal Code  */}
                <div className='flex gap-3 mb-3 mt-3'>
                    <div className='w-1/2'>
                        <label className="block text-sm mb-2" htmlFor="firstName">
                            City
                        </label>
                        <Controller
                            name="city"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Enter Your City Name"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className='w-1/2'>
                        <label className="block text-sm mb-2" htmlFor="lastName">
                            Postal Code / Zip Code
                        </label>
                        <Controller
                            name="zipCode"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Enter Your Zip Code"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </div>

                {/* Country, Citizenship , Currency  */}
                <div className='flex gap-3 mb-3 mt-3'>
                    <div className='w-1/3'>
                        <label className="block text-sm mb-2" htmlFor="country">
                            Country
                        </label>
                        <Controller
                            name="country"
                            control={control}
                            defaultValue={'Philippine'}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={countryOptions}
                                    styles={customStyles}
                                    onChange={(selectedOption) => setValue('country', selectedOption.value)}
                                    placeholder="Select Country"
                                    value={countryOptions.find(option => option.value === watch('country'))}
                                />
                            )}
                        />
                    </div>
                    <div className='w-1/3'>
                        <label className="block text-sm mb-2" htmlFor="country">
                            Citizenship
                        </label>
                        <Controller
                            name="citizenship"
                            control={control}
                            defaultValue={'Filipino'}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={nationalityOptions}
                                    styles={customStyles}
                                    onChange={(selectedOption) => setValue('country', selectedOption.value)}
                                    placeholder="Select Citizenship"
                                    value={nationalityOptions.find(option => option.value === watch('country'))}
                                />
                            )}
                        />
                    </div>
                    <div className='w-1/3'>
                        <label className="block text-sm mb-2" htmlFor="country">
                            Currency
                        </label>
                        <Controller
                            name="currency"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={countryOptions}
                                    styles={customStyles}
                                    onChange={(selectedOption) => setValue('country', selectedOption.value)}
                                    placeholder="Select Currency"
                                    value={countryOptions.find(option => option.value === watch('country'))}
                                />
                            )}
                        />
                    </div>
                </div>

                {/* Mother Name , Income Tax No  */}
                <div className='flex gap-3 mb-3 mt-3'>

                    <div className='w-1/2'>
                        <label className="block text-sm mb-2" htmlFor="contactInfo">
                            Mother's Name
                        </label>
                        <Controller
                            name="motherName"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Enter Your Mother's Name"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className='w-1/2'>
                        <label className="block text-sm mb-2" htmlFor="contactInfo">
                            Income Tax No
                        </label>
                        <Controller
                            name="incomeTaxNo"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Enter Income Tax No"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </div>

                {/* Id Type , Id No  */}
                <div className='flex gap-3 mb-3 mt-3'>
                    <div className='w-1/2'>
                        <label className="block text-sm mb-2" htmlFor="idType">
                            ID Type
                        </label>
                        <Controller
                            name="idType"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={nationalIdTypeOptions}
                                    styles={customStyles}
                                    onChange={(selectedOption) => setValue('idType', selectedOption.value)}
                                    placeholder="Select ID Type"
                                    value={nationalIdTypeOptions.find(option => option.value === watch('idType'))}
                                />
                            )}
                        />
                    </div>
                    <div className='w-1/2'>
                        <label className="block text-sm mb-2" htmlFor="idNumber">
                            ID Number
                        </label>
                        <Controller
                            name="idNumber"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Enter ID Number"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </div>

                {/* Name , Employer, Income  */}
                <div className='flex gap-3 mb-3 mt-3'>
                    <div className='w-1/3'>
                        <label className="block text-sm mb-2" htmlFor="firstName">
                            Industry
                        </label>
                        <Controller
                            name="industry"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Industry"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className='w-1/3'>
                        <label className="block text-sm mb-2" htmlFor="lastName">
                            Occupation
                        </label>
                        <Controller
                            name="occupation"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Occupation"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className='w-1/3'>
                        <label className="block text-sm mb-2" htmlFor="middleName">
                            Source of Income
                        </label>
                        <Controller
                            name="income"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Source Of Income"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </div>

                {/* Email , Email 2  */}
                <div className='flex gap-3 mb-3 mt-3'>
                    <div className='w-1/2'>
                        <label className="block text-sm mb-2" htmlFor="firstName">
                            Email
                        </label>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Email"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className='w-1/2'>
                        <label className="block text-sm mb-2" htmlFor="lastName">
                            Email 2
                        </label>
                        <Controller
                            name="email2"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Email 2"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </div>

                {/* Mobile Phone , Phone 2 Fax No */}
                <div className='flex gap-3 mb-3 mt-3'>
                    <div className='w-1/3'>
                        <label className="block text-sm mb-2" htmlFor="firstName">
                            Mobile Phone
                        </label>
                        <Controller
                            name="mobilePhone"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Mobile Phone"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className='w-1/3'>
                        <label className="block text-sm mb-2" htmlFor="lastName">
                            Phone 2
                        </label>
                        <Controller
                            name="phone2"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Phone 2"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className='w-1/3'>
                        <label className="block text-sm mb-2" htmlFor="lastName">
                            Fax No
                        </label>
                        <Controller
                            name="faxNumber"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Fax Number"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </div>

                {/* Marital Status, Gender  */}
                <div className='flex gap-3 mb-3 mt-3'>
                    <div className='w-1/2'>
                        <label className="block text-sm mb-2" htmlFor="country">
                            Marital Status
                        </label>
                        <Controller
                            name="marital"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={maritalStatusOptions}
                                    styles={customStyles}
                                    onChange={(selectedOption) => setValue('country', selectedOption.value)}
                                    placeholder="Select Marital Status"
                                    value={maritalStatusOptions.find(option => option.value === watch('country'))}
                                />
                            )}
                        />
                    </div>
                    <div className='w-1/2'>
                        <label className="block text-sm mb-2" htmlFor="country">
                            Gender
                        </label>
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={genderOptions}
                                    styles={customStyles}
                                    onChange={(selectedOption) => setValue('country', selectedOption.value)}
                                    placeholder="Select Gender"
                                    value={genderOptions.find(option => option.value === watch('country'))}
                                />
                            )}
                        />
                    </div>
                </div>
                {/* Profile Picture  */}
                <div className='mb-3'>
                    <label className="block text-sm mb-2" htmlFor="idFile">
                        Upload Profile Picture
                    </label>
                    <input
                        type="file"
                        name="profilePic"
                        onChange={(e) => setValue('idFile', e.target.files[0])}
                        className="bg-dark p-3 rounded border-0 outline-none text-primary"
                    />
                </div>


                <h1 className='text-xl block'>Nominee Information:</h1>

                {/* First Name Middle, Last  */}
                <div className='flex gap-3 mb-3 mt-3'>
                    <div className='w-1/3'>
                        <label className="block text-sm mb-2" htmlFor="firstName">
                            First Name
                        </label>
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Enter Nominee's First Name"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className='w-1/3'>
                        <label className="block text-sm mb-2" htmlFor="middleName">
                            Middle Name
                        </label>
                        <Controller
                            name="middleName"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Enter Nominee's Middle Name"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className='w-1/3'>
                        <label className="block text-sm mb-2" htmlFor="lastName">
                            Last Name
                        </label>
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Enter Nominee's Last Name"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </div>

                {/* DOB , Address  */}

                <div className='flex gap-3 mb-3 mt-3'>
                    <div className='w-1/3'>
                        <label className="block text-sm mb-2" htmlFor="dateOfBirth">
                            Date Of Birth
                        </label>
                        <Controller
                            name="dateOfBirth"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="date"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className='w-2/3'>
                        <label className="block text-sm mb-2" htmlFor="address">
                            Address
                        </label>
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <textarea
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Enter Your Address"
                                    rows={2}
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </div>

                
                {/* City , Postal Code, Country  */}
                <div className='flex gap-3 mb-3 mt-3'>
                    <div className='w-1/3'>
                        <label className="block text-sm mb-2" htmlFor="firstName">
                            City
                        </label>
                        <Controller
                            name="city"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Enter Nominee's City Name"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className='w-1/3'>
                        <label className="block text-sm mb-2" htmlFor="lastName">
                            Postal Code / Zip Code
                        </label>
                        <Controller
                            name="zipCode"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Enter Nominee's Zip Code"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className='w-1/3'>
                        <label className="block text-sm mb-2" htmlFor="country">
                            Country
                        </label>
                        <Controller
                            name="country"
                            control={control}
                            defaultValue={'Philippine'}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={countryOptions}
                                    styles={customStyles}
                                    onChange={(selectedOption) => setValue('country', selectedOption.value)}
                                    placeholder="Select Country"
                                    value={countryOptions.find(option => option.value === watch('country'))}
                                />
                            )}
                        />
                    </div>
                </div>

                {/* Relation, COntact Infor  */}

                <div className='flex gap-3 mb-3 mt-3'>

                    <div className='w-1/2'>
                        <label className="block text-sm mb-2" htmlFor="contactInfo">
                        Relationship to the Testator
                        </label>
                        <Controller
                            name="relation"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Enter Nominee's Relation"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className='w-1/2'>
                        <label className="block text-sm mb-2" htmlFor="contactInfo">
                            Contact Info
                        </label>
                        <Controller
                            name="contactInfo"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Enter Nominee's Contact Info"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </div>

                {/* ID No, Id Type  */}

                <div className='flex gap-3 mb-3 mt-3'>
                    <div className='w-1/2'>
                        <label className="block text-sm mb-2" htmlFor="idType">
                            ID Type
                        </label>
                        <Controller
                            name="idType"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={nationalIdTypeOptions}
                                    styles={customStyles}
                                    onChange={(selectedOption) => setValue('idType', selectedOption.value)}
                                    placeholder="Select ID Type"
                                    value={nationalIdTypeOptions.find(option => option.value === watch('idType'))}
                                />
                            )}
                        />
                    </div>
                    <div className='w-1/2'>
                        <label className="block text-sm mb-2" htmlFor="idNumber">
                            ID Number
                        </label>
                        <Controller
                            name="idNumber"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className="w-full bg-dark p-3 rounded border-0 outline-none text-primary"
                                    type="text"
                                    placeholder="Enter ID Number"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className='mb-3'>
                    <label className="block text-sm mb-2" htmlFor="idFile">
                        Upload ID File
                    </label>
                    <input
                        type="file"
                        name="idFile"
                        onChange={(e) => setValue('idFile', e.target.files[0])}
                        className="bg-dark p-3 rounded border-0 outline-none text-primary"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary p-3 rounded text-white hover:bg-secondary"
                >
                    Submit KYC
                </button>
            </div>
        </form>
    );
};

export default Nominee;
