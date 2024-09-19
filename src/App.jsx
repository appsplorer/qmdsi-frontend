import Navigation from "./components/Navigation";
import { Outlet, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";
import ToastConfig from "./components/ToastConfig";

export default function App() {
  const location = useLocation();
  console.log(location);
  return (
    <div className="bg-charcoalBlue min-h-screen">
      <AuthProvider>
        <Navigation />
        <div className="pt-14">
          <Outlet />
        </div>
      </AuthProvider>
      <ToastConfig />
    </div>
  );
}
