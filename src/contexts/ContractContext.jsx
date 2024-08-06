import { useWeb3Modal, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { createContext } from "react";


export const ContractContext = createContext({})

export const ContractContextProvider = ({children}) => {
    const { walletProvider } = useWeb3ModalProvider()
    console.log(walletProvider)




    return <ContractContext.Provider value={{}}>
        {children}
    </ContractContext.Provider>
}