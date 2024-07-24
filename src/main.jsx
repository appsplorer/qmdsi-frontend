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
    <RouterProvider router={router} />
  </React.StrictMode>,
)
