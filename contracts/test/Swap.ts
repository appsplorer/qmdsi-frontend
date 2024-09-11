import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
  import { expect } from "chai";
  import hre from "hardhat";
  import { getAddress, parseGwei, parseEther } from "viem";

const initSupply = parseEther("10000000000000")
const name = "QMGTToken"
const symbol = "$QMGT"
const initSwap = parseEther("10000000")
const treasury = getAddress("0x594C03Bc75C0dA7f38EEb88640691442EDfaF16C")

describe("Token", () => {

    async function deployContracts() {
        const usdt = await hre.viem.deployContract("Token", [initSupply, "USD Tether", "USDT"])
        const token = await hre.viem.deployContract("QMGTToken", [initSupply, name, symbol])        
        const mockAggregator = await hre.viem.deployContract("AggregatorV3")
        
        const swap = await hre.viem.deployContract("QMGTSwap",  [mockAggregator.address, usdt.address,
                                             token.address, treasury])
        console.log(`Swap address ${swap.address}`)
        await token.write.transfer([swap.address, initSwap])
        await usdt.write.transfer([swap.address, initSwap])
        return {usdt, token, swap}
    }
    
    describe("Swap", () => {
        it("Should buy token", async () => {
            const [signer] = await hre.viem.getWalletClients()
            console.log(`Signer address ${signer.account.address}`)
            const {usdt, token, swap} = await loadFixture(deployContracts)
            
            const amountOut = await swap.read.getQmgtAmount([parseEther("100")])
            await token.write.approve([swap.address, initSwap])
            await usdt.write.approve([swap.address, initSwap])
            
            await swap.write.sellQmgt([parseEther("1000")])
            // const goldPrice = await swap.read.getLatestGoldPrice();


        })
    })


  })