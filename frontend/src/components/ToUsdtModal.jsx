import { Modal } from "antd";
import React from "react";

const ToUsdtModal = ({ closeModal, confirmModal, isOpen }) => {
  return (
    <Modal
      className="custom-modal"
      title={
        <p className="text-white text-lg font-semibold">
          Welcome to QMGT Convert to USDT (QCU)
        </p>
      }
      onClick={confirmModal}
      onCancel={closeModal}
      open={isOpen}
      footer={null}
      width={1000}
    >
      <div className="w-full gap-3 mt-4">
        <div>
          <h1 className="font-montserrat text-lg font-bold mb-5">
            Unlock the Potential of Your Quantum Metal Gold Tokens
          </h1>
          <p>
            Welcome to <strong>QMGT Convert to USDT (QCU)</strong>, where you
            can leverage up to 85% of your QMGT as collateral with an incredibly
            low APR of just 3.5%. Enjoy the flexibility to pay anytime while
            your $QMGT remains securely locked until the completion of your
            payment.
          </p>
          <h2 className="font-montserrat text-md font-bold mb-3 mt-2">
            Why Choose QCU?
          </h2>
          <ul className="list-disc list-inside">
            <li>
              <strong>Flexible Collateral Use:</strong> Utilize up to 85% of
              your QMGT for immediate liquidity.
            </li>
            <li>
              <strong>Low APR:</strong> Benefit from a highly competitive annual
              percentage rate of 3.5%.
            </li>
            <li>
              <strong>Secure and Reliable:</strong> Your QMGT will be safely
              locked until your payment is complete, ensuring peace of mind.
            </li>
          </ul>
          <h2 className="font-montserrat text-md font-bold mb-3 mt-2">
            How It Works:
          </h2>
          <ol className="list-decimal list-inside">
            <li>
              <strong>Collateralize Your QMGT:</strong> Convert a portion of
              your QMGT into USDT up to 85% of its value.
            </li>
            <li>
              <strong>Receive Funds Instantly:</strong> Access your USDT
              instantly for any financial needs.
            </li>
            <li>
              <strong>Flexible Repayment:</strong> Enjoy the freedom to repay at
              any time that suits you.
            </li>
            <li>
              <strong>Completion and Unlocking:</strong> Once your payment is
              complete, your QMGT will be unlocked and available for use again.
            </li>
          </ol>
        </div>
        <div className="text-golden mt-2 mb-2 text-center ">
          Join the QCU program today and experience the freedom and security of
          converting your QMGT into usable funds while maintaining control over
          your assets.
        </div>

        <div className="w-full gap-4 flex mt-6 justify-center">
          <button
            className="w-1/2 text-lg font-medium p-3 border bg-golden text-white rounded-lg"
            onClick={confirmModal}
          >
            Convert Now
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ToUsdtModal;
