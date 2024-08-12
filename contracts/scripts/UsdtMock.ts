import hre, { viem } from "hardhat";
import { getAddress, parseGwei, parseEther } from "viem";

const initSupply = parseEther("10000000000000")
const name = "Tether USD"
const symbol = "USDT"
const initSwap = parseEther("100000000")

const usdtAddress = "0xbf5564f8799566784d4031839613aeeb5b7bba5a"

const main = async  () => {

    // const token = await viem.deployContract("Token", [initSupply, name, symbol])
    // console.log(token.address)
    const token = await viem.getContractAt("Token", usdtAddress)
    await token.write.transfer(["0xAF7bf051a26344B1863d05D4e20192613ddacD19", parseEther("10000")])
    // console.log( token.address)
    //   const [signer] = await viem.getWalletClients()
  // const publicClient = await viem.getPublicClient()
  // console.log(await publicClient.getBalance({address: signer.account.address}))
  // console.log(signer.account.address)
//   const swap  = await viem.deployContract("QMGTSwap", [])
}


main().catch((e) => {
  console.error(e)
  process.exit(1)
})
