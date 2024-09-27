import { Input, Modal } from "antd";
import { GitCompare } from "lucide-react";
import React, { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { IoArrowDownOutline } from "react-icons/io5";

const QMS = () => {
  const [modalVisible, setModalVisible] = useState(true);

  const handleModalClose = () => {
    setModalVisible(false);
  };
  return (
    <div className=" fixeds top-0 left-0 bg-[rgba(245,96,96,0.9)] ">
      <Modal
        className="custom-modal"
        open={modalVisible}
        footer={null}
        closable={false}
        width={500}
        style={{ top: 170 }}
      >
        <div className="mt-4">
          <h1 className="text-2xl font-semibold text-white text-center mb-7 tracking-wider">
            Transfer to QMS
          </h1>
          <div className="w-full bg-silver/10 rounded-md px-4 py-4 text-white flex flex-col gap-4">
            {/* USDT Input Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-3 p-3 pr-7  bg-ash/50 rounded-xl">
                <img
                  src="/qmdsiLogo.png"
                  className="w-7 rounded-full"
                  alt="QMGT Logo"
                />
                <h1 className="text-sm font-semibold">To QMS</h1>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-sm flex gap-2 bg-black p-1 px-5 rounded-full items-center ">
                  <GitCompare className="w-[14px] text-primary cursor-pointer" />
                  0.5%
                </button>
                <button>
                  {" "}
                  <FiRefreshCw className="text-xl text-golden " />{" "}
                </button>
              </div>
            </div>
            <div className="flex-1 h-[1px] bg-ash/50">{""}</div>
            <input
              type="number"
              placeholder="Enter Amount"
              className="textce text-xl  w-full bg-transparent border-0 border-b outline-none pb-4"
            />
            <p className="text-xl font-semibold text-white">
              Wallet Balance: $99.29
            </p>
          </div>

          <button className=" text-lg font-medium tracking-wider p-3 border mt-5 w-full bg-golden text-white rounded-lg">
            Transfer
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default QMS;
