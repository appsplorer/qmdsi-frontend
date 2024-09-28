import { X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import Countdown from "react-countdown";
import { swapToken } from "../services/users.service";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "./Loading";

const TransactionModal = ({
  fee,
  closeModal,
  transactionComplete,
  tokenIn,
  amountIn,
  amountOut,
  tokenOut,
  setTransactionCompleteModal,
  setTransactionData,
}) => {
  const [tab, setTab] = useState("Details");
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(1);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [amtOut, setAmtOut] = useState(amountOut);
  const [feeAmount, setFeeAmount] = useState("");
  const { auth, profileData } = useContext(AuthContext);

  useEffect(() => {
    if (tokenIn.toLowerCase() == "usdt") {
      const feeAmt = (fee * parseFloat(amountIn)) / 100;
      setFeeAmount(feeAmt);
    } else {
      const feeAmt = (fee * parseFloat(amountOut)) / 100;
      setFeeAmount(feeAmt);
    }
  }, [fee, tokenIn, amountIn, amountOut, tokenOut]);

  const handleBuy = async () => {
    if (!auth) return;

    setLoading(true);
    setLoadingMsg(`Swapping ${tokenIn} for ${tokenOut}`);
    try {
      const res = await swapToken(
        auth.accessToken,
        tokenIn.toLowerCase(),
        amountIn
      );
      const transactionData = {
        ...res,
        tokenIn,
        amountIn,
        amountOut,
        tokenOut,
      };
      closeModal();
      setTransactionData(transactionData);
      setTransactionCompleteModal(true);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {loading && <Loading />}
      <div className="modal-wrapper fixed inset-0 bg-black opacity-70"></div>
      <div className="w-full max-w-md bg-accent z-10 rounded-md shadow-lg flex relative overflow-hidden">
        <div className="w-full h-full bg-accent p-4">
          <div className="w-full flex justify-between items-center text-white mb-4">
            <h1 className="text-lg sm:text-xl font-medium">
              Swap Confirmation
            </h1>
            <button
              onClick={closeModal}
              className="p-1 hover:bg-gray-700 rounded"
            >
              <X size={20} />
            </button>
          </div>
          <div className="w-full space-y-6">
            <div className="flex flex-col items-center w-full text-white space-y-2">
              <h1 className="text-2xl sm:text-3xl font-medium">{`${parseFloat(
                amountIn
              ).toPrecision(5)} ${tokenIn}`}</h1>
              <p className="text-sm text-yellow-300">to</p>
              <h1 className="text-2xl sm:text-3xl font-medium">{`${parseFloat(
                amtOut
              ).toPrecision(4)} ${tokenOut}`}</h1>
            </div>
            <div className="flex text-white w-full justify-center text-lg sm:text-xl font-thin">
              <button
                className={`pb-2 ${
                  tab === "Details" ? "font-bold border-b-2 border-white" : ""
                }`}
                onClick={() => setTab("Details")}
              >
                Details
              </button>
            </div>
            <hr className="border-gray-400" />
            <div className="w-full text-white text-sm sm:text-base space-y-4">
              <div className="flex justify-between">
                <p>Fee</p>
                <p>{fee}%</p>
              </div>
              <div className="flex justify-between">
                <p>Amount</p>
                <p className="text-gray-400">{feeAmount} USDT</p>
              </div>
            </div>
            <div className="w-full flex gap-4">
              <button
                className="flex-1 py-3 border rounded-md border-primary text-primary hover:bg-secondary hover:text-black transition-colors"
                onClick={closeModal}
              >
                Reject
              </button>
              <button
                className="flex-1 py-3 border rounded-md border-primary bg-primary text-black hover:bg-secondary transition-colors"
                onClick={handleBuy}
                disabled={loading}
              >
                {loading ? loadingMsg : "Confirm"}
              </button>
            </div>
            <div className="flex items-center justify-center text-red-500">
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
