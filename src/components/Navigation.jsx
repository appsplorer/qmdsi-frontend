import { Ellipsis, X, LogOut, User, Wallet } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import Balance from "./Balance";
import { AuthContext } from "../contexts/AuthContext";

const shortenAddress = (address) => {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

const Navigation = () => {
  const [showModal, setShowModal] = useState(false);
  const [navShow, setNavShow] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="blur-bg w-full fixed top-0 left-0 z-50 h-20 ">
      <div className="container mx-auto px-4 py-4  md:px-14 text-white flex justify-between">
        <div className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
          <h1 className="flex items-center text-xl text-golden font-bold">
            <img src="/qmdsiLogo.png" className="w-16" alt="" />
            Aurum
          </h1>
          <div
            className={`nav-links duration-500 md:static bg-background absolute left-0 w-full flex flex-col items-center px-5 z-1000 md:z-0 ${
              navShow ? "top-0 h-screen bg-charcoalBlue" : "top-[-100%]"
            }`}
          >
            <div className="absolute right-10 top-10 md:hidden justify-end">
              <button onClick={() => setNavShow(false)}>
                <X />
              </button>
            </div>
          </div>
        </div>
        <div className="nav-right text-sm flex gap-2 items-center">
          {auth.isAuthenticated ? (
            <>
              <button
                className="bg-accent py-2 px-5 rounded hover:bg-black h-[35px] text-primary flex items-center gap-2"
                onClick={() => navigate("/profile")}
              >
                <User size={16} /> Profile
              </button>
              {auth.isAuthenticated && (
                <button
                  className="bg-accent py-2 px-5 rounded hover:bg-black h-[35px] text-primary flex items-center gap-2"
                  onClick={() => setShowBalance(true)}
                >
                  <Wallet size={16} /> Wallet Balance
                </button>
              )}
              <button
                className="bg-accent py-2 px-5 rounded hover:bg-black h-[35px] text-primary flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <button
              className="bg-accent text-xl tracking-wider py-2 px-5 rounded hover:bg-black h-[35px] text-primary"
              onClick={() => navigate("/signin")}
            >
              Login
            </button>
          )}

          <button
            className="bg-accent py-1 px-3 rounded-lg hover:bg-black mt-2 blur-bg"
            onClick={() => {
              setNavShow(!navShow);
            }}
          >
            <Ellipsis />
          </button>
        </div>
      </div>
      {showModal && <LoginModal closeModal={closeModal} />}
      <Balance isOpen={showBalance} onClose={() => setShowBalance(false)} />
    </header>
  );
};

export default Navigation;
