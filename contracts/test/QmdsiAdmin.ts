import hre, { viem } from "hardhat";
import { getAddress, parseGwei, parseEther } from "viem";
import { expect } from "chai";




describe("QmdsiAdmin", () => {

    describe("User Address", () => {
        it("Should set and deploy user address", async () => {
            const provider = await viem.getPublicClient()

            const [signer] = await viem.getWalletClients()
            const contract = await viem.deployContract("QMDSIAdmin")
            const address = await contract.read.getUserAccount([signer.account.address])
            const initialCode = await provider.getCode({address : address})
            await contract.write.initAccount([signer.account.address])
            const finalCode = await provider.getCode({address})
            
            expect(initialCode).be.undefined
            expect(finalCode).not.undefined
            
            const walletContract = await viem.getContractAt("UserAccount", address) 
            const owner = await walletContract.read.owner()
            expect(owner.toLowerCase()).eq(signer.account.address.toLowerCase())
        })
        it("Should ")
    })

})