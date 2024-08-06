import hre, { viem } from "hardhat";
import { getAddress, parseGwei, parseEther } from "viem";

const initSupply = parseEther("10000000000")
const name = "Tether USD"
const symbol = "USDT"
const initSwap = parseEther("10000000")



const main = async  () => {

    const token = await viem.deployContract("Token", [initSupply, name, symbol])
    console.log( token.address)
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
