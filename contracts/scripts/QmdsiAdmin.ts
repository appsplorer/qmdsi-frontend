import { parseEther } from "ethers";
import hre, { viem } from "hardhat";

const swapAddress = "0x4a200cfaee47ef49bd94173a7541a88a8dbc583a"
const qmdsiAdminAddress = "0x09bf8d338652f0aff2bd00338cefb2fb7e090ac4"

const main = async () => {
    
    const qmdsiAdmin = await viem.deployContract("QMDSIAdmin", [swapAddress])
    
    // const res = await qmdsiAdmin.write.sellQmgt(["PddbAQQHLxkoJ8AHzZoRNX", amount])
    console.log(qmdsiAdmin.address)
    // console.log(res)
}


main().catch((e) => {
    console.error(e)
    process.exit()
})