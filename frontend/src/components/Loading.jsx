import { Spin } from "antd";
import React from "react";
import { BarLoader } from "react-spinners";
const Loading = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50">
      <div className="max-w-[450px] h-[350px] mx-auto w-full flex flex-col items-center justify-center bg-[rgba(0,0,0,0.9)] rounded-xl">
        <img
          src="/aurum_logo_03.png"
          alt=""
          className="w-80 animate-pulse loader"
        />
        <BarLoader color="#dca955" height={7} width={250} />
      </div>
    </div>
  );
};

export default Loading;
