import { Modal } from "antd";
import React, { useState } from "react";
import { IoArrowDownOutline } from "react-icons/io5";

const BillPayment = () => {
  const [modalVisible, setModalVisible] = useState(true);

  const handleModalClose = () => {
    setModalVisible(false);
  };
  return (
    <div className=" fixeds top-0 left-0 bg-[rgba(245,96,96,0.9)] ">
      <Modal
        className="custom-modal"
        open={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        closable={false}
        width={500}
      >
        <div className="mt-4">
          <h1 className="text-2xl font-semibold text-white text-center mb-7 tracking-wider">
            Confirm Payment
          </h1>
          <div className="w-full bg-silver/10 rounded-md px-4 py-4 text-white flex flex-col gap-4">
            {/* trnastfer to QMS */}
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-3 p-3 pr-7  bg-ash/50 rounded-xl">
                <img
                  src="https://w7.pngwing.com/pngs/113/18/png-transparent-tether-hd-logo-thumbnail.png"
                  className="w-7 rounded-full"
                  alt="QMGT Logo"
                />
                <h1 className="text-lg font-semibold">USDT</h1>
              </div>
              <h1 className="text-lg font-semibold">2,000</h1>
            </div>
            <div className="flex items-center gap-5">
              <IoArrowDownOutline size={25} className="text-golden ml-2" />
              <div className="flex-1 h-[1px] bg-ash/50">{""}</div>
            </div>
            {/* QMGT Input Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-3 p-3 pr-8 bg-ash/50 rounded-xl">
                <img src="/tokenLogo.png" className="w-8" alt="QMGT Logo" />
                <h1 className="text-lg font-semibold">BNB</h1>
              </div>
              <h1 className="text-lg font-semibold">0.065653838</h1>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-4 bg-accent border-2 border-ash/30 rounded-md opacity-70 text-white p-2 px-4 text-xs">
            <p className="flex justify-between">
              <span>Rate</span>
              <span>1 USDT = 0.000320264 BNB</span>
            </p>
            <p className="flex justify-between mt-2">
              <span>Inverse Rate</span>
              <span>1 BNB = 312.546 USDT</span>
            </p>
            <p className="flex justify-between mt-2">
              <span>Payment Method</span>
              <span>Spot Wallet</span>
            </p>
            <p className="flex justify-between mt-2">
              <span>Transaction Fees</span>
              <span>0</span>
            </p>
            <div className="flex-1 h-[1px] bg-ash mt-3">{""}</div>

            <p className="flex justify-between mt-2">
              <span className="text-lg font-semibold">You will recieve</span>
              <span className="text-lg font-semibold">0.000320264 BNB</span>
            </p>
            <button className=" text-lg font-medium p-3 border mt-5 w-full bg-golden text-white rounded-lg">
              Confirm
            </button>

            <div className="flex items-center justify-center  w-full mt-7">
              <button
                onClick={() => {
                  setModalVisible(false);
                }}
                className="text-lg font-medium text-center mx-auto text-golden"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BillPayment;
