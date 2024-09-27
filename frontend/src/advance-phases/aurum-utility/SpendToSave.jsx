import React, { useEffect } from "react";

const SpendToSave = ({
  billAmount,
  setBillAmount,
  insurance,
  setInsurance,
  totalPayment,
  calculateTotalPayment,
  setStep,
}) => {
  useEffect(() => {
    calculateTotalPayment();
  }, [billAmount, insurance, calculateTotalPayment]);

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
};

export default SpendToSave;
