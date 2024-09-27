import { ArrowUpDown } from "lucide-react";
import React, { useState } from "react";
import ToUsdtModal from "./ToUsdtModal";
import ToCryptoModal from "./ToCryptoModal";
import Select from "react-select";
import ToRwbModal from "./ToRwbModal";
import Iframe from "react-iframe";
import SmartTradeModal from "./SmartTradeModal";
import TradingViewWidget from "./TradingView";
import { Input } from "antd";
import TextInput from "./ui/input";

const SmartTradeComp = () => {
  const [confirmModal, setConfirmModal] = useState(true);

  const closeModal = () => {
    setConfirmModal(false);
  };
  const resultModal = () => {
    setConfirmModal(false);
  };

  const tableData = [
    {
      company: "Nigrakon",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
      stake: "$1000",
      apr: "12%",
      collateral: "Y",
      vesting: "3 Yrs",
      status: "Open",
      remaining: "$8000",
      distributed: "$8000",
      link: "#",
    },
  ];
  return (
    <div className="mt-4 w-full overflow-auto  bg-accent rounded-md px-4 py-4 text-white">
      <div className="w-full flex items-center flex-col md:flex-row gap-2 md:gap-4 mb-4">
        <div className="w-full md:w-[200px]">
          <TextInput placeholder="Enter Amount" />
        </div>
        <h1 className="font-bold text-xl">=</h1>
        <div className="w-full md:w-[200px]">
          <TextInput placeholder="0.0 QMT" />
        </div>
        <div className="w-full md:w-[200px] mt-4 md:mt-0">
          <div className="flex gap-4 items-end">
            <button className=" text-lg font-medium p-3 border  w-full bg-golden text-white rounded-lg">
              Convert
            </button>
          </div>
        </div>
      </div>
      <div>Convert Upto 8.5 QMT</div>

      <div className="w-full mt-6">
        <TradingViewWidget />
      </div>

      {confirmModal && (
        <SmartTradeModal
          closeModal={closeModal}
          confirmModal={resultModal}
          isOpen={confirmModal}
        />
      )}
    </div>
  );
};

export default SmartTradeComp;
