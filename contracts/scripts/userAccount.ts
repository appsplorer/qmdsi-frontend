import { parseEther } from "ethers";
import hre, { viem } from "hardhat";

const swapAddress = "0x366f2C2ea4Ac92b947295Bb6CDA5821653D82139"


const main = async () => {
    
    const qmdsiAdmin = await viem.deployContract("UserAccount",  [swapAddress])
    console.log(qmdsiAdmin.address)
}


main().catch((e) => {
    console.error(e)
    process.exit()
})