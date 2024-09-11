import { parseEther } from "ethers";
import hre, { viem } from "hardhat";

const bscScanOracle = "0x4E08A779a85d28Cc96515379903A6029487CEbA0"
const tokenAddress = "0x1359899ab37623c8ddf07dcd2295a50cd6db549a"
const usdtAddress = "0xbf5564f8799566784d4031839613aeeb5b7bba5a"

const main = async () => {
    const [signer] = await viem.getWalletClients()
    const provider = await viem.getPublicClient()
    const usdt = await viem.getContractAt("Token", usdtAddress)
    const token = await viem.getContractAt("Token", tokenAddress) 
    // const usdt = await viem.deployContract("Token", [parseEther("1000000000000"), "USD Tether", "USDT"])
    // const token = await viem.deployContract("Token", [parseEther("1000000000000"), "QMGTToken", "$QMGT"])
    // const swap  = await viem.deployContract("QMGTSwap", [bscScanOracle, usdt.address, token.address, signer.account.address])
    const res = await token.write.transfer(["0xf70de4F32C5D54AEDD588447B13B8158801AD7D0", parseEther("200")])
    await provider.waitForTransactionReceipt({hash : res})
    await usdt.write.transfer(["0xf70de4F32C5D54AEDD588447B13B8158801AD7D0", parseEther("200")])
    
    // console.log(`Swap deployed at ${swap.address}`)
    console.log(`Token deployed at ${token.address}`)
    console.log(`Usdt deplotyed at ${usdt.address}`)
}


main().catch((e) => {
    console.error(e)
    process.exit()
})