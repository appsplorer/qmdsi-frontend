import Nominee from "../components/Nominee";

const Nom = () => {
  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <Nominee />
      <div className="text-gray-800 text-2xl font-semibold relative z-10">
      Nominee
      </div>
    </div>
  );
};

export default Nom;