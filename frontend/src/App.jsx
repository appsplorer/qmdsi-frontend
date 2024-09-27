import Navigation from "./components/Navigation";
import { Outlet, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";
import ToastConfig from "./components/ToastConfig";

export default function App() {
  const location = useLocation();
  console.log(location);
  return (
    <div className="bg-charcoalBlue w-full min-h-screen relative  shadow-bg overflow-hidden">
      <AuthProvider>
        <div className="container mx-auto  relative z-20">
          {" "}
          <Navigation />
          <div className="pt-28 md:pt-40 ">
            <Outlet />
          </div>
        </div>
      </AuthProvider>
      <ToastConfig />
      <div className="shadow-list a"></div>
      <div className="shadow-list b"></div>
    </div>
  );
}
