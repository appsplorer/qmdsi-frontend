  import hre, { viem } from "hardhat";
  import { getAddress, parseGwei, parseEther } from "viem";

const initSupply = parseEther("1000000")
const name = "QMGTToken"
const symbol = "$QMGT"
const initSwap = parseEther("10000000")

const bscScanOracle = "0x4E08A779a85d28Cc96515379903A6029487CEbA0"

const token = "0b822d4ec2a0b3960457649166fa5fe69673a86d8"
const usdtAddress = "0xbf5564f8799566784d4031839613aeeb5b7bba5a"
const swapContract = "0x4a200cfaee47ef49bd94173a7541a88a8dbc583a"


const main = async  () => {
    const [signer] = await viem.getWalletClients()
    console.log(signer.account.address)
    
    // const publicClient = await viem.getPublicClient()
    // console.log(await publicClient.getBalance({address: signer.account.address}))
    // console.log(signer.account.address)
    // const swap  = await viem.deployContract("QMGTSwap", [sepoliaOracle, usdt, token, signer.account.address])
    // console.log(swap.address)
    const swap = await viem.getContractAt("QMGTSwap", swapContract)
    const usdt = await viem.getContractAt("Token", usdtAddress)
    // const approveRes = await usdt.write.approve([swapContract, parseEther("10000")])
    // console.log(approveRes)
    const res = await swap.write.buyQmgt([parseEther("10")])
    // console.log(res)
    // const goldPrice = await swap.read.getLatestGoldPrice()
    // const tokenAmount  = await swap.read.getQmgtAmount([parseEther("78.33")])
    // const usdtAmount = await swap.read.getUsdAmount([tokenAmount])
    // console.log(tokenAmount)
    // console.log(usdtAmount)
    
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
