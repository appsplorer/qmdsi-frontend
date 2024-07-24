import { ArrowUpDown } from 'lucide-react';
import React from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';

const CreditSwap = () => {
    const CustomOption = (props) => {
        const { innerRef, innerProps, data } = props;
        return (
            <div ref={innerRef} {...innerProps} className="custom-option">
                <img src={data.image} alt="" style={{ width: '20px', marginRight: '10px' }} />
                {data.label}
            </div>
        );
    };

    // Custom single value component
    const CustomSingleValue = (props) => {
        const { data } = props;
        return (
            <div className="custom-single-value">
                <img src={data.image} alt="" style={{ width: '20px', marginRight: '10px' }} />
                {data.label}
            </div>
        );
    };

    const options = [
        { value: 'USDT', label: 'USDT', image: 'https://w7.pngwing.com/pngs/113/18/png-transparent-tether-hd-logo-thumbnail.png' },
        { value: 'QMGT', label: 'QMGT', image: 'https://via.placeholder.com/20' },
        { value: 'ETHEREUM', label: 'ETHEREUM', image: 'https://via.placeholder.com/20' },
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
            display: 'none', // Removes the left border line
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#1E1E20', // Background color of the menu
            borderRadius: '5px',
            marginTop: '0px',
            padding: '5px'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'blue' : state.isFocused ? 'lightblue' : 'white', // Background color on hover and selection
            color: state.isSelected ? 'white' : 'black', // Text color
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
        }),
    };

    return (
        <div className='mt-4'>
            <div className='w-full bg-accent rounded-md px-4 py-4 text-white flex items-center'>
                <div className='w-1/2'>
                    <div className='flex gap-4 items-end'>
                        <input type='text' value={100} className='w-[80px] bg-transparent border-0 outline-none text-3xl' readOnly />
                        <button className='text-secondary text-sm'>MAX</button>
                    </div>
                    <div className='mt-2 text-secondary text-xs'>Balance: $99.29</div>
                </div>
                <div className='w-1/2 '>
                <button className='text-secondary bg-background h-[50px] px-5 rounded'>Purchase with Credit Card</button>
                </div>
            </div>
            <button className='p-1 -mt-2 m-auto border-primary border-2 rounded-full text-primary flex justify-between items-center  absolute left-[50%] translate-x-[-50%]'><ArrowUpDown /></button>
            <div className='w-full bg-accent rounded-md px-4 py-4 text-white flex items-center mt-4'>
                <div className='w-1/2'>
                    <div className='flex gap-4 items-end'>
                        <input type='text' value={100} className='w-[80px] bg-transparent border-0 outline-none text-3xl' readOnly />
                        <button className='text-secondary text-sm'>MAX</button>
                    </div>
                    <div className='mt-2 text-secondary text-xs'>Balance: $99.29</div>
                </div>
                <div className='w-1/2 '>
                    <Select
                        options={options}
                        components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                        styles={customStyles}
                        placeholder="Select an option"
                    />
                </div>
            </div>
            <div className='mt-4 bg-accent opacity-30 text-white p-2 px-4 text-xm font-montserrat text-xs'>
                <p className='flex justify-between'><span>Gold Price</span><span className='text-white'>1.002g per 1 QMGT</span></p>
                <p className='flex justify-between mt-2'><span>Minimum Recieved</span><span className='text-white'>100 QMGT</span></p>
                <p className='flex justify-between mt-2'><span>Price Impact</span><span className='text-white'>0.001</span></p>
                <p className='flex justify-between mt-2'><span>Liquidity Provider Fee</span><span className='text-white'>0.000063 USDT</span></p>
            </div>
            <div>
                <button className='w-full h-[50px] bg-primary rounded mt-4 hover:bg-secondary'>Swap</button>
            </div>
        </div>
    );
};

export default CreditSwap;
