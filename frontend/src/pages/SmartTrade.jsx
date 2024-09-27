import React, { useState } from "react";
import { GitCompare, RefreshCcw } from "lucide-react";
import SmartTradeComp from "../components/SmartTradeComp";

const SmartTrade = () => {
  return (
    <div className="px-2 md:px-4 mx-4 blur-bg border-ash/20 p-4 rounded-md pt-8">
      <div className="flex justify-between flex-col md:flex-row text-white items-center">
        <h2 className="text-white font-bold text-3xl tracking-wider pl-4 whitespace-nowrap">
          Smart Trade
        </h2>
        <div className="flex gap-2">
          <button className="text-[14px] flex gap-2 bg-black p-2 px-4 rounded-full items-center">
            {" "}
            Available : 100 $QMT
          </button>
        </div>
      </div>
      <SmartTradeComp />
    </div>
  );
};

export default SmartTrade;
