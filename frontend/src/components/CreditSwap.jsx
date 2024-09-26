import React, { useState } from "react";
import { ArrowDown } from "lucide-react";
import QMLogo from "../assets/token.png";
import PHPLogo from "../assets/php.png";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { depositFiat } from "../services/deposit.service";

const CreditSwap = () => {
  const [phpAmount, setPhpAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhpAmountChange = (e) => {
    setPhpAmount(e.target.value);
  };

  const handlePurchase = async () => {
    if (!phpAmount || parseFloat(phpAmount) <= 0) {
      toast.error("Please enter a valid PHP amount");
      return;
    }

    setLoading(true);
    try {
      const response = await depositFiat({ amount: parseFloat(phpAmount) });
      console.log("Deposit response:", response);
      toast.success("Purchase successful!");
      setPhpAmount("");
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
            placeholder="0.00"
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
        <button
          onClick={handlePurchase}
          disabled={loading}
          className="w-full h-[50px] text-lg hover:bg-primary rounded-lg mt-4 bg-golden text-white border-2 border-gray-700 cursor-pointer"
        >
          {loading ? <Loading /> : "Purchase"}
        </button>
      </div>
    </div>
  );
};

export default CreditSwap;
