import React from "react";
import { CircleArrowOutUpRight, X } from "lucide-react";
import { shortenAddress } from "../utils";

const TransferCompleteModal = ({ isOpen, closeModal, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black opacity-70"
        onClick={closeModal}
      ></div>
      <div className="w-full max-w-md bg-accent rounded-md shadow-lg z-10 overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-center text-white mb-4">
            <h1 className="text-lg font-semibold">Transaction Details</h1>
            <button onClick={closeModal} className="hover:text-gray-300">
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center text-white mt-8 mb-8">
            <CircleArrowOutUpRight className="w-16 h-16 mb-6 text-primary" />
            <h2 className="text-2xl font-medium mb-2">Transaction Completed</h2>
            <p className="text-gray-400 text-center">
              Sent {data.amount} {data.token.toUpperCase()} to{" "}
              {shortenAddress(data.to || "")}
            </p>
          </div>
          <div className="flex justify-center">
            <a
              href={`https://testnet.bscscan.com/tx/${data.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <button className="w-full py-3 border rounded-md border-primary text-primary hover:bg-secondary hover:text-black transition-colors">
                View on BscScan
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferCompleteModal;
