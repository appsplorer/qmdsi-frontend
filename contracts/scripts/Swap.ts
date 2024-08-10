  import hre, { viem } from "hardhat";
  import { getAddress, parseGwei, parseEther } from "viem";

const initSupply = parseEther("1000000")
const name = "QMGTToken"
const symbol = "$QMGT"
const initSwap = parseEther("10000000")

const sepoliaOracle = "0xC5981F461d74c46eB4b0CF3f4Ec79f025573B0Ea"
const token = "0xb822d4ec2a0b3960457649166fa5fe69673a86d8"
const usdt = "0xcc1b1fb1b260cd86f871c66227d2f813db26b756"
const swapContract = "0x01f168114364c0c4ce688217cd17251ee7fdd646"
const main = async  () => {
    const [signer] = await viem.getWalletClients()
    // const publicClient = await viem.getPublicClient()
    // console.log(await publicClient.getBalance({address: signer.account.address}))
    // console.log(signer.account.address)
    // const swap  = await viem.deployContract("QMGTSwap", [sepoliaOracle, usdt, token])
    const tokenContract  = await  viem.getContractAt("Token", usdt)
    await tokenContract.write.transfer([swapContract, parseEther("100000")])
    // console.log(await tokenContract.read.balanceOf([signer.account.address]))
    // const swap = await viem.getContractAt("QMGTSwap", swapContract)
    // const qmgtAMount = await swap.read.getQmgtAmount([parseEther("1")])
    // console.log(qmgtAMount)
    // const usdAmount = await swap.read.getUsdAmount([qmgtAMount])
  
    // console.log(usdAmount)
    // console.log(swap.address)
}


main().catch((e) => {
    console.error(e)
    process.exit(1)
})
