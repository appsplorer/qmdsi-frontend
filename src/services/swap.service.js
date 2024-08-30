import { Contract, formatEther, parseEther, ZeroAddress } from 'ethers'
import { JsonRpcProvider } from 'ethers'
import { swapAddress } from '../addresses'
import { swapAbi } from '../abis/swapAbi'
import { erc20Abi } from '../abis/erc20Abi'

const provider = new JsonRpcProvider("https://data-seed-prebsc-1-s1.bnbchain.org:8545")

const swapContract = new Contract(swapAddress, swapAbi, provider)
const tokenContract = new Contract(ZeroAddress, erc20Abi, provider)

export const getAmountOut = async (tokenIn, amountIn) => {
    if (tokenIn === "usdt") {
        const res = await swapContract.getQmgtAmount(parseEther(amountIn));
        return formatEther(res);
    } else {
        const res = await swapContract.getUsdAmount(parseEther(amountIn));
        return formatEther(res);
    }
};

export const getTokenBalance = async (tokenAddress, owner) => {
    const balance = await tokenContract.attach(tokenAddress).balanceOf(owner)
    return balance
}

export const getTokenDecimals = async (tokenAddress) => {
    const decimals = await tokenContract.attach(tokenAddress).decimals()
    return decimals
}