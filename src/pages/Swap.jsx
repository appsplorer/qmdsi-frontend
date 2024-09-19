import React, { useState } from "react";
import TokenSwap from "../components/TokenSwap";
import CreditSwap from "../components/CreditSwap";
import { GitCompare, RefreshCcw } from "lucide-react";

const Swap = () => {
  const [tokenSwap, setTokenSwap] = useState(true);
  const [fee, setFee] = useState("0.1");

  return (
    <div className="px-4 md:px-24 pt-4 h-full">
      <div className="border border-primary border-b-0 p-3 min-h-[100vh] flex justify-center">
        <div className="w-[500px] mt-36">
          {/* Tabs */}
          <div className="flex justify-between text-white items-center">
            <div className="flex space-x-8">
              <button
                className={`px-4 py-2 border-b-4 ${
                  tokenSwap
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-400"
                }`}
                onClick={() => setTokenSwap(true)}
              >
                Token Swap
              </button>
              <button
                className={`px-4 py-2 border-b-4 ${
                  !tokenSwap
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-400"
                }`}
                onClick={() => setTokenSwap(false)}
              >
                Buy via Fiat
              </button>
            </div>

            {/* Fee and refresh buttons */}
            <div className="flex gap-2">
              <button className="text-[14px] flex gap-2 bg-black p-1 px-2 rounded-full items-center">
                <GitCompare className="w-[14px] text-primary" /> {fee}%
              </button>
              <button className="text-[14px] bg-black p-1 px-2 rounded-full">
                <RefreshCcw className="w-[14px] text-primary" />
              </button>
            </div>
          </div>

          {/* Content based on selected tab */}
          <div className="p-4 rounded-b-lg shadow-lg">
            {tokenSwap ? (
              <TokenSwap setFee={setFee} fee={fee} />
            ) : (
              <CreditSwap />
            )}
          </div>
        </div>
      </div>

      {/* Decorative background text */}
      <div className="hollow-text z-100 touch-none">SWAP</div>
    </div>
  );
};

export default Swap;
