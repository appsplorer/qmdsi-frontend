import React, { useState } from "react";
import ToUsdtModal from "./ToUsdtModal";
import TokenConvert from "./TokenConvert";

const QcaUsdt = () => {
  const [toUSDTModal, setToUSDTModal] = useState(true);

  const closeModal = () => {
    setToUSDTModal(false);
  };
  const confirmModal = () => {
    setToUSDTModal(false);
  };
  return (
    <div className="mt-4 w-full flex justify-center">
      <div>
        <TokenConvert />
      </div>

      {toUSDTModal && (
        <ToUsdtModal
          closeModal={closeModal}
          confirmModal={confirmModal}
          isOpen={toUSDTModal}
        />
      )}
    </div>
  );
};

export default QcaUsdt;
