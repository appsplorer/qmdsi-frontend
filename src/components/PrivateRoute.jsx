import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const { auth } = useContext(AuthContext);

  if (!auth || !auth.accessToken) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
