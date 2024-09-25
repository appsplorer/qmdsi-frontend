import { LogOut, User, Wallet } from "lucide-react";
import { useContext, useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import LoginModal from "./LoginModal";
import Balance from "./Balance";

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
    return [];
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setNavShow(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogin = () => {
    setShowModal(true);
  };

  return (
    <header className="blur-bg w-full fixed top-0 left-0 z-50 h-20 flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-10 text-white w-full">
        <div className="flex items-center justify-between w-full relative">
          <Link to="/" className="z-20">
            <h1 className="flex items-center text-2xl text-yellow-400 font-thin tracking-wider">
              <img
                src="/aurun_favi.png"
                className="w-10 mr-2"
                alt="Aurum Logo"
              />
              au<span className="text-gray-400">rum</span>
            </h1>
          </Link>

          <div className="flex items-center gap-4 md:hidden z-20">
            {!auth.isAuthenticated && (
              <Link
                to="/signin"
                className="text-white hover:text-golden duration-300 text-sm font-medium"
              >
                Login
              </Link>
            )}
            <button
              className="text-white text-2xl cursor-pointer"
              onClick={() => setNavShow(!navShow)}
            >
              {navShow ? <IoClose size={36} /> : <GiHamburgerMenu size={32} />}
            </button>
          </div>

          <nav
            className={`
            fixed md:static top-0 right-0 w-64 md:w-auto h-full md:h-auto
            transition-all duration-300 ease-in-out
            ${navShow ? "translate-x-0" : "translate-x-full md:translate-x-0"}
            flex flex-col md:flex-row items-start md:items-center justify-start md:justify-end
            bg-charcoalBlue md:bg-transparent
            z-50 md:z-auto
            overflow-y-auto md:overflow-visible
          `}
          >
            <ul className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-4 w-full md:w-auto p-6 md:p-0">
              {links.map((link, idx) => (
                <li key={idx} className="w-full md:w-auto">
                  {link.to ? (
                    <Link
                      to={link.to}
                      onClick={() => setNavShow(false)}
                      className="text-white hover:text-golden duration-300 flex items-center gap-2 w-full md:w-auto"
                    >
                      {link.icon} {link.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        link.action?.();
                        setNavShow(false);
                      }}
                      className="text-white hover:text-golden duration-300 flex items-center gap-2 w-full md:w-auto"
                    >
                      {link.icon} {link.label}
                    </button>
                  )}
                </li>
              ))}
              {!auth.isAuthenticated && (
                <li className="hidden md:block">
                  <button
                    onClick={handleLogin}
                    className="text-white hover:text-golden duration-300 flex items-center gap-2"
                  >
                    Login
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>

      {showModal && <LoginModal closeModal={closeModal} />}
      <Balance isOpen={showBalance} onClose={() => setShowBalance(false)} />
    </header>
  );
};

export default Navigation;
