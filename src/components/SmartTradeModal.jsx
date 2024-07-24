import { CircleArrowOutUpLeft, CircleArrowOutUpRight, CircleDivideIcon, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SmartTradeModal = ({ closeModal, confirmModal }) => {

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='modal-wrapper fixed inset-0 bg-black opacity-70'></div>
            <div className='w-full md:w-1/2 lg:w-2/3 bg-accent  z-10 rounded-md shadow-lg flex relative overflow-hidden'>
                <div className='w-full h-full bg-accent p-4'>
                    <div className='w-full flex justify-between items-center text-white'>
                        <h1 className='text-lg w-full text-center'>Welcome to Smart Trade</h1>
                        <button onClick={closeModal} className=''>
                            <X />
                        </button>
                    </div>
                    <div className='w-full gap-3 mt-4'>
                        <div className='info flex flex-col justify-around items-center w-full text-white mt-12 h-[400px] overflow-auto'>
                            <h1 className='font-montserrat text-lg font-bold mb-5'>Invest in Proven Success
                                Secure and Flexible Trading with Quantum Metal Gold Tokens
                            </h1>
                            <p>
                                Welcome to <strong>Smart Trade</strong>, your secure and flexible trading solution. Convert your QMGT to Smart Trade Tokens and enjoy peace of mind in every trade. With Smart Trade, you don't have to worry about market fluctuations – you have the flexibility to manage your assets in a way that suits you best.
                            </p>
                            <h2 className='font-montserrat text-md font-bold mb-3 mt-2'>Why Choose Smart Trade?</h2>
                            <ul>
                                <li>
                                    <strong>Secure Your Trades:</strong> Convert your QMGT to Smart Trade Tokens to protect your trades from market volatility.
                                </li>
                                <li>
                                    <strong>No Worries About Losses:</strong> Even if a trade goes against you, Smart Trade ensures you are protected.
                                </li>
                                <li>
                                    <strong>Flexible Payment Options:</strong> Choose to repay with your QMGT anytime or wait for the gold price to rise before making your move.
                                </li>
                                <li>
                                    <strong>Leverage Gold’s Stability:</strong> Benefit from the enduring value of gold, ensuring your investments are backed by a solid asset.
                                </li>
                            </ul>
                            <h2 className='font-montserrat text-md font-bold mb-3 mt-2'>How It Works:</h2>
                            <ol>
                                <li>
                                    <strong>Convert Your QMGT:</strong> Easily convert your Quantum Metal Gold Tokens into Smart Trade Tokens.
                                </li>
                                <li>
                                    <strong>Trade with Confidence:</strong> Use your Smart Trade Tokens to engage in trades with the security of knowing your QMGT is protected.
                                </li>
                                <li>
                                    <strong>Flexible Repayment:</strong> If a trade doesn’t go as planned, you have the option to repay with QMGT at any time.
                                </li>
                                <li>
                                    <strong>Wait for Gold Price Increase:</strong> Alternatively, hold off and wait for the gold price to increase, maximizing your returns before repaying.
                                </li>
                                <li>
                                    <strong>Track Your Trades:</strong> Monitor your trades and asset performance through our intuitive platform.
                                </li>
                            </ol>
                        </div>
                        <div className='text-primary mt-2 mb-2'>
                        Join Smart Trade today and secure your trades with the confidence and flexibility provided by Quantum Metal Gold Tokens


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

export default SmartTradeModal;
