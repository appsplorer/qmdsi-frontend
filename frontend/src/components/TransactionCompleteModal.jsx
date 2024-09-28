import React from "react";
import { CircleArrowOutUpRight, X } from "lucide-react";

const TransactionCompleteModal = ({ closeModal, data }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black opacity-70"
        onClick={closeModal}
      ></div>
      <div className="w-full max-w-md bg-accent rounded-lg shadow-lg z-10 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <div className="text-center mt-8">
            <CircleArrowOutUpRight className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-2xl sm:text-3xl font-medium text-white mb-2">
              Transaction Completed
            </h1>
            <p className="text-gray-400 mb-8">
              Swapped {`${data.amountIn} ${data.tokenIn}`} for{" "}
              {`${data.amountOut} ${data.tokenOut}`}
            </p>
            <a
              href={`https://testnet.bscscan.com/tx/0x${data.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto px-6 py-3 border rounded-md border-primary text-primary hover:bg-secondary hover:text-black transition-colors">
                View on Bscscan
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCompleteModal;
