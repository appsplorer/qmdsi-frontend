import React, { useState, useEffect, useContext } from "react";
import { ArrowDown } from "lucide-react";
import QMLogo from "../assets/token.png";
import PHPLogo from "../assets/php.png";
import { toast } from "react-toastify";
import { depositFiat, getRate } from "../services/deposit.service";
import { getAmountOut } from "../services/swap.service";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const CreditSwap = ({ setLoading }) => {
  const [phpAmount, setPhpAmount] = useState("");
  const [qmgtAmount, setQmgtAmount] = useState("0.00");
  const [rate, setRate] = useState(0);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    fetchRate();
  }, []);

  const fetchRate = async () => {
    try {
      const rateResponse = await getRate();
      setRate(rateResponse.rate);
    } catch (error) {
      console.error("Error fetching rate:", error);
      toast.error("Failed to fetch exchange rate");
    }
  };

  const getQmgtAmount = async (usdtAmount) => {
    const qmgtAmount = await getAmountOut("usdt", usdtAmount);
    return qmgtAmount;
  };

  const handlePhpAmountChange = async (e) => {
    const amount = e.target.value;
    setPhpAmount(amount);
    if (amount && parseFloat(amount) > 0) {
      const usdtAmount = (parseFloat(amount) * rate).toString();
      try {
        const calculatedQmgtAmount = await getQmgtAmount(usdtAmount);
        setQmgtAmount(calculatedQmgtAmount);
      } catch (error) {
        toast.error("Failed to calculate QMGT amount");
        setQmgtAmount("0.00");
      }
    } else {
      setQmgtAmount("0.00");
    }
  };

  const handlePurchase = async () => {
    if (!auth.isAuthenticated) {
      toast.error("Please log in to make a purchase");
      return;
    }

    if (!phpAmount || parseFloat(phpAmount) <= 0) {
      toast.error("Please enter a valid PHP amount");
      return;
    }

    setLoading(true);
    try {
      const response = await depositFiat({ amount: parseFloat(phpAmount) });
      console.log("Deposit response:", response);
      toast.success(
        "Payment initiated, You will be redirected in few minutes!"
      );
      setPhpAmount("");
      setQmgtAmount("0.00");

      if (response.url) {
        window.location.href = response.url;
      } else {
        toast.warn("Redirect URL not provided in the response");
      }
    } catch (error) {
      toast.error(error?.detail || "Deposit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="w-full bg-silver/10 rounded-md px-4 py-4 text-white flex items-center">
        <div className="w-1/2">
          <div className="flex items-start text-md flex-col gap-1 text-white">
            <p>Convert Your</p>
            <div className="flex w-40 rounded-xl gap-4 px-2 py-3 bg-ash items-center">
              <img src={PHPLogo} className="w-8 rounded-full" alt="" />
              <p>PHP</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 ">
          <input
            type="number"
            placeholder="0.00"
            value={phpAmount}
            onChange={handlePhpAmountChange}
            className="w-full text-right bg-transparent border-0 outline-none text-3xl"
          />
        </div>
      </div>
      <div className="relative flex justify-center">
        <button className="absolute top-1/2 transform -translate-y-1/2 p-1 border-primary border-2 rounded-full text-primary">
          <ArrowDown />
        </button>
      </div>
      <div className="w-full bg-silver/10 rounded-md px-4 py-4 text-white flex items-center mt-4">
        <div className="w-1/2 flex flex-col ">
          <div className="flex flex-col gap-2 text-md text-white items-start">
            <p>You receive</p>
            <div className="flex w-40 rounded-xl gap-4 px-2 py-3 bg-ash items-center">
              <img src={QMLogo} className="w-8" alt="" />
              <p>QMGT</p>
            </div>
            <div className="mt-2 text-white text-xs flex gap-2">
              <p>Balance: 0.00</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 ">
          <input
            type="number"
            value={qmgtAmount}
            readOnly
            style={{
              WebkitAppearance: "none",
              MozAppearance: "textfield",
            }}
            className="w-full text-right bg-transparent border-0 outline-none text-3xl"
          />
        </div>
      </div>
      <div className="mt-4 bg-accent border-2 border-ash/30 rounded-md opacity-30 text-white p-2 px-4 text-xm font-montserrat text-xs">
        <p className="flex justify-between text-white">
          <span>Gold Price</span>
          <span className="text-white">1.002g per 1 USD</span>
        </p>
        <p className="flex justify-between mt-2">
          <span>Minimum Received</span>
          <span className="text-white">100 QMGT</span>
        </p>
        <p className="flex justify-between mt-2">
          <span>Price Impact</span>
          <span className="text-white">0.001</span>
        </p>
        <p className="flex justify-between mt-2">
          <span>Liquidity Provider Fee</span>
          <span className="text-white">0.000063 USDT</span>
        </p>
      </div>
      <div className="mt-4">
        {!auth.isAuthenticated ? (
          <Link to="/signin" className="w-full block">
            <button className="w-full h-[50px] text-lg hover:bg-primary rounded-lg mt-4 bg-golden text-white border-2 border-gray-700 cursor-pointer">
              Login to Purchase
            </button>
          </Link>
        ) : (
          <button
            onClick={handlePurchase}
            className="w-full h-[50px] text-lg hover:bg-primary rounded-lg mt-4 bg-golden text-white border-2 border-gray-700 cursor-pointer"
          >
            Purchase
          </button>
        )}

        {!auth.isAuthenticated && (
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
    </div>
  );
};

export default CreditSwap;
