import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TransactionModal from "./TransactionModal";
import Select from "react-select";
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

import { getUserBalances } from "../services/users.service";
import customStyles from "../styles/Token";

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

const TokenSwap = ({ fee, setFee }) => {
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
    { value: "QMGT", label: "QMGT", image: "../../aurun_favi.png" },
  ];

  const [transactionModal, setTransactionModal] = useState(false);
  const [transactionCompleteModal, setTransactionCompleteModal] =
    useState(false);
  const [transactionData, setTransactionData] = useState({});
  const [tokenIn, setTokenIn] = useState("USDT");
  const [tokenOut, setTokenOut] = useState("QMGT");
  const [amountIn, setAmountIn] = useState(0);
  const [amountOut, setAmountOut] = useState(0);
  const [changeData, setChangeData] = useState("");
  const [tokenInBal, setTokenInBal] = useState("0");
  const [tokenOutBal, setTokenOutBal] = useState("0");
  const [goldPriceUsd, setGoldPriceUsd] = useState("0");
  const [feeAmount, setFeeAmount] = useState("0");
  const [amtReceived, setAmtReceived] = useState(0);
  const [userBalances, setUserBalances] = useState({ qmgt: 0, usdt: 0 });
  const [insufficientBalance, setInsufficientBalance] = useState(false);
  const { profile, auth } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const fetchBalances = async (userId) => {
    try {
      const balances = await getUserBalances(userId);

      if (balances) {
        setUserBalances(balances);
      }
    } catch (error) {
      console.error("Error fetching balances: ", error);
    }
  };

  useEffect(() => {
    if (profile?.id) {
      fetchBalances(profile.id);
    }
  }, [profile?.id, userBalances]);

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
    if (!tokenIn || !amountIn || !profile?.walletAddress) {
      setInsufficientBalance(false);
      return;
    }
    const token = tokens[tokenIn];

    getTokenBalance(token, profile.walletAddress).then((balance) => {
      if (parseEther(amountIn) > balance) {
        setInsufficientBalance(true);
      } else {
        setInsufficientBalance(false);
      }
    });
  }, [tokenIn, amountIn]);

  useEffect(() => {
    if (!tokenIn || !profile?.walletAddress) return;
    const tokenAddress = tokens[tokenIn];

    Promise.all([
      getTokenBalance(tokenAddress, profile.walletAddress),
      getTokenDecimals(tokenAddress),
    ]).then((data) => {
      const [balance, decimals] = data;
      setTokenInBal(formatUnits(balance, decimals));
    });

    const interValId = setInterval(async () => {
      const [balance, decimals] = await Promise.all([
        getTokenBalance(tokenAddress, profile.walletAddress),
        getTokenDecimals(tokenAddress),
      ]);
      setTokenInBal(formatUnits(balance, decimals));
    }, 3000);

    return () => clearInterval(interValId);
  }, [tokenIn, profile?.walletAddress]);

  useEffect(() => {
    if (!tokenOut || !profile?.walletAddress) return;

    const tokenAddress = tokens[tokenOut];

    Promise.all([
      getTokenBalance(tokenAddress, profile.walletAddress),
      getTokenDecimals(tokenAddress),
    ]).then((res) => {
      const [balance, decimals] = res;
      setTokenOutBal(formatUnits(balance, decimals));
    });

    const interValId = setInterval(async () => {
      const [balance, decimals] = await Promise.all([
        getTokenBalance(tokenAddress, profile.walletAddress),
        getTokenDecimals(tokenAddress),
      ]);
      setTokenOutBal(formatUnits(balance, decimals));
    }, 3000);

    return () => clearInterval(interValId);
  }, [tokenOut, profile?.walletAddress]);

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
    }
  }, [feeAmount]);

  return (
    <div className="mt-4">
      <div className="w-full bg-silver/10 rounded-md px-4 py-4 text-white flex items-center">
        <div className="w-1/2">
          <div className="flex items-start text-md flex-col gap-1 text-white">
            <p>You sell</p>
            <Select
              options={options}
              components={{
                SingleValue: CustomSingleValue,
                Option: CustomOption,
              }}
              onChange={(selectedOption) => {
                setTokenIn(selectedOption.value);
                setTokenOut(selectedOption.value === "USDT" ? "QMGT" : "USDT");
              }}
              styles={customStyles}
              value={options.find((option) => option.value === tokenIn)}
            />
            <div className="mt-2 text-white text-xs flex gap-2">
              <p>
                Balance:{" "}
                {tokenIn === "USDT"
                  ? userBalances.usdt
                  : tokenIn === "QMGT"
                  ? userBalances.qmgt
                  : 0}
              </p>
              <button className="border-none text-white font-semibold">
                Max
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/2 ">
          <input
            type="number"
            value={amountIn}
            placeholder="0.00"
            className="w-full text-right bg-transparent border-0 outline-none text-3xl"
            onChange={(e) => {
              setChangeData("input");
              setAmountIn(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="w-full rounded-md px-4 py-4 text-white bg-silver/10 flex items-center mt-4">
        <div className="w-1/2 flex flex-col ">
          <div className="flex flex-col gap-2 text-md text-white items-start">
            <p>You receive</p>
            <Select
              options={options}
              components={{
                SingleValue: CustomSingleValue,
                Option: CustomOption,
              }}
              onChange={(selectedOption) => {
                setTokenOut(selectedOption.value);
                setTokenIn(selectedOption.value === "USDT" ? "QMGT" : "USDT");
              }}
              styles={customStyles}
              value={options.find((option) => option.value === tokenOut)}
            />
            <div className="mt-2 text-white text-xs flex gap-2">
              <p>
                Balance:{" "}
                {tokenOut === "USDT"
                  ? userBalances.usdt
                  : tokenOut === "QMGT"
                  ? userBalances.qmgt
                  : 0}
              </p>
              <button className="border-none text-white font-semibold">
                Max
              </button>
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
        {!auth?.isAuthenticated ? (
          <Link to="/signin" className="w-full block">
            <button className="w-full h-[50px] text-lg hover:bg-primary rounded-lg mt-4 bg-golden text-white border-2 border-gray-700 cursor-pointer">
              Login
            </button>
          </Link>
        ) : (
          <button
            className="w-full h-[50px] text-lg hover:bg-primary rounded-lg mt-4 bg-golden text-white border-2 border-gray-700 cursor-pointer"
            disabled={insufficientBalance || !parseFloat(amountIn) || !tokenIn}
            onClick={() => {
              if (!insufficientBalance && parseFloat(amountIn) && tokenIn) {
                setTransactionModal(true);
              }
            }}
          >
            {insufficientBalance ? "Insufficient Balance" : "Convert"}
          </button>
        )}

        {!auth?.isAuthenticated && (
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-white text-sm tracking-wider">
                Don&rsquo;t have an Account?{" "}
              </span>{" "}
              <Link to="/signup" className="text-primary tracking-wider">
                Sign Up
              </Link>
            </div>
          </div>
        )}
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

export default TokenSwap;
