import { LogOut, User, Wallet } from "lucide-react";
import { useContext, useState, useMemo, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import LoginModal from "./LoginModal";
import Balance from "./Balance";
import LogoutConfirmation from "./LogoutConfirmation";

const Navigation = () => {
  const [showModal, setShowModal] = useState(false);
  const [navShow, setNavShow] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const navRef = useRef(null);

  const closeModal = () => setShowModal(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    navigate("/");
    setShowLogoutConfirmation(false);
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
        {
          label: "Logout",
          icon: <LogOut size={16} />,
          action: handleLogoutClick,
        },
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

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && navShow) {
        setNavShow(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navShow]);

  const handleLogin = () => {
    setShowModal(true);
  };

  return (
    <header className="blur-bg w-full fixed top-0 left-0 z-50 h-20 flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-10 text-white w-full">
        <div className="flex items-center justify-between w-full relative">
          <div className="flex items-center gap-4 z-20">
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
            <Link
              to="/"
              className="bg-golden text-primary hover:bg-primary hover:text-white border border-golden px-4 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Get $QMGT
            </Link>
          </div>

          <div className="flex items-center gap-4 md:hidden z-20">
            {!auth.isAuthenticated && (
              <Link
                to="/signin"
                className="text-white hover:text-golden duration-300 text-sm font-medium"
              >
                Login
              </Link>
            )}
            {/* Show Hamburger Menu Only When Authenticated */}
            {auth.isAuthenticated && (
              <button
                className="text-white text-2xl cursor-pointer"
                onClick={() => setNavShow(!navShow)}
              >
                {navShow ? (
                  <IoClose size={36} />
                ) : (
                  <GiHamburgerMenu size={32} />
                )}
              </button>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav
            className={`
    hidden md:flex md:items-center md:justify-end
    bg-charcoalBlue md:bg-transparent
    z-50 md:z-auto
  `}
          >
            <ul className="flex items-center gap-6">
              {links.map((link, idx) => (
                <li key={idx}>
                  {link.to ? (
                    <Link
                      to={link.to}
                      onClick={() => setNavShow(false)}
                      className="text-white hover:text-golden duration-300 flex items-center gap-2"
                    >
                      {link.icon} {link.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        link.action?.();
                        setNavShow(false);
                      }}
                      className="text-white hover:text-golden duration-300 flex items-center gap-2"
                    >
                      {link.icon} {link.label}
                    </button>
                  )}
                </li>
              ))}
              {!auth.isAuthenticated && (
                <li className="hidden md:block">
                  <Link
                    to="/signin"
                    className="text-white hover:text-golden duration-300 text-sm font-medium"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          {/* Mobile Navigation */}
          <nav
            ref={navRef}
            className={`
              fixed top-0 right-0 w-64 h-auto
              transition-all duration-300 ease-in-out
              ${navShow ? "translate-x-0" : "translate-x-full"}
              flex flex-col items-start justify-start
              bg-primary z-50
              overflow-y-auto p-6
            `}
          >
            <ul className="flex flex-col items-start gap-6 w-full">
              {links.map((link, idx) => (
                <li key={idx} className="w-full">
                  {link.to ? (
                    <Link
                      to={link.to}
                      onClick={() => setNavShow(false)}
                      className="text-white hover:text-golden duration-300 flex items-center gap-2 w-full"
                    >
                      {link.icon} {link.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        link.action?.();
                        setNavShow(false);
                      }}
                      className="text-white hover:text-golden duration-300 flex items-center gap-2 w-full"
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

      {/* Close Button for Mobile Nav */}
      {navShow && (
        <button
          className="fixed top-4 right-4 text-white text-2xl z-50 md:hidden"
          onClick={() => setNavShow(false)}
        >
          <IoClose size={36} />
        </button>
      )}

      {/* Modals */}
      {showModal && <LoginModal closeModal={closeModal} />}
      <Balance isOpen={showBalance} onClose={() => setShowBalance(false)} />

      {/* Logout Confirmation */}
      <LogoutConfirmation
        isOpen={showLogoutConfirmation}
        onClose={() => setShowLogoutConfirmation(false)}
        onConfirm={handleLogoutConfirm}
      />
    </header>
  );
};

export default Navigation;
