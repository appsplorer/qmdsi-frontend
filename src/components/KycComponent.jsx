import React, { useState } from 'react';
import Select from 'react-select';

const KYCForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        employerName: '',
        incomePerAnnum: '',
        dateOfBirth: '',
        address1: '',
        country: '',
        citizenship: '',
        currency: '',
        mothersName: '',
        incomeTaxNo: '',
        nationalId: '',
        nationalIdType: '', // New state for National ID type
        industry: '',
        occupation: '',
        sourceOfIncome: '',
        email: '',
        email2: '',
        mobilePhone: '',
        phone2: '',
        faxNo: '',
        maritalStatus: '',
        gender: '',
        profilePicture: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSelectChange = (selectedOption, { name }) => {
        setFormData((prevData) => ({ ...prevData, [name]: selectedOption.value }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({ ...prevData, profilePicture: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const maritalStatusOptions = [
        { value: 'Single', label: 'Single' },
        { value: 'Married', label: 'Married' },
        // Add more options as needed
    ];

    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        // Add more options as needed
    ];

    const nationalIdTypeOptions = [
        { value: 'Passport', label: 'Passport' },
        { value: 'Driver License', label: 'Driver License' },
        { value: 'National ID Card', label: 'National ID Card' },
        // Add more options as needed
    ];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#1E1E20',
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
        <form onSubmit={handleSubmit} className="p-6 bg-accent rounded-md w-full text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} className="p-2 rounded bg-transparent border border-secondary" />
                <input type="text" name="employerName" placeholder="Employer Name" value={formData.employerName} onChange={handleInputChange} className="p-2 rounded bg-transparent border border-secondary" />
                <input type="text" name="incomePerAnnum" placeholder="Income Per Annum" value={formData.incomePerAnnum} onChange={handleInputChange} className="p-2 rounded bg-transparent border border-secondary" />
                <input type="date" name="dateOfBirth" placeholder="Date of Birth" value={formData.dateOfBirth} onChange={handleInputChange} className="p-2 rounded bg-transparent border border-secondary" />
                <input type="text" name="address1" placeholder="Address 1" value={formData.address1} onChange={handleInputChange} className="p-2 rounded bg-transparent border border-secondary" />
                <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleInputChange} className="p-2 rounded bg-transparent border border-secondary" />
                <input type="text" name="citizenship" placeholder="Citizenship" value={formData.citizenship} onChange={handleInputChange} className="p-2 rounded bg-transparent border border-secondary" />
                <input type="text" name="currency" placeholder="Currency" value={formData.currency} onChange={handleInputChange} className="p-2 rounded bg-transparent border border-secondary" />
                <input type="text" name="mothersName" placeholder="Mother's Name" value={formData.mothersName} onChange={handleInputChange} className="p-2 rounded bg-transparent border border-secondary" />
                <input type="text" name="incomeTaxNo" placeholder="Income Tax No" value={formData.incomeTaxNo} onChange={handleInputChange} className="p-2 rounded bg-transparent border border-secondary" />
                
                <Select
                    name="nationalIdType"
                    options={nationalIdTypeOptions}
                    styles={customStyles}
                    placeholder="National ID Type"
                    onChange={handleSelectChange}
                />
                <input type="text" name="nationalId" placeholder="National ID" value={formData.nationalId} onChange={handleInputChange} className="p-2 rounded bg-transparent border border-secondary" />
                
                
                <input type="text" name="industry" placeholder="Industry" value={formData.industry} onChange={handleInputChange} className="p-2 rounded bg-transparent border border-secondary" />
                <input type="text" name="occupation" placeholder="Occupation" value={formData.occupation} onChange={handleInputChange} className="p-2 rounded bg-transparent border border-secondary" />
                <input type="text" name="sourceOfIncome" placeholder="Source of Income" value={formData.sourceOfIncome} onChange={handleInputChange} className="p-2 rounded bg-transparent border border-secondary" />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="p-2 rounded bg-transparent border border-secondary" />
                <input type="email" name="email2" placeholder="Email 2" value={formData.email2} onChange={handleInputChange} className="p-2 rounded bg-transparent border border-secondary" />
                <input type="text" name="mobilePhone" placeholder="Mobile Phone" value={formData.mobilePhone} onChange={handleInputChange} className="p-2 rounded bg-transparent border border-secondary" />
                <input type="text" name="phone2" placeholder="Phone 2" value={formData.phone2} onChange={handleInputChange} className="p-2 rounded bg-transparent border border-secondary" />
                <input type="text" name="faxNo" placeholder="Fax No" value={formData.faxNo} onChange={handleInputChange} className="p-2 rounded bg-transparent border border-secondary" />
                
                <Select
                    name="maritalStatus"
                    options={maritalStatusOptions}
                    styles={customStyles}
                    placeholder="Marital Status"
                    onChange={handleSelectChange}
                />
                <Select
                    name="gender"
                    options={genderOptions}
                    styles={customStyles}
                    placeholder="Gender"
                    onChange={handleSelectChange}
                />
                <input type="file" name="profilePicture" onChange={handleFileChange} className="p-2 rounded bg-transparent border border-secondary" />
            </div>
            <button type="submit" className="w-full h-[50px] bg-primary rounded mt-4 hover:bg-secondary">Submit</button>
        </form>
    );
};

export default KYCForm;
