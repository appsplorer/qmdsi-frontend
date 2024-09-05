import { ArrowUpDown } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import TransactionModal from "./TransactionModal";
import TransactionCompleteModal from "./TransactionCompleteModal";

import {parseEther } from "ethers";

import {
  TOKENAddress,
  USDTAddress,
} from "../addresses";
import { formatUnits } from "ethers";
import { AuthContext } from "../contexts/AuthContext";

import {
  getAmountOut,
  getGoldPrice,
  getTokenBalance,
  getTokenDecimals,
} from "../services/swap.service";

const tokens = {
  USDT: USDTAddress,
  QMGT: TOKENAddress,
};

// Custom single value component
const CustomSingleValue = (props) => {
  const { data } = props;
  return (
    <div className="custom-single-value">
      <img
        src={data.image}
        alt=""
        style={{ width: "20px", marginRight: "10px" }}
      />
      {data.label}
    </div>
  );
};

const TokenSwap = () => {
  const CustomOption = (props) => {
    const { innerRef, innerProps, data } = props;
    return (
      <div ref={innerRef} {...innerProps} className="custom-option">
        <img
          src={data.image}
          alt=""
          style={{ width: "20px", marginRight: "10px" }}
        />
        {data.label}
      </div>
    );
  };

  const options = [
    {
      value: "USDT",
      label: "USDT",
      image:
        "https://w7.pngwing.com/pngs/113/18/png-transparent-tether-hd-logo-thumbnail.png",
    },
    { value: "QMGT", label: "QMGT", image: "https://via.placeholder.com/20" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#1E1E20",
      borderColor: "#1E1E20",
      minHeight: "50px",
      height: "50px",
      outline: "none",
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "40px",
      display: "flex",
      alignItems: "center",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "50px",
      borderColor: "#1E1E20",
    }),
    indicatorSeparator: (provided) => ({
      display: "none", // Removes the left border line
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1E1E20", // Background color of the menu
      borderRadius: "5px",
      marginTop: "0px",
      padding: "5px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "blue"
        : state.isFocused
        ? "lightblue"
        : "white", // Background color on hover and selection
      color: state.isSelected ? "white" : "black", // Text color
      padding: "10px",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    }),
  };

  const [transactionModal, setTransactionModal] = useState(false);
  const [transactionCompleteModal, setTransactionCompleteModal] =
    useState(false);
  const [transactionData, setTransactionData] = useState({});
  const [tokenIn, setTokenIn] = useState("USDT");
  const [tokenOut, setTokenOut] = useState("QMGT");
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");
  const [changeData, setChangeData] = useState("");
  const [tokenInBal, setTokenInBal] = useState("0");
  const [tokenOutBal, setTokenOutBal] = useState("0");
  const [goldPriceUsd, setGoldPriceUsd] = useState("0");
  
  const [insufficientBalance, setInsufficientBalance] = useState(false);
  const { profileData, auth } = useContext(AuthContext);
  const navigator = useNavigate();

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

  useEffect(() => {
  
    getGoldPrice().then((goldPrice) => {
      setGoldPriceUsd(goldPrice);
    });
  }, []);

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
    if (changeData !== "output") return;
    if (!tokenOut || !amountOut) {
      setAmountIn("");
      return;
    }
    getAmountOut(tokenOut.toLowerCase(), amountOut).then((res) => {
      if (res) setAmountIn(res);
    });
  }, [tokenOut, amountOut]);

  useEffect(() => {
    if (!tokenIn || !amountIn || !profileData?.walletAddress) {
      setInsufficientBalance(false);
      return;
    }
    const token = tokens[tokenIn];

    getTokenBalance(token, profileData.walletAddress).then((balance) => {
      if (parseEther(amountIn) > balance) {
        setInsufficientBalance(true);
      } else {
        setInsufficientBalance(false);
      }
    });
  }, [tokenIn, amountIn]);

  useEffect(() => {
    if (!tokenIn || !profileData?.walletAddress) return;
    const tokenAddress = tokens[tokenIn];

    const interValId = setInterval(async () => {
      const [balance, decimals] = await Promise.all([
        getTokenBalance(tokenAddress, profileData.walletAddress),
        getTokenDecimals(tokenAddress),
      ]);
      setTokenInBal(formatUnits(balance, decimals));
    }, 5000);

    return () => clearInterval(interValId);
  }, [tokenIn, profileData?.walletAddress]);

  useEffect(() => {
    if (!tokenOut || !profileData?.walletAddress) return;

    const tokenAddress = tokens[tokenOut];

    const interValId = setInterval(async () => {
      const [balance, decimals] = await Promise.all([
        getTokenBalance(tokenAddress, profileData.walletAddress),
        getTokenDecimals(tokenAddress),
      ]);
      setTokenOutBal(formatUnits(balance, decimals));
    }, 3000);

    return () => clearInterval(interValId);
  }, [tokenOut, profileData?.walletAddress]);

  return (
    <div className="mt-4">
      <div className="w-full bg-accent rounded-md px-4 py-4 text-white flex items-center">
        <div className="w-1/2">
          <div className="flex gap-4 items-end">
            <input
              type="text"
              value={amountIn}
              className="w-[80px] bg-transparent border-0 outline-none text-3xl"
              onChange={(e) => {
                setChangeData("input");
                setAmountIn(e.target.value);
              }}
            />
            <button className="text-secondary text-sm">MAX</button>
          </div>
          <div className="mt-2 text-secondary text-xs">
            Balance: {`${Number(tokenInBal).toFixed(4)}`}
          </div>
        </div>
        <div className="w-1/2 ">
          <Select
            options={options}
            value={options.find((option) => option.value === tokenIn)} // Set value for select
            components={{
              Option: CustomOption,
              SingleValue: CustomSingleValue,
            }}
            styles={customStyles}
            placeholder="Select an option"
            onChange={(e) => {
              setChangeData("input");
              setTokenIn(e.value);
            }}
          />
        </div>
      </div>
      <button
        className="p-1 -mt-2 m-auto border-primary border-2 rounded-full text-primary flex justify-between items-center absolute left-[50%] translate-x-[-50%]"
        id="swaping-value"
        onClick={handleSwap}
      >
        <ArrowUpDown />
      </button>
      <div className="w-full bg-accent rounded-md px-4 py-4 text-white flex items-center mt-4">
        <div className="w-1/2">
          <div className="flex gap-4 items-end">
            <input
              type="text"
              value={amountOut}
              className="w-[80px] bg-transparent border-0 outline-none text-3xl"
              onChange={(e) => {
                setChangeData("output");
                setAmountOut(e.target.value);
              }}
            />
            <button className="text-secondary text-sm">MAX</button>
          </div>
          <div className="mt-2 text-secondary text-xs">
            Balance:{`${Number(tokenOutBal).toFixed(4)}`}
          </div>
        </div>
        <div className="w-1/2 ">
          <Select
            options={options}
            value={options.find((option) => option.value === tokenOut)} // Set value for select
            components={{
              Option: CustomOption,
              SingleValue: CustomSingleValue,
            }}
            styles={customStyles}
            onChange={(e) => {
              setChangeData("output");
              setTokenOut(e.value);
            }}
            placeholder="Select an option"
          />
        </div>
      </div>
      {insufficientBalance && (
        <p className="flex justify-between text-red-500">
          <span>Insufficient Balance</span>
        </p>
      )}
      <div className="mt-4 bg-accent opacity-30 text-white p-2 px-4 text-xm font-montserrat text-xs">
        <p className="flex justify-between">
          <span>Gold Price</span>
          <span className="text-white">
            1.002g per {Number(goldPriceUsd).toPrecision(4)} USDT
          </span>
        </p>
        {/* <p className='flex justify-between mt-2'><span>Minimum Received</span><span className='text-white'>100 QMGT</span></p>
                <p className='flex justify-between mt-2'><span>Price Impact</span><span className='text-white'>0.001</span></p>
                <p className='flex justify-between mt-2'><span>Liquidity Provider Fee</span><span className='text-white'>0.000063 USDT</span></p> */}
      </div>
      <div>
        <button
          className="w-full h-[50px] bg-primary rounded mt-4 hover:bg-secondary"
          disabled={insufficientBalance || !parseFloat(amountIn) || !tokenIn}
          onClick={() => {
            !auth.isAuthenticated ? navigator("/signin") : setTransactionModal(true);
          }}
        >{`${
          !auth?.isAuthenticated
            ? "Login"
            : insufficientBalance
            ? "Insufficient Balance"
            : "Swap"
        }`}</button>
      </div>

      {transactionModal && (
        <TransactionModal
          closeModal={closeModal}
          transactionComplete={transactionSubmit}
          tokenIn={tokenIn}
          amountIn={amountIn}
          tokenOut={tokenOut}
          amountOut={amountOut}
          setTransactionData={setTransactionData}
          setTransactionCompleteModal={setTransactionCompleteModal}
        />
      )}
      {transactionCompleteModal && (
        <TransactionCompleteModal
          closeModal={closeTransactionCompleteModal}
          data={transactionData}
        />
      )}
    </div>
  );
};

export default TokenSwap;
