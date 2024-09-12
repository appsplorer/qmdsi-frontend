import Navigation from "./components/Navigation";
import { Outlet } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";
import ToastConfig from "./components/ToastConfig";

export default function App() {
  return (
    <div className="bg-blue">
      <AuthProvider>
        <Navigation />
        <Outlet />
      </AuthProvider>
      <ToastConfig />
    </div>
  );
}
