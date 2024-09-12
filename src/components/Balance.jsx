import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

const Balance = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

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

  if (!isOpen) return null;

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

  const totalValue = balances.reduce((sum, coin) => sum + coin.value, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center sm:justify-end sm:items-start">
      <div
        ref={modalRef}
        className="bg-accent text-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-md sm:mt-4 sm:mr-4 sm:absolute sm:top-0 sm:right-0"
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Total cash value</h2>
            <button onClick={onClose} className="text-white hover:text-primary">
              <X size={20} />
            </button>
          </div>
          <div className="text-3xl font-bold mb-2">
            ${totalValue.toFixed(2)} USD
          </div>
          <div className="text-red-400 text-sm mb-4">-8.19% Last day</div>
          <div className="space-y-2">
            {balances.map((coin) => (
              <div
                key={coin.symbol}
                className="flex justify-between items-center"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: coin.color }}
                  >
                    {coin.symbol[0]}
                  </div>
                  <span>{coin.name}</span>
                </div>
                <div className="text-right">
                  <div>${coin.value.toFixed(2)}</div>
                  <div className="text-red-400 text-xs">
                    {coin.change.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
