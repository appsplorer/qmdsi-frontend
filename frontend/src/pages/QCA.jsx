import React, { useState } from "react";
import { conversionTabs } from "../constants/conversionTabs";

const QCA = () => {
  const [active, setActive] = useState(0);

  const renderActiveComponent = () => {
    return conversionTabs[active]?.component;
  };

  return (
    <div className="w-full px-4 md:px-10 pb-5 flex flex-col items-center justify-start gap-5 -mt-7">
      {/* Navigation Tabs */}
      <nav className="max-w-4xl w-full blur-bg border border-gray-400 p-2 rounded-full flex items-center justify-center gap-4">
        {conversionTabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`${
              active === index && "bg-golden border border-[#c4c4c2]"
            } text-lg text-white tracking-wider py-4 rounded-full w-1/3 transition-all duration-200 ease-in-out`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Render the active tab content */}
      <div className="w-full mt-12">{renderActiveComponent()}</div>
    </div>
  );
};

export default QCA;
