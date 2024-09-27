//BEGIN
//DEVNAME:MICHAEL TRAZONA
//Creation of QMGT TO USDT and popup modal
import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import TokenSwap from "../components/TokenSwap";

const Usdt = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const shouldShowModal = localStorage.getItem("showUsdtModal") !== "false";
    setShowModal(shouldShowModal);
    if (shouldShowModal) {
      setModalVisible(true);
    }
  }, []);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleDontShowAgain = () => {
    localStorage.setItem("showUsdtModal", "false");
    setModalVisible(false);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="cardSwap relative">
        <TokenSwap />
      </div>
      <Modal
        className="custom-modal"
        open={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        closable={false}
        width={1000}
      >
        <div className="mx-4 flex flex-col gap-4">
          <h2 className="font-bold text text-3xl w-full text-center mt-4 mb-8">
            Welcome to QMGT Convert to USDT (QCU)
          </h2>
          <div>
            <h4 className="font-bold text-xl">
              Unlock the Potential of Your Quantum Metal Gold Tokens
            </h4>
            <p className="font-normal">
              Welcome to QMGT Convert to USDT (QCU), where you can leverage up
              to 85% of your QMGT as collateral with an incredibly low APR of
              just 3.5%. Enjoy the flexibility to pay anytime while your $QMGT
              remains securely locked until the completion of your payment.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-xl">Why Choose QCU?</h4>
            <ul className="font-normal list-disc list-inside pl-4">
              <li>
                Flexible Collateral Use: Utilize up to 85% of your QMGT for
                immediate liquidity.
              </li>
              <li>
                Low APR: Benefit from a highly competitive annual percentage
                rate of 3.5%.
              </li>
              <li>
                Secure and Reliable: Your QMGT will be safely locked until your
                payment is complete, ensuring peace of mind.
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xl">How It Works:</h4>
            <ul className="font-normal list-disc list-inside pl-4">
              <li>
                Collateralize Your QMGT: Convert a portion of your QMGT into
                USDT up to 85% of its value.
              </li>
              <li>
                Receive Funds Instantly: Access your USDT instantly for any
                financial needs.
              </li>
              <li>
                Flexible Repayment: Enjoy the freedom to repay at any time that
                suits you.
              </li>
              <li>
                Completion and Unlocking: Once your payment is complete, your
                QMGT will be unlocked and available for use again.
              </li>
            </ul>
          </div>
          <p className="italic text-golden text-center">
            Join the QCU program today and experience the freedom and security
            of converting your QMGT into usable funds while maintaining control
            over your assets.
          </p>
          <div className="flex gap-4 justify-center mt-4">
            <Button type="primary" onClick={handleDontShowAgain}>
              Don&lsquo;t Show Again
            </Button>
            <Button type="default" onClick={handleModalClose}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Usdt;

//END
