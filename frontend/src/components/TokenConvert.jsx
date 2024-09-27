import { ArrowUpDown } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import TransactionModal from "./TransactionModal";
import TransactionCompleteModal from "./TransactionCompleteModal";
import { parseEther } from "ethers";

import { TOKENAddress, USDTAddress } from "../addresses";
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

const TokenConvert = ({ fee, setFee }) => {
  const [transactionModal, setTransactionModal] = useState(false);
  const [transactionCompleteModal, setTransactionCompleteModal] =
    useState(false);
  const [transactionData, setTransactionData] = useState({});
  const [tokenIn, setTokenIn] = useState("USDT");
  const [tokenOut, setTokenOut] = useState("QMGT");
  const [amountIn, setAmountIn] = useState(null);
  const [amountOut, setAmountOut] = useState(null);
  const [changeData, setChangeData] = useState("");
  const [tokenInBal, setTokenInBal] = useState("0");
  const [tokenOutBal, setTokenOutBal] = useState("0");
  const [goldPriceUsd, setGoldPriceUsd] = useState("0");
  const [feeAmount, setFeeAmount] = useState("0");
  const [amtReceived, setAmtReceived] = useState(0);
  const [insufficientBalance, setInsufficientBalance] = useState(false);
  const { profileData, auth } = useContext(AuthContext);
  const inputRef = useRef(null);
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

  useEffect(() => {
    if (changeData !== "input") return;
    if (!amountIn || !tokenIn) {
      setAmountOut("");
      setFeeAmount("0");
      return;
    }
    getAmountOut(tokenIn.toLowerCase(), amountIn).then((res) => {
      if (tokenIn.toLowerCase() == "usdt" && parseFloat(amountIn) >= 150) {
        setFee(0.2);
        const feeAmt = (0.2 * parseFloat(amountIn)) / 100;
        setFeeAmount(feeAmt);
        //
      } else {
        if (parseFloat(res) >= 150) {
          setFee(0.2);
          const feeAmt = (0.2 * parseFloat(res)) / 100;
          setFeeAmount(feeAmt);
        } else {
          setFee(0.1);
          const feeAmt = (0.2 * parseFloat(res)) / 100;
          setFeeAmount(feeAmt);
        }
      }

      if (res) setAmountOut(res);
    });
  }, [tokenIn, amountIn]);

  useEffect(() => {
    if (changeData !== "output") return;
    if (!tokenOut || !amountOut) {
      setAmountIn("");
      setFeeAmount("0");
      return;
    }
    getAmountOut(tokenOut.toLowerCase(), amountOut).then((res) => {
      if (tokenOut.toLowerCase() == "usdt" && parseFloat(amountOut) >= 150) {
        setFee(0.2);
        const feeAmt = (0.2 * parseFloat(amountOut)) / 100;
        setFeeAmount(feeAmt);
        //
      } else {
        if (parseFloat(res) >= 150) {
          setFee(0.2);
          const feeAmt = (0.2 * parseFloat(res)) / 100;
          setFeeAmount(feeAmt);
        } else {
          setFee(0.1);
          const feeAmt = (0.1 * parseFloat(res)) / 100;
          setFeeAmount(feeAmt);
        }
      }
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

  useEffect(() => {
    if (!feeAmount) {
      setAmtReceived(0);
      return;
    }
    if (tokenOut.toLowerCase() == "usdt") {
      setAmtReceived(parseFloat(amountOut) - parseFloat(feeAmount));
    } else {
      const usdtAfterFee = parseFloat(amountIn) - parseFloat(feeAmount);

      getAmountOut("usdt", String(usdtAfterFee)).then((res) => {
        setAmtReceived(parseFloat(res));
      });
      // console.log("cjecking")
    }
  }, [feeAmount]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input field
    }
  }, []);

  return (
    // BEGIN
    //DEVNAME:Michael Trazona
    //DATE:9/16/2024
    //Re-Design the ui and enhancing using framer-motion
    <div className="mt-4">
      <div className="w-full bg-silver/10 rounded-md px-4 py-4 text-white flex items-center">
        <div className="w-1/2">
          <div className="flex items-start text-md flex-col gap-1 text-white">
            <p>You sell</p>
            <div className="flex w-40 rounded-xl gap-4 px-2 py-3 bg-ash items-center">
              <img src="/tokenLogo.png" className="w-8 rounded-full" alt="" />
              <p>QMGT</p>
            </div>
            <div className="mt-2 text-white text-xs flex gap-2">
              <p>Convert Upto 8.5 QMT</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 ">
          <input
            type="number"
            value={amountIn}
            ref={inputRef}
            placeholder="0.00"
            className="w-full text-right bg-transparent border-0 outline-none text-3xl"
            onChange={(e) => {
              setChangeData("input");
              setAmountIn(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="w-full  rounded-md px-4 py-4 text-white bg-silver/10 flex items-center mt-4">
        <div className="w-1/2 flex flex-col ">
          <div className="flex flex-col gap-2 text-md text-white items-start">
            <p>You receive</p>
            <div className="flex w-40 rounded-xl gap-4 px-2 py-3 bg-ash items-center">
              <img
                src="https://w7.pngwing.com/pngs/113/18/png-transparent-tether-hd-logo-thumbnail.png"
                className="w-8 rounded-full"
                alt=""
              />
              <p>USDT</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 ">
          <input
            type="number"
            value={amountOut}
            placeholder="0.00"
            style={{
              WebkitAppearance: "none",
              MozAppearance: "textfield",
            }}
            className="w-full text-right bg-transparent border-0 outline-none text-3xl"
            onChange={(e) => {
              setChangeData("output");
              setAmountOut(e.target.value);
            }}
          />
        </div>
      </div>
      {insufficientBalance && (
        <p className="flex justify-between text-red-500">
          <span>Insufficient Balance</span>
        </p>
      )}
      <div className="mt-4 bg-accent border-2 border-ash/30 rounded-md opacity-30 text-white p-2 px-4 text-xm font-montserrat text-xs">
        <p className="flex justify-between text-white">
          <span>Gold Price</span>
          <span className="text-white">
            1.002g per {Number(goldPriceUsd).toPrecision(4)} USDT
          </span>
        </p>
        <p className="flex justify-between mt-2">
          <span>Amount Received</span>
          <span className="text-white">
            {amtReceived ? amtReceived.toFixed(6) : 0} {tokenOut}
          </span>
        </p>
        <p className="flex justify-between mt-2">
          <span>Fee</span>
          <span className="text-white">
            {parseFloat(feeAmount).toFixed(4)} USDT {fee}%{" "}
          </span>
        </p>
      </div>
      <div className="mt-4">
        <button
          className="w-full h-[50px] text-lg hover:bg-primary rounded-lg mt-4 bg-golden text-white border-2 border-gray-700 cursor-pointer"
          disabled={insufficientBalance || !parseFloat(amountIn) || !tokenIn}
          onClick={() => {
            !auth?.isAuthenticated
              ? navigator("/signin")
              : setTransactionModal(true);
          }}
        >{`${
          !auth?.isAuthenticated
            ? "Login"
            : insufficientBalance
            ? "Insufficient Balance"
            : "Convert"
        }`}</button>
      </div>

      {transactionModal && (
        <TransactionModal
          fee={fee}
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
    // END*
  );
};

export default TokenConvert;
