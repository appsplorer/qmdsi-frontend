import { LogOut, User, Wallet } from "lucide-react";
import { useContext, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import LoginModal from "./LoginModal";
import Balance from "./Balance";

// Utility function to shorten address
const shortenAddress = (address) =>
  `${address.slice(0, 4)}...${address.slice(-4)}`;

const Navigation = () => {
  const [showModal, setShowModal] = useState(false);
  const [navShow, setNavShow] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const closeModal = () => setShowModal(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Links dynamically filtered based on auth state
  const links = useMemo(() => {
    if (auth.isAuthenticated) {
      return [
        { to: "/profile", label: "Profile", icon: <User size={16} /> },
        {
          label: "Wallet Balance",
          icon: <Wallet size={16} />,
          action: () => setShowBalance(true),
        },
        { label: "Logout", icon: <LogOut size={16} />, action: handleLogout },
      ];
    }
    return [{ to: "/signin", label: "Login" }];
  }, [auth.isAuthenticated]);

  return (
    <header
      className={`blur-bg w-screen fixed top-0 left-0 z-50 h-20 flex items-center justify-center`}
    >
      <div className={`container mx-auto px-0 md:px-10 text-white w-full`}>
        {/* Brand and Logo */}
        <div className="flex items-center justify-between gap-8 md:gap-[4vw] w-full relative" >
          <Link to="/">
          <h1 className="flex items-center text-2xl text-yellow-400 my-4 font-thin tracking-wider pl-4 md:pl-4">
            <img src="/aurun_favi.png" className="w-10 pr-2" alt="Aurum Logo" />
            au<span className="text-gray-400">rum</span>
          </h1>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden mr-4 z-50">
            <button
              className={`text-white text-2xl cursor-pointer z-50`}
              onClick={() => {
                setNavShow(!navShow);
              }}
            >
              {navShow ? <IoClose size={36} /> : <GiHamburgerMenu size={32} />}
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`absolute md:static top-0 left-0 w-full h-screen md:h-auto md:w-auto transition-transform duration-500 ease-in-out ${
              navShow ? "nav-open" : "nav-close"
            } md:flex items-center bg-charcoalBlue md:bg-transparent`}
          >
            <ul className="text-lg flex flex-col items-start mt-20 md:mt-0 h-full md:flex-row gap-4 w-full">
              {links.map((link, idx) => (
                <li key={idx}>
                  {link.to ? (
                    <Link to={link.to} onClick={() => setNavShow(false)}>
                      <div className="text-white hover:text-golden duration-300 p-2 px-4 flex gap-2 items-center nav-link">
                        {link.icon} {link.label}
                      </div>
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        link.action?.();
                        setNavShow(false);
                      }}
                      className="text-white hover:text-golden duration-300 p-2 px-4 flex gap-2 items-center nav-link"
                    >
                      {link.icon} {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showModal && <LoginModal closeModal={closeModal} />}
      <Balance isOpen={showBalance} onClose={() => setShowBalance(false)} />
    </header>
  );
};

export default Navigation;
