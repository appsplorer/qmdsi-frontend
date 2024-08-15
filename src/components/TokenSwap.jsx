import { ArrowUpDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import TransactionModal from './TransactionModal';
import TransactionCompleteModal from './TransactionCompleteModal';
import { swapAbi } from '../abis/swapAbi';
import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { BrowserProvider, formatEther, parseEther } from 'ethers';
import { Contract } from 'ethers';
import { erc20Abi } from '../abis/erc20Abi';
import { oracleAbi} from '../abis/oracleAbi';
import { TOKENAddress, USDTAddress, oracleAddress, swapAddress } from '../addresses';
import { formatUnits } from 'ethers';

const tokens = {
    "USDT" : USDTAddress,
    "QMGT" : TOKENAddress
}

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

const TokenSwap = () => {
    const CustomOption = (props) => {
        const { innerRef, innerProps, data } = props;
        return (
            <div ref={innerRef} {...innerProps} className="custom-option">
                <img src={data.image} alt="" style={{ width: '20px', marginRight: '10px' }} />
                {data.label}
            </div>
        );
    };

    const options = [
        { value: 'USDT', label: 'USDT', image: 'https://w7.pngwing.com/pngs/113/18/png-transparent-tether-hd-logo-thumbnail.png' },
        { value: 'QMGT', label: 'QMGT', image: 'https://via.placeholder.com/20' },
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

    const [transactionModal, setTransactionModal] = useState(false);
    const [transactionCompleteModal, setTransactionCompleteModal] = useState(false);
    const [transactionData, setTransactionData] = useState({})
    const [tokenIn, setTokenIn] = useState("");
    const [tokenOut, setTokenOut] = useState("");
    const [amountIn, setAmountIn] = useState("");
    const [amountOut, setAmountOut] = useState("");
    const [changeData, setChangeData] = useState("");
    const [tokenInBal, setTokenInBal] = useState("0")
    const [tokenOutBal, setTokenOutBal] = useState("0")
    const [goldPriceUsd, setGoldPriceUsd] = useState("0")
    const { address } = useWeb3ModalAccount();
    const { open } = useWeb3Modal();
    const [insufficientBalance, setInsufficientBalance] = useState(false);
    const { walletProvider } = useWeb3ModalProvider();

    const checkBalance = async (token, owner) => {
        const provider = new BrowserProvider(walletProvider);
        const tokenContract = new Contract(token, erc20Abi, provider);
        const balance = await tokenContract.balanceOf(owner);
        return balance;
    };

    const closeModal = () => {
        setTransactionModal(false);
    };

    const closeTransactionCompleteModal = () => {
        setTransactionCompleteModal(false);
    };

    const transactionSubmit = () => {
        setTransactionModal(false);
        // transaction Completion Code Here

        setTransactionCompleteModal(true);
    };

    const getAmountOut = async (tokenIn, amountIn) => {
        const provider = new BrowserProvider(walletProvider);
        const contract = new Contract(swapAddress, swapAbi, provider);

        if (tokenIn === "usdt") {
            const res = await contract.getQmgtAmount(parseEther(amountIn));
            return formatEther(res);
        } else {
            const res = await contract.getUsdAmount(parseEther(amountIn));
            return formatEther(res);
        }
    };

    useEffect(() => {
        if(!walletProvider) return 
        const provider = new BrowserProvider(walletProvider)
        const priceFeedContract = new Contract(oracleAddress, oracleAbi, provider)
        priceFeedContract.latestRoundData().then((res) => {
            const goldPrice = formatUnits(res[1]  / 31n, 18)
            setGoldPriceUsd(goldPrice)
        })

    }, [walletProvider])

    const handleSwap = () => {
        setTokenIn(tokenOut);
        setTokenOut(tokenIn);
        setAmountIn(amountOut);
        setAmountOut(amountIn);
        setChangeData("input");
    };

    useEffect(() => {
        if (changeData !== "input") return;
        if (!amountIn || !tokenIn) {
            setAmountOut("");
            return;
        }
        getAmountOut(tokenIn.toLowerCase(), amountIn).then((res) => {
            if (res) setAmountOut(res);
        });
    }, [tokenIn, amountIn]);

    useEffect(() => {
        if (changeData !== 'output') return;
        if (!tokenOut || !amountOut) {
            setAmountIn("");
            return;
        }
        getAmountOut(tokenOut.toLowerCase(), amountOut).then((res) => {
            if (res) setAmountIn(res);
        });
    }, [tokenOut, amountOut]);

    useEffect(() => {
        if (!tokenIn || !amountIn || !address) {
            setInsufficientBalance(false);
            return;
        }
        const token = tokens[tokenIn];

        checkBalance(token, address).then((balance) => {
            if (parseEther(amountIn) > balance) {
                setInsufficientBalance(true);
            } else {
                setInsufficientBalance(false);
            }
        });
    }, [tokenIn, amountIn]);

    useEffect(() => {
        if(!tokenIn || !address) return 
        
        const provider = new BrowserProvider(walletProvider)
        
        const tokenAddress = tokens[tokenIn]
        const tokenContract = new Contract(tokenAddress, erc20Abi, provider)
    
        const interValId = setInterval(async () => {
            const [balance, decimals] = await Promise.all([tokenContract.balanceOf(address), tokenContract.decimals()]) 
            setTokenInBal(formatUnits(balance, decimals))
        }, 5000)
    
        return () => clearInterval(interValId) 
    
    }, [tokenIn, walletProvider, address])

    useEffect(() => {
        if(!tokenOut || !address) return 
        
        const provider = new BrowserProvider(walletProvider)
        
        const tokenAddress = tokens[tokenOut]
        const tokenContract = new Contract(tokenAddress, erc20Abi, provider)
    
        const interValId = setInterval(async () => {
            const [balance, decimals] = await Promise.all([tokenContract.balanceOf(address), tokenContract.decimals()]) 
            setTokenOutBal(formatUnits(balance, decimals))
        }, 3000)
    
        return () => clearInterval(interValId) 
    
    }, [tokenOut, walletProvider, address])

    return (
        <div className='mt-4'>
            <div className='w-full bg-accent rounded-md px-4 py-4 text-white flex items-center'>
                <div className='w-1/2'>
                    <div className='flex gap-4 items-end'>
                        <input type='text' value={amountIn} className='w-[80px] bg-transparent border-0 outline-none text-3xl'
                            onChange={(e) => {
                                setChangeData("input");
                                setAmountIn(e.target.value);
                            }} />
                        <button className='text-secondary text-sm'>MAX</button>
                    </div>
                    <div className='mt-2 text-secondary text-xs'>Balance: {`${Number(tokenInBal).toFixed(4)}`}</div>
                </div>
                <div className='w-1/2 '>
                    <Select
                        options={options}
                        value={options.find(option => option.value === tokenIn)} // Set value for select
                        components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                        styles={customStyles}
                        placeholder="Select an option"
                        onChange={(e) => {
                            setChangeData("input");
                            setTokenIn(e.value);
                        }}
                    />
                </div>
            </div>
            <button className='p-1 -mt-2 m-auto border-primary border-2 rounded-full text-primary flex justify-between items-center absolute left-[50%] translate-x-[-50%]' id="swaping-value"
                onClick={handleSwap}>
                <ArrowUpDown />
            </button>
            <div className='w-full bg-accent rounded-md px-4 py-4 text-white flex items-center mt-4'>
                <div className='w-1/2'>
                    <div className='flex gap-4 items-end'>
                        <input type='text' value={amountOut} className='w-[80px] bg-transparent border-0 outline-none text-3xl'
                            onChange={(e) => {
                                setChangeData("output");
                                setAmountOut(e.target.value);
                            }} />
                        <button className='text-secondary text-sm'>MAX</button>
                    </div>
                    <div className='mt-2 text-secondary text-xs'>Balance:{`${Number(tokenOutBal).toFixed(4)}`}</div>
                </div>
                <div className='w-1/2 '>
                    <Select
                        options={options}
                        value={options.find(option => option.value === tokenOut)} // Set value for select
                        components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                        styles={customStyles}
                        onChange={(e) => {
                            setChangeData("output");
                            setTokenOut(e.value);
                        }}
                        placeholder="Select an option"
                    />
                </div>

            </div>
            {insufficientBalance && <p className='flex justify-between text-red-500'><span>Insufficient Balance</span></p>}
            <div className='mt-4 bg-accent opacity-30 text-white p-2 px-4 text-xm font-montserrat text-xs'>
                <p className='flex justify-between'><span>Gold Price</span><span className='text-white'>1.002g per {Number(goldPriceUsd).toPrecision(4)}  USDT</span></p>
                {/* <p className='flex justify-between mt-2'><span>Minimum Received</span><span className='text-white'>100 QMGT</span></p>
                <p className='flex justify-between mt-2'><span>Price Impact</span><span className='text-white'>0.001</span></p>
                <p className='flex justify-between mt-2'><span>Liquidity Provider Fee</span><span className='text-white'>0.000063 USDT</span></p> */}
            </div>
            <div>
                <button className='w-full h-[50px] bg-primary rounded mt-4 hover:bg-secondary' disabled={insufficientBalance}
                    onClick={() => {
                        !address ? open() : setTransactionModal(true)
                    }}
                >{`${!address ? "Connect Wallet" : insufficientBalance ? "Insufficient Balance" : "Swap"}`}</button>
            </div>

            {transactionModal && <TransactionModal
                closeModal={closeModal}
                transactionComplete={transactionSubmit}
                tokenIn={tokenIn}
                amountIn={amountIn}
                tokenOut={tokenOut}
                amountOut={amountOut}
                setTransactionData={setTransactionData}
                setTransactionCompleteModal={setTransactionCompleteModal}
            />
            }
            {transactionCompleteModal && <TransactionCompleteModal closeModal={closeTransactionCompleteModal} data={transactionData} />}
        </div>
    );
};

export default TokenSwap;
