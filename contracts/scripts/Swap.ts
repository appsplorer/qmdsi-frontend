  import hre, { viem } from "hardhat";
  import { getAddress, parseGwei, parseEther } from "viem";

const initSupply = parseEther("1000000")
const name = "QMGTToken"
const symbol = "$QMGT"
const initSwap = parseEther("10000000")

const bscScanOracle = "0x4E08A779a85d28Cc96515379903A6029487CEbA0"

const token = "0b822d4ec2a0b3960457649166fa5fe69673a86d8"
const usdt = "0xcc1b1fb1b260cd86f871c66227d2f813db26b756"
const swapContract = "0x4b53fc3473692a62216b13b031a045279d1c52e6"

const usdtBsc = "0x2b8c6e1ef428a8606baa573bc9c1f63d2a627c36"
const tokenBsc = "0x6edbf10da8de5cfed34a9e85d184a3134580d891"

const main = async  () => {
    const [signer] = await viem.getWalletClients()
    console.log(signer.account.address)
    
    // const publicClient = await viem.getPublicClient()
    // console.log(await publicClient.getBalance({address: signer.account.address}))
    // console.log(signer.account.address)
    const swap  = await viem.deployContract("QMGTSwap", [sepoliaOracle, usdt, token, signer.account.address])
    // console.log(swap.address)
    // const swap = await viem.getContractAt("QMGTSwap", swapContract)
    // const goldPrice = await swap.read.getLatestGoldPrice()
    const tokenAmount  = await swap.read.getQmgtAmount([parseEther("78.33")])
    const usdtAmount = await swap.read.getUsdAmount([tokenAmount])
    console.log(tokenAmount)
    console.log(usdtAmount)
    
    // console.log(goldPrice)
    
    // divide by 31
    
    // const tokenContract  = await  viem.getContractAt("Token", usdt)
    // await tokenContract.write.transfer([swapContract, parseEther("100000")])
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
