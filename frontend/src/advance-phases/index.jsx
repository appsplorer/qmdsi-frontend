import React, { useState } from "react";

import "./index.css";
import Usdt from "./Usdt";
import Crypto from "./Crypto";
import Rwb from "./Rwb";
import PaymentBill from "./assets/PaymentBill";
import Test from "./Test";
const Index = () => {
  const [active, setActive] = useState("0");

  const convertionTabs = [
    {
      label: "Convert to USDT",
      component: <Usdt />,
    },
    {
      label: "Convert to CRYPTO",
      component: <Crypto />,
    },
    {
      label: "Convert to RWB",
      component: <Rwb />,
    },
  ];

  const output = () => {
    const getComponent = convertionTabs.find(
      (_, index) => index === active
    )?.component;

    return getComponent;
  };

  return (
    <div className="w-full  px-4 md:px-10 pb-5 flex flex-col items-center justify-start  gap-5 -mt-7">
      <nav className=" max-w-4xl w-full blur-bg border border-gray-400 p-2 rounded-full flex items-center justify-center gap-4">
        {convertionTabs.map((tab, index) => (
          <button
            onClick={() => setActive(index)}
            className={`${
              active === index && "bg-golden border border-[#c4c4c2]"
            } text-lg text-white tracking-wider py-4   rounded-full w-1/3 transition-all duration-200 ease-in-out`}
            key={index}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="w-full text-red-500 mt-12">{output()}</div>

      <PaymentBill />
    </div>
  );
};
export default Index;
