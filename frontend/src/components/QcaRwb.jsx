import { ArrowUpDown } from 'lucide-react';
import React, { useState } from 'react'
import ToUsdtModal from './ToUsdtModal';
import ToCryptoModal from './ToCryptoModal';
import Select from 'react-select'
import ToRwbModal from './ToRwbModal';

const QcaRwb = () => {
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

    const [confirmModal, setConfirmModal] = useState(true);

    const closeModal = () => {
        setConfirmModal(false);
    }
    const resultModal = () => {
        setConfirmModal(false);
    }

    const tableData = [
        {
            "company": "Nigrakon",
            "icon": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
            "stake": "$1000",
            "apr": "12%",
            "collateral": "Y",
            "vesting": "3 Yrs",
            "status" : "Open",
            "remaining" : "$8000",
            "distributed" : "$8000",
            "link" : "#"
        }
    ];
    return (
        <div className='mt-4 w-[400px] overflow-auto md:w-[1200px] bg-accent rounded-md px-4 py-4 text-white'>
            <div className='w-full flex items-center gap-4'>
                <div className='w-3/5'>
                    <div className='flex gap-4 items-end'>
                        <input type='text' value={100} className='w-full bg-transparent border-0 border-b outline-none text-3xl' />
                    </div>
                    <div className='mt-2 text-secondary text-xs'>Convert upto: 8.5 $QMGT</div>
                </div>
                <div className='w-2/5'>
                    <Select
                        options={options}
                        components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                        styles={customStyles}
                        placeholder="Select an option"
                    />
                </div>
            </div>

            <div className='w-[1200px] table-crypto mt-6'>
                <table className=' w-full table-auto'>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Stake Limit</th>
                            <th>APR</th>
                            <th>With Collateral?</th>
                            <th>Vesting</th>
                            <th>Status</th>
                            <th>Remaining</th>
                            <th>Distributed</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((data, index) => (
                            <tr key={index}>
                                <td className='flex gap-2 items-center'>
                                    <img className='w-[40px] h-[40px]' src={data.icon} alt={data.company} />
                                    <div>
                                        <h2>{data.company}</h2>
                                        <a href={data.link}>Details</a>
                                    </div>
                                </td>
                                <td>{data.stake}</td>
                                <td>{data.apr}</td>
                                <td>{data.collateral}</td>
                                <td>{data.vesting}</td>
                                <td>{data.status}</td>
                                <td>{data.remaining}</td>
                                <td>{data.distributed}</td>
                                <td>
                                    <input type='text' value={0} className='h-[50px] rounded p-2 mx-5 bg-transparent border outline-none' />
                                </td>
                                <td>                                    <button className=' h-[50px] px-4 bg-primary rounded mt-4 hover:bg-secondary' onClick={()=>setConfirmModal(true)}>
                                    Convert
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {confirmModal && <ToRwbModal closeModal={closeModal} confirmModal={resultModal} />}
        </div>
    )
}

export default QcaRwb