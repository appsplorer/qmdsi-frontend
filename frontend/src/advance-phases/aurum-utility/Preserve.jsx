import React from "react";

const Preserve = ({ handlePreserveQMGT, preservedQMGT, setStep }) => {
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
};

export default Preserve;
