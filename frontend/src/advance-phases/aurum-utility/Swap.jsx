import React from "react";

const Swap = ({ usdtAmount, qmgtAmount, handleSwap, setStep }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    handleSwap(value);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Swap USDT to QMGT</h2>
      <input
        type="number"
        placeholder="Enter USDT Amount"
        value={usdtAmount}
        onChange={handleChange}
        className="border border-gray-300 p-2 mb-3 w-full rounded"
      />
      <input
        type="number"
        placeholder="Enter QMGT Amount"
        value={qmgtAmount}
        className="border border-gray-300 p-2 mb-3 w-full rounded"
        readOnly
      />
      <button
        onClick={() => setStep(1)}
        className="bg-green-500 text-white py-2 rounded w-full"
      >
        Next
      </button>
    </div>
  );
};

export default Swap;
