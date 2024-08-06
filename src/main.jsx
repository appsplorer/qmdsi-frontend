import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Swap from './pages/Swap.jsx'
import ErorrPage from './components/404.jsx'
import QMS from './pages/QMS.jsx'
import QCA from './pages/QCA.jsx'
import SmartTrade from './pages/SmartTrade.jsx'
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import { ContractContextProvider } from './contexts/ContractContext.jsx'
const projectId = 'YOUR_PROJECT_ID'

const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

const sepolia = {
  chainId: 11155111,
  name: 'Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com'
}


// 3. Create a metadata object
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1 // used for the Coinbase SDK
})

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet, sepolia],
  projectId,
  enableAnalytics: false // Optional - defaults to your Cloud configuration
})



const router = createBrowserRouter([
  {
    element : <App />,
    errorElement : <ErorrPage />,
    children : [
      {
        path : "/",
        element : <Swap />,
      },
      {
        path : "/pool",
        element : <Swap />,
      },
      {
        path : "/vote",
        element : <Swap />,
      },
      {
        path : "/qms",
        element : <QMS />,
      },
      {
        path : "/qca",
        element : <QCA />,
      },
      {
        path : "/smart-trade",
        element : <SmartTrade />,
      }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContractContextProvider>
      <RouterProvider router={router} />
    </ContractContextProvider>
  </React.StrictMode>,
)
