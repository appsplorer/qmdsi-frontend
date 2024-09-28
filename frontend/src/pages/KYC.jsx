import KycForm from "../components/KycForm";
import Nominee from "../components/Nominee";

const KYC = () => {
  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <KycForm />
      <Nominee />
      <div className="text-gray-800 text-2xl font-semibold relative z-10">
        KYC
      </div>
    </div>
  );
};

export default KYC;
