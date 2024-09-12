import React, { useContext, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";
import { getTokenBalance } from "../services/swap.service";
import { getUserBalances } from "../services/users.service";
import { TOKENAddress, USDTAddress } from "../addresses";
import { formatEther } from "ethers";
const balances = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      value: 8816.2,
      change: -8.91,
      color: "#F7931A",
    },
    {
      name: "Bitcoin Cash",
      symbol: "BCH",
      value: 320.17,
      change: -8.2,
      color: "#8DC351",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      value: 229.22,
      change: -8.25,
      color: "#627EEA",
    },
    { name: "XRP", symbol: "XRP", value: 0.23, change: -9.0, color: "#23292F" },
  ];

const Balance = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const { profile } = useContext(AuthContext);
  const [tokenBalance, setTokenBalance] = useState("0")
  const [usdtBalance, setUsdtBalance] = useState("0")

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if(!profile) return 

    getTokenBalance(TOKENAddress, profile.walletAddress).then((tokenBalance) => {
      setTokenBalance(formatEther(tokenBalance))
    })
    getTokenBalance(USDTAddress, profile.walletAddress).then((tokenBalance) => {
      setUsdtBalance(formatEther(tokenBalance))
    })

  }, [profile])



  if (!isOpen) return null;

  

  const totalValue = balances.reduce((sum, coin) => sum + coin.value, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center sm:justify-end sm:items-start">
      <div
        ref={modalRef}
        className="bg-accent text-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-md sm:mt-4 sm:mr-4 sm:absolute sm:top-0 sm:right-0"
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Token Balances</h2>
            <button onClick={onClose} className="text-white hover:text-primary">
              <X size={20} />
            </button>
          </div>
          {/* <div className="text-3xl font-bold mb-2">
            ${totalValue.toFixed(2)} USD
          </div> */}
          <div className="text-red-400 text-sm mb-4"></div>
          <div className="space-y-2">

            
              <div
                
                className="flex justify-between items-center"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: "#627EEA" }}
                  >
                    Q
                  </div>
                  <span>QMDT</span>
                </div>
                <div className="text-right">
                  <div>{tokenBalance}</div>
                  {/* <div className="text-red-400 text-xs">
                    {coin.change.toFixed(2)}%
                  </div> */}
                </div>
              </div>

              <div
                
                className="flex justify-between items-center"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: "#23292F" }}
                  >
                    U
                  </div>
                  <span>USDT</span>
                </div>
                <div className="text-right">
                  <div>{usdtBalance}</div>
                  {/* <div className="text-red-400 text-xs">
                    {coin.change.toFixed(2)}%
                  </div> */}
                </div>
              </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
