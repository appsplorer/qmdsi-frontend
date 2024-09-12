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
import KYC from "./pages/KYC.jsx";
import Profile from "./pages/Profile.jsx";
import Register from "./pages/Register.jsx";
import Verify from "./pages/verify.jsx";
import Login from "./pages/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Verification from "./components/verification.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
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
        path: "/verify_email",
        element: <VerifyEmail />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/reset_password",
        element: <ResetPassword />,
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
            path: "/verify",
            element: <Verify />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
