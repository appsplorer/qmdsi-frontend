import { Modal } from "antd";
import React, { useState } from "react";

const ToRwbModal = ({ closeModal, confirmModal, isOpen }) => {
  const [isShow, setIsShow] = useState(false);
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
      <div className="w-full h-full bg-accent p-4">
        <div className="w-full gap-3 mt-4">
          <div
            className={`${
              isShow ? "h-auto" : "h-[450px] overflow-y-hidden"
            } relative   pb-4 transition-all duration-300 ease-in-out`}
          >
            {" "}
            <div>
              <h1 className="font-montserrat text-lg font-bold mb-5">
                Invest in Proven Success
              </h1>
              <p>
                Welcome to{" "}
                <strong>QMGT Convert to Real World Business (QCR)</strong>,
                where your Quantum Metal Gold Tokens (QMGT) can be converted
                into RWB Tokens of established and audited businesses with a
                strong track record. Discover a new avenue for investment,
                leveraging the stability and potential of real-world
                enterprises.
              </p>
              <h2 className="font-montserrat text-md font-bold mb-3 mt-2">
                Why Choose QCR?
              </h2>
              <ul className="list-disc list-inside">
                <li>
                  <strong>Invest in Success:</strong> Convert your QMGT into RWB
                  Tokens of businesses with a proven history of success, each
                  with over 3 years of solid performance.
                </li>
                <li>
                  <strong>Thoroughly Audited:</strong> Every business in the QCR
                  program has been meticulously audited to ensure they meet
                  strict criteria and can uphold their commitments.
                </li>
                <li>
                  <strong>Secure and Reliable:</strong> Trust in the security of
                  your investment with businesses that have demonstrated
                  resilience and growth.
                </li>
                <li>
                  <strong>Stable Liquidity:</strong> Each RWB Token is
                  equivalent to 1 USDT, ensuring that the liquidity is not
                  volatile.
                </li>
                <li>
                  <strong>Liquidity Addition:</strong> Businesses will add
                  liquidity based on the agreed terms to ensure the reward
                  tokens remain liquid.
                </li>
              </ul>
              <h2 className="font-montserrat text-md font-bold mb-3 mt-2">
                How It Works:
              </h2>
              <ol className="list-decimal list-inside">
                <li>
                  <strong>Select a Business:</strong> Choose from a selection of
                  established businesses that have been carefully vetted for
                  their track record and reliability.
                </li>
                <li>
                  <strong>Convert Your QMGT:</strong> Convert your QMGT into RWB
                  Tokens of the selected businesses.
                </li>
                <li>
                  <strong>Locked and Released:</strong> Your RWB Tokens will be
                  locked and released based on the terms indicated by each
                  business.
                </li>
                <li>
                  <strong>Earn RWB Tokens:</strong> Each conversion earns you
                  RWB Tokens, providing a clear and tangible representation of
                  your investment.
                </li>
                <li>
                  <strong>Benefit from Stability:</strong> Enjoy the potential
                  returns from stable and proven business ventures, mitigating
                  the risks associated with more volatile investments.
                </li>
                <li>
                  <strong>Track Your Investment:</strong> Use our platform to
                  monitor the performance and progress of your converted
                  investments.
                </li>
              </ol>
              <h2 className="font-montserrat text-md font-bold mb-3 mt-2">
                Why Convert to Real World Businesses?
              </h2>
              <ul className="list-disc list-inside">
                <li>
                  <strong>Proven Track Record:</strong> Each business has been
                  operating successfully for over 3 years, providing a solid
                  foundation for your investment.
                </li>
                <li>
                  <strong>Careful Auditing:</strong> Rigorous auditing ensures
                  these businesses can meet their commitments, offering you
                  peace of mind.
                </li>
                <li>
                  <strong>Real Business Ventures:</strong> Invest in tangible,
                  real-world enterprises that are making a difference in their
                  industries.
                </li>
                <li>
                  <strong>Stable and Liquid Rewards:</strong> Each RWB Token is
                  backed by 1 USDT, ensuring stability and liquidity, with
                  monthly additions from the businesses.
                </li>
              </ul>
            </div>
            <div className="text-golden mt-2 mb-2 text-center ">
              Join the QCR program today and become a part of the real deal in
              the business world. Stake your QMGT in ventures with a track
              record of success and watch your investment grow in a stable and
              secure environment.
            </div>
            <div
              onClick={() => setIsShow(!isShow)}
              className={`${
                !isShow ? "absolute bg-[rgba(49,49,49,0.9)]" : "static"
              } bottom-0 left-0 w-full  py-3 flex items-center justify-center`}
            >
              <button className="text-sm text-white font-medium py-2 px-5 rounded-full bg-[#5e5d5d]">
                {!isShow ? "See More" : "See Less"}{" "}
              </button>
            </div>
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
      </div>
    </Modal>
  );
};

export default ToRwbModal;
