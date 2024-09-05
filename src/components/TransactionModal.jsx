import { CircleDivideIcon, X } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Countdown from 'react-countdown';
import { swapToken } from '../services/users.service';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';





const TransactionModal = ({ closeModal, transactionComplete, tokenIn, amountIn, amountOut, tokenOut, setTransactionCompleteModal, setTransactionData}) => {
   
    const [tab, setTab] = useState('Details'); // Correctly defining the state and setState function
    const [loading, setLoading] = useState(false)
    const [key, setKey] = useState(1)
    const [loadingMsg, setLoadingMsg] = useState("")
    const [amtOut, setAmtOut] = useState(amountOut)
    
    const {auth, profileData} = useContext(AuthContext)

   


    const handleBuy = async () => {
        if(!auth) return 
        if(profileData.kycStatus != "Verified") {
            toast.warn("KYC verification required")
            return 
        }
        setLoading(true)
        setLoadingMsg(`Swapping ${tokenIn} for ${tokenOut}`)
        try{
            const res = await swapToken(auth.accessToken, tokenIn.toLowerCase(), amountIn)
            const transactionData = {...res, tokenIn, amountIn,  amountOut, tokenOut }
            closeModal()
            setTransactionData(transactionData)
            setTransactionCompleteModal(true)
            setLoading(false)
        }catch(e){
            setLoading(false)
            console.log(e)
        }    
    }
    

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            {loading && <Loader />} {/* Show spinner when loading */}
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
                            <h1 className='text-3xl font-medium'>{`${parseFloat(amountIn).toPrecision(5)} ${tokenIn}`}</h1>
                            {/* <p className='text-sm text-gray-400'>Balance: $99.43</p> */}
                        </div>
                        <div className='flex flex-col justify-around items-center w-full text-white '>
                            <p className='text-sm  text-yellow-300'>to</p>
                            <h1 className='text-3xl font-medium'>{`${parseFloat(amtOut).toPrecision(4)} ${tokenOut}`}</h1>
                        </div>
                        <div className='flex text-white w-full justify-center gap-4 text-xl font-thin mt-6'>
                            <button
                                className={tab === 'Details' ? 'font-bold border-b-2 border-white' : ''}
                                onClick={() => setTab('Details')}
                            >
                                Details
                            </button>
                            {/* <button
                                className={tab === 'Data' ? 'font-bold border-b-2 border-white' : ''}
                                onClick={() => setTab('Data')}
                            >
                                Data
                            </button> */}
                        </div>
                        <hr className='border-gray-400'></hr>
                            <div className='w-full text-white mt-4 text-sm px-4'>
                                <div className='flex justify-between mb-4'>
                                    <p>Fee</p>
                                    <div className='text-right '><p>{0.1}%</p>
                                        {/* <p className='text-gray-400'>$0.10</p> */}
                                    </div>
                                </div><div className='flex justify-between mb-4'>
                                    <div>
                                        <p>Amount</p>
                                        {/* <p className='text-gray-400'></p> */}
                                    </div>
                                    {/* <div className='text-right '><p>100 QMGT</p> */}
                                        <p className='text-gray-400'>{0.2} USDT</p>
                                    {/* </div> */}
                                </div>
                            </div>
                        
                        <div className='w-full gap-4 flex mt-12'>
                            <button className='w-1/2 h-[50px] border rounded-md border-primary text-primary mb-2 hover:bg-secondary hover:text-black'  onClick={closeModal}>Reject</button>
                            
                            <button className='w-1/2 h-[50px] border rounded-md border-primary bg-primary text-black hover:bg-secondary' 
                            onClick={handleBuy} disabled={loading}>{`${loading ? loadingMsg : "Confirm"}`}</button>
                        </div>
                        
                        <div className='flex items-center justify-center text-red-500 '>
                            <Countdown key={key} date={Date.now() + 3 * 60 *1000} onComplete={(e) => {

                                setKey((prev) => prev + 1)

                        }}/> </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionModal;
