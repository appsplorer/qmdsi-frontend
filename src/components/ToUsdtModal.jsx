import { CircleArrowOutUpLeft, CircleArrowOutUpRight, CircleDivideIcon, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ToUsdtModal = ({ closeModal, confirmModal }) => {

    return (
        <div className='fixed inset-0 top-[9%] md:top-0 z-50 flex items-center justify-center'>
            <div className='modal-wrapper fixed inset-0 bg-black opacity-70'></div>
            <div className='w-full md:w-1/2 lg:w-4/5 bg-accent  z-10 rounded-md shadow-lg flex relative overflow-hidden'>
                <div className='w-full h-full bg-accent p-4'>
                    <div className='w-full flex justify-between items-center text-white'>
                        <h1 className='text-lg w-full text-center'>Welcome to QMGT Convert to USDT (QCU)</h1>
                        <button onClick={closeModal} className=''>
                            <X />
                        </button>
                    </div>
                    <div className='w-full gap-3 mt-4'>
                        <div className='info flex flex-col justify-around  w-full text-white mt-12 h-[400px] overflow-auto'>
                            <h1 className='font-montserrat text-lg font-bold mb-5'>Unlock the Potential of Your Quantum Metal Gold Tokens</h1>
                            <p>
                                Welcome to <strong>QMGT Convert to USDT (QCU)</strong>, where you can leverage up to 85% of your QMGT as collateral with an incredibly low APR ​of just 3.5%. Enjoy the flexibility to pay anytime while your $QMGT remains securely locked until the completion of your payment.
                            </p>
                            <h2  className='font-montserrat text-md font-bold mb-3 mt-2'>Why Choose QCU?</h2>
                            <ul className='list-disc list-inside'>
                                <li>
                                    <strong>Flexible Collateral Use:</strong> Utilize up to 85% of your QMGT for immediate liquidity.
                                </li>
                                <li>
                                    <strong>Low APR:</strong> Benefit from a highly competitive annual percentage rate of 3.5%.
                                </li>
                                <li>
                                    <strong>Secure and Reliable:</strong> Your QMGT will be safely locked until your payment is complete, ensuring peace of mind.
                                </li>
                            </ul>
                            <h2 className='font-montserrat text-md font-bold mb-3 mt-2'>How It Works:</h2>
                            <ol className='list-decimal list-inside'>
                                <li>
                                    <strong>Collateralize Your QMGT:</strong> Convert a portion of your QMGT into USDT up to 85% of its value.
                                </li>
                                <li>
                                    <strong>Receive Funds Instantly:</strong> Access your USDT instantly for any financial needs.
                                </li>
                                <li>
                                    <strong>Flexible Repayment:</strong> Enjoy the freedom to repay at any time that suits you.
                                </li>
                                <li>
                                    <strong>Completion and Unlocking:</strong> Once your payment is complete, your QMGT will be unlocked and available for use again.
                                </li>
                            </ol>
                        </div>
                        <div className='text-primary mt-2 mb-2 text-center'>
                        Join the QCU program today and experience the freedom and security of converting your QMGT into usable funds while maintaining ​control over your assets.
                        </div>

                        <div className='w-full gap-4 flex mt-6 justify-center'>
                            <button className='w-1/2 h-[50px] border rounded-md border-primary bg-primary text-black hover:bg-secondary' onClick={confirmModal}>Convert Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToUsdtModal;
