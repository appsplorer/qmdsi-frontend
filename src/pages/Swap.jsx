import React, { useState } from "react";
import { motion } from "framer-motion";
import TokenSwap from "../components/TokenSwap";
import CreditSwap from "../components/CreditSwap";
import { Button, Divider } from "antd";
import QMLogo from "../assets/au-logo.png";

const Swap = () => {
  const [tokenSwap, setTokenSwap] = useState(true);
  const [fee, setFee] = useState("0.1");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="w-full h-full flex flex-wrap flex-col gap-12 sm:flex-col md:flex-row px-4 md:px-10 z-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="font-bold w-full md:flex-1 flex flex-col gap-8"
        variants={itemVariants}
      >
        <motion.div
          className="leading-[50px] text-white"
          variants={itemVariants}
        >
          <motion.h1
            className="text-5xl whitespace-nowrap md:text-8xl font-normal font tracking-wide mb-6"
            variants={itemVariants}
          >
            Buy & Sell
          </motion.h1>
          <motion.p
            className="text-2xl font-normal text-white mb-6"
            variants={itemVariants}
          >
            The Ultimate currency.
          </motion.p>
        </motion.div>

        <motion.p
          className="text-5xl md:text-8xl font-normal text-white font tracking-wide"
          variants={itemVariants}
        >
          QMGT
        </motion.p>
        <motion.div className="text-2xl text-white" variants={itemVariants}>
          <motion.p
            className="text-2xl font-normal text-white"
            variants={itemVariants}
          >
            Quantum Metal makes trading gold easy and efficient
          </motion.p>
          <motion.p
            className="text-2xl font-normal text-white"
            variants={itemVariants}
          >
            via trustworthy processes and tools
          </motion.p>
        </motion.div>

        <motion.div
          className="tracking-widest font-normal"
          variants={itemVariants}
        >
          <motion.img
            src={QMLogo}
            className="w-32"
            alt=""
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        </motion.div>

        <motion.div
          className="flex flex-row flex-nowrap gap-4 w-full"
          variants={itemVariants}
        >
          <motion.button
            className="blur-bg border-white text-white font-normal p-4 w-full text-lg md:w-44 border-2 rounded-full"
            whileHover={{ scale: 1.05, letterSpacing: "0.1em" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            BUY
          </motion.button>
          <motion.button
            className="blur-bg border-white text-white font-normal p-4 w-full text-lg md:w-44 border-2 rounded-full"
            whileHover={{ scale: 1.05, letterSpacing: "0.1em" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            SELL
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex-1 justify-end flex items-center"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="w-full lg:w-[70%] min-h-[450px] min-w-[70%] border-2 p-4 flex flex-col gap-2 blur-bg border-ash/20 rounded-md text-gray-300"
          variants={itemVariants}
          whileHover={{ boxShadow: "0px 0px 8px rgb(255,255,255,0.5)" }}
        >
          <motion.div
            className="flex justify-between items-center"
            variants={itemVariants}
          >
            <motion.h1 className="text-xl text-white" variants={itemVariants}>
              Trade QMGT
            </motion.h1>
            <motion.div
              className="flex gap-2 text-gray-600"
              variants={itemVariants}
            >
              <motion.button
                className="w-20 md:w-24 text-xs rounded-full p-1 py-2 bg-charcoalBlue text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                0.1%
              </motion.button>
              <motion.button
                className="w-20 md:w-24 text-xs rounded-full p-1 py-2 bg-charcoalBlue text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Swap
              </motion.button>
            </motion.div>
          </motion.div>
          <motion.div className="relative" variants={itemVariants}>
            <TokenSwap />
          </motion.div>
          <motion.div className="mt-4" variants={itemVariants}>
            <Divider className="bg-gray-400 mb-1" />
            <motion.p className="text-md my-4" variants={itemVariants}>
              *We are in Test Net
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Swap;
