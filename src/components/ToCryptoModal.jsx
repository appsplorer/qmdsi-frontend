import { CircleArrowOutUpLeft, CircleArrowOutUpRight, CircleDivideIcon, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ToCryptoModal = ({ closeModal, confirmModal }) => {

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='modal-wrapper fixed inset-0 bg-black opacity-70'></div>
            <div className='w-full md:w-1/2 lg:w-2/3 bg-accent  z-10 rounded-md shadow-lg flex relative overflow-hidden'>
                <div className='w-full h-full bg-accent p-4'>
                    <div className='w-full flex justify-between items-center text-white'>
                        <h1 className='text-lg w-full text-center'>Welcome to QMGT Convert to Crypto (QCC)</h1>
                        <button onClick={closeModal} className=''>
                            <X />
                        </button>
                    </div>
                    <div className='w-full gap-3 mt-4'>
                        <div className='info flex flex-col justify-around items-center w-full text-white mt-12 h-[400px] overflow-auto'>
                            <h1 className='font-montserrat text-lg font-bold mb-5'>Diversify and Protect Your Wealth</h1>
                            <p>
                                Welcome to <strong>QMGT Convert to Crypto (QCC)</strong>, your gateway to converting Quantum Metal Gold Tokens (QMGT) into a variety of cryptocurrencies. Protect your wealth from market volatility while enjoying the flexibility and security of decentralized finance.
                            </p>
                            <h2 className='font-montserrat text-md font-bold mb-3 mt-2'>Why Choose QCC?</h2>
                            <ul>
                                <li>
                                    <strong>Diversification:</strong> Convert your QMGT into popular cryptocurrencies like Bitcoin, Ethereum, and more.
                                </li>
                                <li>
                                    <strong>Wealth Protection:</strong> Shield your assets from market volatility by diversifying into stable and promising digital currencies.
                                </li>
                                <li>
                                    <strong>Secure Transactions:</strong> Enjoy the peace of mind that comes with secure and transparent blockchain transactions.
                                </li>
                            </ul>
                            <h2 className='font-montserrat text-md font-bold mb-3 mt-2'>How It Works:</h2>
                            <ol>
                                <li>
                                    <strong>Select Your Crypto:</strong> Choose from a wide range of supported cryptocurrencies to convert your QMGT into.
                                </li>
                                <li>
                                    <strong>Instant Conversion:</strong> Easily convert your QMGT into your selected cryptocurrency with just a few clicks.
                                </li>
                                <li>
                                    <strong>Diversify and Protect:</strong> Diversify your portfolio and protect your wealth from market fluctuations.
                                </li>
                                <li>
                                    <strong>Manage Your Assets:</strong> Track and manage your new cryptocurrency holdings through our user-friendly platform.
                                </li>
                            </ol>
                        </div>
                        <div className='text-primary mt-2 mb-2'>
                        Join the QCC program today and take control of your financial future by diversifying and securing your wealth in the dynamic world of ​cryptocurrencies.
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

export default ToCryptoModal;
