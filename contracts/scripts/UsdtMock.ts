import hre, { viem } from "hardhat";
import { getAddress, parseGwei, parseEther } from "viem";

const initSupply = parseEther("10000000000")
const name = "Tether USD"
const symbol = "USDT"
const initSwap = parseEther("10000000")

const usdtAddress = "0xcc1b1fb1b260cd86f871c66227d2f813db26b756"

const main = async  () => {

    // const token = await viem.deployContract("Token", [initSupply, name, symbol])
    const token = await viem.getContractAt("Token", usdtAddress)
    await token.write.transfer(["0xb22A24A145bbCC86F875A2DBfcCcAE905b06c7E3", parseEther("10000")])
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
