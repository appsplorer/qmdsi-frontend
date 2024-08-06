import { CircleDivideIcon, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TransactionModal = ({ closeModal,transactionComplete, tokenIn, amountIn, amountOut, tokenOut}) => {
    const [tab, setTab] = useState('Details'); // Correctly defining the state and setState function
    


    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='modal-wrapper fixed inset-0 bg-black opacity-70'></div>
            <div className='w-full md:w-1/3 lg:w-1/4 bg-accent  z-10 rounded-md shadow-lg flex relative overflow-hidden'>
                <div className='w-full h-full bg-accent p-4'>
                    <div className='w-full flex justify-between items-center text-white'>
                        <h1 className='text-lg w-full text-center'>Swap  Confirmation</h1>
                        <button onClick={closeModal} className=''>
                            <X />
                        </button>
                    </div>
                    <div className='w-full gap-3 mt-4'>
                        <div className='flex flex-col justify-around items-center w-full text-white mt-12'>
                            <h1 className='text-3xl font-medium'>{`${amountIn} ${tokenIn}`}</h1>
                            <p className='text-sm text-gray-400'>Balance: $99.43</p>
                        </div>
                        <div className='flex text-white w-full justify-center gap-4 text-xl font-thin mt-24'>
                            <button
                                className={tab === 'Details' ? 'font-bold border-b-2 border-white' : ''}
                                onClick={() => setTab('Details')}
                            >
                                Details
                            </button>
                            <button
                                className={tab === 'Data' ? 'font-bold border-b-2 border-white' : ''}
                                onClick={() => setTab('Data')}
                            >
                                Data
                            </button>
                        </div>
                        <hr className='border-gray-400'></hr>
                        {tab === 'Details' && (
                            <div className='w-full text-white mt-4 text-sm px-4'>
                                <div className='flex justify-between mb-4'>
                                    <p>Gas Fee</p>
                                    <div className='text-right '><p>{`${amountOut} ${tokenOut}`}</p>
                                        <p className='text-gray-400'>$0.10</p>
                                    </div>
                                </div><div className='flex justify-between mb-4'>
                                    <div>
                                        <p>Total</p>
                                        <p className='text-gray-400'>(Amount + Gas Fee)</p>
                                    </div>
                                    <div className='text-right '><p>100 QMGT</p>
                                        <p className='text-gray-400'>$100.10</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {tab === 'Data' && (
                            <div className='w-full text-white mt-4 text-sm px-4'>
                                <div className='flex justify-between mb-4'>
                                    <p>Data Value 1</p>
                                    <div className='text-right '><p>0.000043 QMGT</p>
                                        <p className='text-gray-400'>$0.10</p>
                                    </div>
                                </div><div className='flex justify-between mb-4'>
                                    <div>
                                        <p>Data Value 2</p>
                                        <p className='text-gray-400'>(Amount + Gas Fee)</p>
                                    </div>
                                    <div className='text-right '><p>100 QMGT</p>
                                        <p className='text-gray-400'>$100.10</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className='w-full gap-4 flex mt-12'>
                            <button className='w-1/2 h-[50px] border rounded-md border-primary text-primary mb-2 hover:bg-secondary hover:text-black'  onClick={closeModal}>Reject</button>
                            <button className='w-1/2 h-[50px] border rounded-md border-primary bg-primary text-black hover:bg-secondary' onClick={transactionComplete}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionModal;
