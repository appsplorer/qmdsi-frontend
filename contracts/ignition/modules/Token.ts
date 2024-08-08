import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const supply = parseEther("3000000")
const name = "QMGTToken"
const symbol = "$QMGT"

const TokenModule = buildModule("LockModule", (m) => {
  
  const token = m.contract("QMGTToken", [supply, name, symbol]);
  return { token };
});

export default TokenModule;
