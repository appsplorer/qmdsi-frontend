import { Checkbox, Input, Modal } from "antd";
import React, { useState } from "react";
import { FaAngleLeft, FaTimes } from "react-icons/fa";
import { IoArrowDownOutline } from "react-icons/io5";

const ChooseToken = ({ totalBalance, onClose }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [isOpenPay, setIsOpenPay] = useState(false);
  const [isSTS, setIsSTS] = useState(false);

  const [balance, setBalance] = useState(totalBalance);

  const handleChange = (e) => {
    const checked = e.target.checked;
    const deducFee = totalBalance * 0.85;
    setIsSTS(checked ? true : false);

    if (!isSTS) {
      setBalance(deducFee);
    } else setBalance(totalBalance);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  console.log(isSTS);

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
          {!isOpenPay ? (
            <>
              <h1 className="text-2xl font-semibold text-white text-center mb-7 tracking-wider">
                Choose Token
              </h1>
              <div className="grid grid-cols-7 items-center justify-center gap-5">
                <button>
                  <img
                    onClick={() => setIsOpenPay(!isOpenPay)}
                    src="https://w7.pngwing.com/pngs/113/18/png-transparent-tether-hd-logo-thumbnail.png"
                    className="w-14 rounded-full"
                    alt="QMGT Logo"
                  />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start justify-between px-2">
                {" "}
                <FaAngleLeft
                  size={25}
                  className="text-golden cursor-pointer"
                  onClick={() => setIsOpenPay(false)}
                />
                <h1 className="text-2xl font-semibold text-white text-center mb-7 tracking-wider">
                  Payment Bill
                </h1>
                <FaTimes
                  size={20}
                  onClick={onClose}
                  className="cursor-pointer"
                />
              </div>
              <div className="py-7 px-5 blur-bg border border-ash/20 rounded-md flex flex-col items-center justify-center gap-4">
                <h1 className="text-7xl font-semibold text-golden">
                  <span className="text-xl font-medium text-gray-500">PHP</span>
                  {balance}
                </h1>
                <p className="text-xl ">Total Balance</p>
              </div>
              <div className="flex items-center justify-start gap-3 my-5 pl-1">
                <Checkbox
                  color="warning"
                  onChange={handleChange}
                  className="text-white text-xl"
                >
                  Spend to Save?
                </Checkbox>
              </div>
              {isSTS && (
                <div className="flex flex-col gap-4 border-t border-ash pt-5 mt-9 px-3">
                  <h1 className="text-2xl font-semibold text-white text-center my-1 tracking-wider ">
                    Details
                  </h1>
                  <p className="text-sm text-golden">
                    Convert a portion of your QMGT into USDT up to 85% of its
                    value.
                  </p>

                  <div className="flex items-center justify-between">
                    <p>Fee</p>
                    <p className="text-center text-gray-100 text-xl font-medium">
                      0 (85%)
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Amount</p>
                    <p className="text-center text-gray-100 text-xl font-medium">
                      0 USD
                    </p>
                  </div>
                </div>
              )}{" "}
              <button className=" text-lg font-medium p-3 border  w-full bg-golden text-white rounded-lg mt-5">
                Submit
              </button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ChooseToken;
