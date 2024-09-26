import { parseEther } from "ethers";
import hre, { viem } from "hardhat";

const bscScanOracle = "0x4E08A779a85d28Cc96515379903A6029487CEbA0"
const tokenAddress = "0x1359899ab37623c8ddf07dcd2295a50cd6db549a"
const usdtAddress = "0xbf5564f8799566784d4031839613aeeb5b7bba5a"
const sendTo = '0xa95fDA6ad20Ea0793AD5f54958eE53a2054Bc326'

const main = async () => {
    const [signer] = await viem.getWalletClients()
    const provider = await viem.getPublicClient()
    const usdt = await viem.getContractAt("Token", usdtAddress)
    const token = await viem.getContractAt("Token", tokenAddress) 
    // const usdt = await viem.deployContract("Token", [parseEther("1000000000000"), "USD Tether", "USDT"])
    // const token = await viem.deployContract("Token", [parseEther("1000000000000"), "QMGTToken", "$QMGT"])
    // const swap  = await viem.deployContract("QMGTSwap", [bscScanOracle, usdt.address, token.address, signer.account.address])
     const res = await token.write.transfer([sendTo, parseEther("2000000")])
     await provider.waitForTransactionReceipt({hash : res})
     await usdt.write.transfer([sendTo, parseEther("80000000")])
    console.log(res)
    // const qmdsiAdmin = await viem.deployContract("QMDSIAdmin", ["0x4a200cfaee47ef49bd94173a7541a88a8dbc583a"])
    // console.log(qmdsiAdmin.address)
    // console.log(`Swap deployed at ${swap.address}`)
    // console.log(`Token deployed at ${token.address}`)
    // console.log(`Usdt deplotyed at ${usdt.address}`)
}


main().catch((e) => {
    console.error(e)
    process.exit()
})
