import React, { useState } from "react";
import KycForm from "../components/KycForm";
import Nominee from "../components/Nominee";
import Loading from "../components/Loading";

const KYC = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <Loading />
        </div>
      )}
      <KycForm setLoading={setIsLoading} />
      <Nominee setLoading={setIsLoading} />
      <div className="text-gray-800 text-2xl font-semibold relative z-10">
        KYC
      </div>
    </div>
  );
};

export default KYC;
