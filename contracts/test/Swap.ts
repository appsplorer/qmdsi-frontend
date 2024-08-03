import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
  import { expect } from "chai";
  import hre from "hardhat";
  import { getAddress, parseGwei, parseEther } from "viem";

const initSupply = parseEther("1000000")
const name = "QMGTToken"
const symbol = "$QMGT"
const initSwap = parseEther("10000000")
describe("Token", () => {

    async function deployContracts() {
        const usdt = await hre.viem.deployContract("Token", [initSupply, "USD Tether", "USDT"])
        const token = await hre.viem.deployContract("QMGTToken", [initSupply, name, symbol])        
        const mockAggregator = await hre.viem.deployContract("AggregatorV3")
        
        const swap = await hre.viem.deployContract("QMGTSwap",  [mockAggregator.address, usdt.address,
                                             token.address])
        return {usdt, token, swap}
    }
    
    describe("Swap", () => {
        it("Should buy token", async () => {
            const {usdt, token, swap} = await loadFixture(deployContracts)
            // await token.write.transfer([swap.address, initSwap])
            const amountOut = await swap.read.getQmgtAmount([parseEther("100")])
            console.log(amountOut)
            // const goldPrice = await swap.read.getLatestGoldPrice();


        })
    })


  })