/* eslint-disable react-refresh/only-export-components */
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/404.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Loading from "./components/Loading.jsx";
import Usdt from "./advance-phases/Usdt.jsx";
import ChooseToken from "./advance-phases/bill-payment/ChooseToken.jsx";

// Lazy load the components
const Swap = lazy(() => import("./pages/Swap.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail.jsx"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword.jsx"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.jsx"));
const QMS = lazy(() => import("./pages/QMS.jsx"));
const QCA = lazy(() => import("./pages/QCA.jsx"));
const SmartTrade = lazy(() => import("./pages/SmartTrade.jsx"));
const KYC = lazy(() => import("./pages/KYC.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Nom = lazy(() => import("./pages/Nominee.jsx"));
const Verify = lazy(() => import("./pages/verify.jsx"));

const Verification = lazy(() => import("./components/verification.jsx"));
const Deposit = lazy(() => import("./pages/Deposit.jsx"));
const Deposits = lazy(() => import("./pages/Deposits.jsx"));
const UserProfile = lazy(() => import("./pages/UserProfile.jsx"));

// advance
const Advance = lazy(() => import("./advance-phases/index.jsx"));
const Utility = lazy(() => import("./advance-phases/aurum-utility/index.jsx"));
const GES = lazy(() => import("./advance-phases/GroupEnhanceSave/GES.jsx"));
const GESInfo = lazy(() =>
  import("./advance-phases/GroupEnhanceSave/details.jsx")
);
const PreserveQMGT = lazy(() =>
  import("./advance-phases/preserveQMGT/Preserve.jsx")
);

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // advance
      {
        path: "/advance",
        element: (
          <Suspense fallback={<Loading />}>
            <Advance />
          </Suspense>
        ),
      },
      {
        path: "/aurum-utility",
        element: (
          <Suspense fallback={<Loading />}>
            <Utility />
          </Suspense>
        ),
      },
      {
        path: "/GesInfo/:type?",
        element: (
          <Suspense fallback={<Loading />}>
            <GESInfo />
          </Suspense>
        ),
      },
      {
        path: "/Preserve",
        element: (
          <Suspense fallback={<Loading />}>
            <PreserveQMGT />
          </Suspense>
        ),
      },
      {
        path: "/GES",
        element: (
          <Suspense fallback={<Loading />}>
            <GES />
          </Suspense>
        ),
      },

      // old
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <Swap />
          </Suspense>
        ),
      },
      {
        path: "/signin",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/verify_email",
        element: (
          <Suspense fallback={<Loading />}>
            <VerifyEmail />
          </Suspense>
        ),
      },
      {
        path: "/forget-password",
        element: (
          <Suspense fallback={<Loading />}>
            <ForgetPassword />
          </Suspense>
        ),
      },
      {
        path: "/reset_password",
        element: (
          <Suspense fallback={<Loading />}>
            <ResetPassword />
          </Suspense>
        ),
      },
      {
        path: "/pool",
        element: (
          <Suspense fallback={<Loading />}>
            <Swap />
          </Suspense>
        ),
      },
      {
        path: "/vote",
        element: (
          <Suspense fallback={<Loading />}>
            <Swap />
          </Suspense>
        ),
      },
      {
        path: "/qms",
        element: (
          <Suspense fallback={<Loading />}>
            <QMS />
          </Suspense>
        ),
      },
      {
        path: "/qca",
        element: (
          <Suspense fallback={<Loading />}>
            <QCA />
          </Suspense>
        ),
      },
      {
        path: "/smart-trade",
        element: (
          <Suspense fallback={<Loading />}>
            <SmartTrade />
          </Suspense>
        ),
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/profile",
            element: (
              <Suspense fallback={<Loading />}>
                <Profile />
              </Suspense>
            ),
          },
          {
            path: "/kyc",
            element: (
              <Suspense fallback={<Loading />}>
                <KYC />
              </Suspense>
            ),
          },
          {
            path: "/nominee",
            element: (
              <Suspense fallback={<Loading />}>
                <Nom />
              </Suspense>
            ),
          },
          {
            path: "/verify",
            element: (
              <Suspense fallback={<Loading />}>
                <Verify />
              </Suspense>
            ),
          },
          {
            path: "/me",
            element: (
              <Suspense fallback={<Loading />}>
                <UserProfile />
              </Suspense>
            ),
          },
          {
            path: "/deposits",
            element: (
              <Suspense fallback={<Loading />}>
                <Deposits />
              </Suspense>
            ),
          },
          {
            path: "/deposits/:id",
            element: (
              <Suspense fallback={<Loading />}>
                <Deposit />
              </Suspense>
            ),
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
