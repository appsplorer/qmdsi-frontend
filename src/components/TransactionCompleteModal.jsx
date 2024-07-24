import { CircleArrowOutUpLeft, CircleArrowOutUpRight, CircleDivideIcon, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TransactionCompleteModal = ({ closeModal }) => {
    const [tab, setTab] = useState('Details'); // Correctly defining the state and setState function
    


    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='modal-wrapper fixed inset-0 bg-black opacity-70'></div>
            <div className='w-full md:w-1/3 lg:w-1/4 bg-accent  z-10 rounded-md shadow-lg flex relative overflow-hidden'>
                <div className='w-full h-full bg-accent p-4'>
                    <div className='w-full flex justify-between items-center text-white'>
                        <h1 className='text-lg w-full text-center'></h1>
                        <button onClick={closeModal} className=''>
                            <X />
                        </button>
                    </div>
                    <div className='w-full gap-3 mt-4'>
                        <div className='flex flex-col justify-around items-center w-full text-white mt-12'>
                            <CircleArrowOutUpRight className='w-12 h-12 mb-12 text-primary'/>
                            <h1 className='text-3xl font-medium'>Transaction Completed</h1>
                            <p className=' text-gray-400'>Swapping  100 USDT for 100 QMGT</p>
                        </div>
                        
                        <div className='w-full gap-4 flex mt-12 justify-center'>
                            <button className='w-1/2 h-[50px] border rounded-md border-primary text-primary mb-2 hover:bg-secondary hover:text-black'>View on Etherscan</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionCompleteModal;
