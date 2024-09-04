import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Swap from "./pages/Swap.jsx";
import ErrorPage from "./components/404.jsx";
import QMS from "./pages/QMS.jsx";
import QCA from "./pages/QCA.jsx";
import SmartTrade from "./pages/SmartTrade.jsx";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { ContractContextProvider } from "./contexts/ContractContext.jsx";
import KYC from "./pages/KYC.jsx";
import Profile from "./pages/Profile.jsx";
import Register from "./pages/Register.jsx";
import Verify from './pages/verify.jsx'
import Login from "./pages/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Verification from './components/verification.jsx'
const projectId = "61f529aa30c77838f2502740d05202ad";
import { metadata, bscTestnet } from "./constants/crypto.js";

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [bscTestnet],
  projectId,
  enableAnalytics: false, // Optional - defaults to your Cloud configuration
});

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Swap />,
      },
      {
        path: "/signin",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/pool",
        element: <Swap />,
      },
      {
        path: "/vote",
        element: <Swap />,
      },
      {
        path: "/qms",
        element: <QMS />,
      },
      {
        path: "/qca",
        element: <QCA />,
      },
      {
        path: "/smart-trade",
        element: <SmartTrade />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/kyc",
            element: <KYC />,
          },
          {
            path : "/verify",
            element : <Verify />
          }
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContractContextProvider>
      <RouterProvider router={router} />
    </ContractContextProvider>
  </React.StrictMode>
);
