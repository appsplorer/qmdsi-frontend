// import { parseEther, getAddress } from "ethers";
import hre, { viem } from "hardhat";

const swapAddress = "0x4A200Cfaee47eF49Bd94173A7541a88A8Dbc583A"
const qmdsiAdminAddress = "0x09bf8d338652f0aff2bd00338cefb2fb7e090ac4"

const main = async () => {
    
    const qmdsiAdmin = await viem.deployContract("Token", [1000n, "22020n", "222n"])
    
    // const res = await qmdsiAdmin.write.sellQmgt(["PddbAQQHLxkoJ8AHzZoRNX", amount])
    console.log(qmdsiAdmin.address)
    // console.log(res)
}


main().catch((e) => {
    console.error(e)
    process.exit()
})