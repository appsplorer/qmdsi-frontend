import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import Countdown from "react-countdown";
import Loading from "./Loading";

const TransactionModal = ({
  fee,
  closeModal,
  confirmSwap,
  tokenIn,
  amountIn,
  amountOut,
  tokenOut,
  isLoading,
}) => {
  const [tab, setTab] = useState("Details");
  const [key, setKey] = useState(1);
  const [amtOut, setAmtOut] = useState(amountOut);
  const [feeAmount, setFeeAmount] = useState("");

  useEffect(() => {
    const feeAmt =
      (fee *
        parseFloat(tokenIn.toLowerCase() === "usdt" ? amountIn : amountOut)) /
      100;
    setFeeAmount(feeAmt.toFixed(4));
  }, [fee, tokenIn, amountIn, amountOut]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="modal-wrapper fixed inset-0 bg-black opacity-70"></div>
      <div className="w-full md:w-1/3 lg:w-1/4 bg-accent z-10 rounded-md shadow-lg flex relative overflow-hidden">
        <div className="w-full h-full bg-accent p-4">
          {isLoading && (
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 rounded-md">
              <Loading />
            </div>
          )}
          <div className="w-full flex justify-between items-center text-white">
            <h1 className="text-lg w-full">Swap Confirmation</h1>
            <button onClick={closeModal} className="">
              <X />
            </button>
          </div>
          <div className="w-full gap-3 mt-4">
            <div className="flex flex-col justify-around items-center w-full text-white mt-12">
              <h1 className="text-3xl font-medium">{`${parseFloat(
                amountIn
              ).toPrecision(5)} ${tokenIn}`}</h1>
              <p className="text-sm text-yellow-300 my-2">to</p>
              <h1 className="text-3xl font-medium">{`${parseFloat(
                amtOut
              ).toPrecision(4)} ${tokenOut}`}</h1>
            </div>

            <div className="flex text-white w-full justify-center text-xl font-thin mt-8">
              <button
                className={`pb-2 ${
                  tab === "Details" ? "font-bold border-b-2 border-white" : ""
                }`}
                onClick={() => setTab("Details")}
              >
                Details
              </button>
            </div>
            <hr className="border-gray-400 mt-2" />
            <div className="w-full text-white text-sm space-y-4 mt-4">
              <div className="flex justify-between">
                <p>Fee</p>
                <p>{fee}%</p>
              </div>
              <div className="flex justify-between">
                <p>Amount</p>
                <p className="text-gray-400">{feeAmount} USDT</p>
              </div>
            </div>
            <div className="w-full gap-4 flex mt-8">
              <button
                className="flex-1 h-[50px] border rounded-md border-primary text-primary hover:bg-secondary hover:text-black"
                onClick={closeModal}
              >
                Reject
              </button>
              <button
                className="flex-1 h-[50px] border rounded-md border-primary bg-primary text-black hover:bg-secondary"
                onClick={confirmSwap}
              >
                Confirm
              </button>
            </div>
            <div className="flex items-center justify-center text-red-500 mt-4">
              <Countdown
                key={key}
                date={Date.now() + 3 * 60 * 1000}
                onComplete={() => setKey((prev) => prev + 1)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
