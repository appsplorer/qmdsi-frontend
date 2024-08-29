import hre, { viem } from "hardhat";
import { getAddress, parseGwei, parseEther } from "viem";
import { expect } from "chai";

const initSupply = parseEther("1000000")
const name = "QMGTToken"
const symbol = "$QMGT"
const initSwap = parseEther("10000000")
const treasury = getAddress("0x594C03Bc75C0dA7f38EEb88640691442EDfaF16C")


describe("QmdsiAdmin", () => {

    describe("User Address", () => {
        
        it("Should set and deploy user address", async () => {
            const provider = await viem.getPublicClient()

            const [signer] = await viem.getWalletClients()
            const usdt = await hre.viem.deployContract("Token", [initSupply, "USD Tether", "USDT"])
            const token = await hre.viem.deployContract("QMGTToken", [initSupply, name, symbol])
            const mockAggregator = await hre.viem.deployContract("AggregatorV3")

            const swap = await hre.viem.deployContract("QMGTSwap",  [mockAggregator.address, usdt.address,
                token.address, treasury])
            
            const contract = await viem.deployContract("QMDSIAdmin", [swap.address])
            const address = await contract.read.getUserAccount(["Dunno"])
            
            const initialCode = await provider.getCode({address : address})
            
            await contract.write.initAccount(["Dunno"])
            const finalCode = await provider.getCode({address})
            
            expect(initialCode).be.undefined
            expect(finalCode).not.undefined
            
            const walletContract = await viem.getContractAt("UserAccount", address) 
            const owner = await walletContract.read.owner()
            console.log(owner)
            
        })
      
        
    })

})