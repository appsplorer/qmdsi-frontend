import { parseEther } from "ethers";
import hre, { viem } from "hardhat";

const swapAddress = "0x4a200cfaee47ef49bd94173a7541a88a8dbc583a"


const main = async () => {
    
    const qmdsiAdmin = await viem.deployContract("QMDSIAdmin",  [swapAddress])
    console.log(qmdsiAdmin.address)
}


main().catch((e) => {
    console.error(e)
    process.exit()
})