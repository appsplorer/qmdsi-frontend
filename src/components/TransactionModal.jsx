import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { Contract, MaxUint256, parseEther } from 'ethers';
import { BrowserProvider } from 'ethers';
import { CircleDivideIcon, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {erc20Abi} from "../abis/erc20Abi"
import { swapAbi } from '../abis/swapAbi';
import Loader from './Loader';
import { TOKENAddress, USDTAddress, swapAddress } from '../addresses';
import Countdown from 'react-countdown';


const tokens = {
    "USDT" : USDTAddress,
    "QMGT" : TOKENAddress
}

const spender = swapAddress

const TransactionModal = ({ closeModal,transactionComplete, tokenIn, amountIn, amountOut, tokenOut, setTransactionCompleteModal, setTransactionData}) => {
   
    const [tab, setTab] = useState('Details'); // Correctly defining the state and setState function
    const [needApproval, setNeedApproval] = useState(false)
    const [loading, setLoading] = useState(false)
    const [key, setKey] = useState(1)
    const [loadingMsg, setLoadingMsg] = useState("")
    const [amtOut, setAmtOut] = useState(amountOut)
    const { walletProvider } = useWeb3ModalProvider()
    const {address} = useWeb3ModalAccount()

    const checkAllowanceAndBalance = async (token, owner) => {
        const provider = new BrowserProvider(walletProvider)
        const tokenContract = new Contract(token, erc20Abi, provider)
       
        const [allowance, balance] = await Promise.all([tokenContract.allowance(owner, spender),
             tokenContract.balanceOf(owner)]) 
    
        return {allowance, balance}
    }


    useEffect(() => {
        // const token = tokens[tokenIn]
        // checkAllowanceAndBalance(token, address).then(({allowance, balance}) => {
        //     setNeedApproval(allowance < balance)
        // })
        
    }, [tokenIn, amountIn])
    
    const handleBuy = async () => {
        setLoading(true)
        setLoadingMsg(`Swapping ${tokenIn} for ${tokenOut}`)
        



        // const provider = new BrowserProvider(walletProvider)
        // const signer = await provider.getSigner()
        // const contract = new Contract(swapAddress, swapAbi, signer)
        // try{
        //     let res 
        //     if(tokenIn == "USDT"){
        //         console.log("Buying")
        //         res = await contract.buyQmgt(parseEther(amountIn))
        //     }else{
        //         res = await contract.sellQmgt(parseEther(amountIn))
        //     }
        // await provider.waitForTransaction(res.hash)
        
        // setTransactionData({hash : res.hash, tokenIn, amountIn, tokenOut, amountOut })
        // setTransactionCompleteModal(true)
        // closeModal()
        // }catch(e){
        //     console.log(e) 
        // }
        
        // setLoading(false)
        // setLoadingMsg("")
        // const {allowance, balance} = await checkAllowanceAndBalance(token, address)
        // console.log(allowance, balance)
        // console.log(tokenIn, amountIn)
    }
    const handleApproval = async () => {
        setLoading(true)
        setLoadingMsg("Approving Token")
        
        try{
            const token = tokens[tokenIn]
            const provider = new BrowserProvider(walletProvider)
            const signer = await provider.getSigner()
            const tokenContract = new Contract(token, erc20Abi, signer)
            const res = await tokenContract.approve(spender, MaxUint256)
            await provider.waitForTransaction(res.hash)
            console.log(res)
            setNeedApproval(false)
            setLoading(false)
            setLoadingMsg("")
        }catch(e){
            console.log(e)
            setLoading(false)
        }
        
        
    }
    
    const refreshPrice = async () => {
        const provider = new BrowserProvider(walletProvider)
        const contract = new Contract(swapAddress , swapAbi, provider)
        if(tokenIn.toLowerCase() == "usdt"){

        }else{

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
                            <button
                                className={tab === 'Data' ? 'font-bold border-b-2 border-white' : ''}
                                onClick={() => setTab('Data')}
                            >
                                Data
                            </button>
                        </div>
                        <hr className='border-gray-400'></hr>
                        {/* {tab === 'Details' && (
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
                        )} */}
                        {/* {tab === 'Data' && (
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
                        )} */}
                        <div className='w-full gap-4 flex mt-12'>
                            <button className='w-1/2 h-[50px] border rounded-md border-primary text-primary mb-2 hover:bg-secondary hover:text-black'  onClick={closeModal}>Reject</button>
                            {needApproval && <button className='w-1/2 h-[50px] border rounded-md border-primary bg-primary text-black hover:bg-secondary' 
                            onClick={handleApproval} disabled={loading}>{`${loading ? loadingMsg : `Approve ${tokenIn}`}`}</button>
                            }
                            {!needApproval && <button className='w-1/2 h-[50px] border rounded-md border-primary bg-primary text-black hover:bg-secondary' 
                            onClick={handleBuy} disabled={loading}>{`${loading ? loadingMsg : "Confirm"}`}</button>}
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
