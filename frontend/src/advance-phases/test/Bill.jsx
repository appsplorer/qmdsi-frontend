import React, { useState, useEffect } from "react";

const App = () => {
  const [step, setStep] = useState(0);
  const [usdtAmount, setUsdtAmount] = useState("");
  const [qmgtAmount, setQmgtAmount] = useState("");
  const [preservedQMGT, setPreservedQMGT] = useState(0);
  const [billAmount, setBillAmount] = useState("");
  const [totalPayment, setTotalPayment] = useState(0);
  const [insurance, setInsurance] = useState(false);

  const handleSwap = () => {
    // Assuming a simple conversion rate
    const conversionRate = 1; // 1 USDT = 1 QMGT for simplicity
    const convertedQMGT = usdtAmount * conversionRate;
    setQmgtAmount(convertedQMGT);
    alert(`Converted ${usdtAmount} USDT to ${convertedQMGT} QMGT`);
  };

  const handlePreserveQMGT = () => {
    const preserved = qmgtAmount * 0.85;
    setPreservedQMGT(preserved);
    alert(`Preserved QMGT: ${preserved}`);
    setStep(2); // Go to Spend to Save step
  };

  const calculateTotalPayment = () => {
    if (billAmount) {
      const additionalFee = insurance ? billAmount * 0.15 : 0;
      const total = parseFloat(billAmount) + additionalFee;
      setTotalPayment(total);
    } else {
      setTotalPayment(0);
    }
  };

  useEffect(() => {
    calculateTotalPayment();
  }, [billAmount, insurance]);

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-3">Swap USDT to QMGT</h2>
            <input
              type="number"
              placeholder="Enter USDT Amount"
              value={usdtAmount}
              onChange={(e) => setUsdtAmount(e.target.value)}
              className="border border-gray-300 p-2 mb-3 w-full rounded"
            />
            <input
              type="number"
              placeholder="Enter QMGT Amount"
              value={qmgtAmount}
              onChange={(e) => setQmgtAmount(e.target.value)}
              className="border border-gray-300 p-2 mb-3 w-full rounded"
              readOnly
            />
            <button
              onClick={handleSwap}
              className="bg-blue-500 text-white py-2 rounded w-full mb-3"
            >
              Swap
            </button>
            <div className="flex justify-between">
              <button disabled className="text-gray-400">
                Previous
              </button>
              <button
                onClick={() => setStep(1)}
                className="bg-green-500 text-white py-2 rounded"
              >
                Next
              </button>
            </div>
          </div>
        );

      case 1:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-3">Preserve QMGT</h2>
            <button
              onClick={handlePreserveQMGT}
              className="bg-green-500 text-white py-2 rounded w-full"
            >
              Preserve
            </button>
            <p className="mt-2">Preserved QMGT: {preservedQMGT}</p>
            <div className="flex justify-between">
              <button
                onClick={() => setStep(0)}
                className="bg-gray-500 text-white py-2 rounded"
              >
                Previous
              </button>
              <button
                onClick={() => setStep(2)}
                className="bg-green-500 text-white py-2 rounded"
              >
                Next
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-xl font-semibold mb-3">
              Spend to Save (Bill Payment)
            </h2>
            <input
              type="number"
              placeholder="Enter Bill Amount"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              className="border border-gray-300 p-2 mb-3 w-full rounded"
            />
            <label className="flex items-center mb-3">
              <input
                type="checkbox"
                checked={insurance}
                onChange={() => setInsurance(!insurance)}
                className="mr-2"
              />
              Spend to Save (15% additional fee)
            </label>
            <p className="mt-2">Total Payment: ₱{totalPayment}</p>
            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-500 text-white py-2 rounded"
              >
                Previous
              </button>
              <button
                className="bg-green-500 text-white py-2 rounded"
                disabled // You can implement the final action here
              >
                Confirm Payment
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-5">Aurum Utility</h1>
      <div className="bg-white shadow-md rounded-lg p-5 w-full max-w-md">
        {renderStep()}
      </div>
    </div>
  );
};

export default App;
