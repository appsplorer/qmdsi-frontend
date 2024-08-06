import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: "0.8.24",

  networks : {
    sepolia : {
      url : "https://ethereum-sepolia-rpc.publicnode.com",
      chainId : 11155111,
      accounts : [ "af7c3b6a2c12efea7a84eb56500845c9bf35b06e0ef74ee61bbaa7af4fbdb811", '3f0f8339f229a64ace294d2a4e8f297c4938f80a76b9ef9f78cb0bc13b27cd02', '0xce036fdeeca26547fcfdabfb290aa5b0eecd9a1c6c7c883bc6f48d2db7cd0199']
    },

  } 

  
};

export default config;
