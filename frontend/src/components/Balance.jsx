import React, { useContext, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";
import { getTokenBalance } from "../services/swap.service";
import { TOKENAddress, USDTAddress } from "../addresses";
import { formatEther } from "ethers";

const Balance = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const { profile } = useContext(AuthContext);
  const [tokenBalance, setTokenBalance] = useState("0");
  const [usdtBalance, setUsdtBalance] = useState("0");

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
    if (!profile) return;

    getTokenBalance(TOKENAddress, profile.walletAddress).then((balance) => {
      setTokenBalance(parseFloat(formatEther(balance)).toFixed(4));
    });

    getTokenBalance(USDTAddress, profile.walletAddress).then((balance) => {
      setUsdtBalance(parseFloat(formatEther(balance)).toFixed(4));
    });
  }, [profile]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center sm:justify-end sm:items-start">
      <div
        ref={modalRef}
        className="bg-accent text-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-md p-6 sm:mt-4 sm:mr-4 sm:absolute sm:top-0 sm:right-0"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Token Balances</h2>
          <button onClick={onClose} className="text-white hover:text-primary">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: "#627EEA" }}
              >
                Q
              </div>
              <span>QMGT</span>
            </div>
            <div>{tokenBalance}</div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: "#23292F" }}
              >
                U
              </div>
              <span>USDT</span>
            </div>
            <div>{usdtBalance}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
