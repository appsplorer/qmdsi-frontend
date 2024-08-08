

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const supply = parseEther("3000000")
const name = "QMGTToken"
const symbol = "$QMGT"

// 0xC5981F461d74c46eB4b0CF3f4Ec79f025573B0Ea

const SwapModule = buildModule("SwapModule", (m) => {
  
  const token = m.contract("QMGTSwap", [supply, name, symbol]);
  return { token };
});

export default SwapModule;
