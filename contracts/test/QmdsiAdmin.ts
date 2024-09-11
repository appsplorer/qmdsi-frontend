import hre, { viem } from "hardhat";
import { getAddress, parseGwei, parseEther } from "viem";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";

const initSupply = parseEther("1000000000000000")
const name = "QMGTToken"
const symbol = "$QMGT"
const initSwap = parseEther("1000000000")
const treasury = getAddress("0x594C03Bc75C0dA7f38EEb88640691442EDfaF16C")


describe("QmdsiAdmin", () => {

    
    const deployContract = async () => {
        const usdt = await hre.viem.deployContract("Token", [initSupply, "USD Tether", "USDT"])
        const token = await hre.viem.deployContract("QMGTToken", [initSupply, name, symbol])
        const mockAggregator = await hre.viem.deployContract("AggregatorV3")
        
        const swap = await hre.viem.deployContract("QMGTSwap",  [mockAggregator.address, usdt.address,
            token.address, treasury])
        await usdt.write.transfer([swap.address, initSwap])
        await token.write.transfer([swap.address, initSwap])
        const contract = await viem.deployContract("QMDSIAdmin", [swap.address])
        return {usdt, token, contract, swap}
    }


    describe("User Address", () => {
        
        it("Should set and deploy user address", async () => {
            const provider = await viem.getPublicClient()

            const [signer] = await viem.getWalletClients()
            const {usdt, token, contract} = await loadFixture(deployContract)
            

            // await token.write.transfer([swap.address, parseEther("100000")])
            // await usdt.write.transfer([swap.address, parseEther("100000")])
            // const contract = await viem.deployContract("QMDSIAdmin", [swap.address])
            // const address = await contract.read.getUserAccount(["Dunno"])
            // const initialCode = await provider.getCode({address : address})
            // const walletContract = await viem.getContractAt("UserAccount", address) 
            // const owner = await walletContract.read.owner()
            // console.log(owner)
        })
        it("Shoud swap tokens", async () => {
            const [signer] = await hre.viem.getWalletClients()
            const {contract, token, usdt, swap} = await loadFixture(deployContract)
            const userId= "Dunno"
            const swapAmount = parseEther("10")
            
            const userAddress = await contract.read.getUserAccount([userId])
            console.log(userAddress)
            await usdt.write.transfer([userAddress, parseEther("1000")])
            await token.write.transfer([userAddress, parseEther("1000")])
            const userBalance = await usdt.read.balanceOf([userAddress])
            console.log(`Swap address ${swap.address}`)
            
            // cons
            // await usdt.write.transfer([userAddress, parseEther("100")])
            // await contract.write.buyQmgt([userId, parseEther("2")])
            await contract.write.sellQmgt([userId, parseEther("20")])


        })
      
        
    })

})