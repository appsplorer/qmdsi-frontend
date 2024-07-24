import { CircleDivideIcon, X } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

import walletConnectLogo from '../assets/images/wallets/s3.png';
import coinBaseLogo from '../assets/images/wallets/coinbase.png';
import kiplerLogo from '../assets/images/wallets/kepler.png';
import metaMaskLogo from '../assets/images/wallets/metamask.png';

// Wallet data
const wallets = [
    {
        name: "WalletConnect",
        logo: walletConnectLogo
    },
    {
        name: "CoinBase",
        logo: coinBaseLogo
    },
    {
        name: "Kipler",
        logo: kiplerLogo
    },
    {
        name: "MetaMask",
        logo: metaMaskLogo
    }
];

const LoginModal = ({ closeModal }) => {
    console.log(wallets);
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='modal-wrapper fixed inset-0 bg-black opacity-70' onClick={closeModal}></div>
            <div className='w-full md:w-1/2 bg-accent h-[600px] z-10 rounded-md shadow-lg flex relative overflow-hidden'>
                {/* <div className='w-2/5 h-full p-4 flex flex-col justify-between'>
                    <div>
                        <h1 className='text-xl text-white'>Login or Signup</h1>
                        <p className='mt-4 text-secondary'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in tincidunt tortor. Donec consectetur bibendum consectetur. </p>
                    </div>
                    <div>
                        <Link to="/" ><button className='w-full h-[50px] border rounded-md border-primary text-primary mb-2 hover:bg-secondary hover:text-black'>Login</button></Link>
                        <Link to="/" ><button className='w-full h-[50px] border rounded-md border-primary bg-primary text-black hover:bg-secondary'>Signup</button></Link>
                    </div>
                </div> */}
                <div className='w-full h-full bg-background p-4'>
                    <div className='w-full flex justify-between items-center text-white'>
                        <h1 className='text-lg'>Connect to a Wallet</h1>
                        <button onClick={closeModal} className=''>
                            <X />
                        </button>
                    </div>
                    <div className='w-full flex flex-wrap gap-3 mt-4'>
                    {wallets?.map((wallet, index) => (
                            <button key={index} className=' flex items-center gap-4 p-2 px-6  rounded-md bg-accent hover:bg-black'>
                                <span className='text-white'>{wallet.name}</span>
                                <img src={wallet.logo} alt={`${wallet.name} logo`} className='w-8 h-8' />
                            </button>
                        ))}
                    </div>
                    {/* Add your modal content here */}
                </div>
            </div>
        </div>
    );
};

export default LoginModal;