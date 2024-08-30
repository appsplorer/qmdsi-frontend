import { Ellipsis, X } from "lucide-react";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import Logo from "../assets/au-logo.png";
import { AuthContext } from "../contexts/AuthContext";

const shortenAddress = (address) => {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

const Navigation = () => {
  const [showModal, setShowModal] = useState(false);
  const [navShow, setNavShow] = useState(false);
  const { open } = useWeb3Modal();
  const { address } = useWeb3ModalAccount();
  const {auth} = useContext(AuthContext)
  const navigate = useNavigate()
  
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="px-4 md:px-24 py-4 text-white flex justify-between items-center">
        <div className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
          <a href="">
            <img src={Logo} className="h-[50px]" />
          </a>
          <div
            className={`nav-links duration-500 md:static bg-background absolute md:min-h-fit min-h-[60vh] left-0 w-full flex flex-col items-center px-5 z-1000 md:z-0 ${
              navShow ? "top-0" : "top-[-100%]"
            }`}
          >
            <div className="absolute right-10 top-10 md:hidden justify-end">
              <button onClick={() => setNavShow(false)}>
                <X />
              </button>
            </div>
            <ul className="nav flex flex-col md:flex-row md:gap-4 gap-6 mt-10 md:mt-0 w-full text-center">
              <li>
                <NavLink
                  to="/"
                  className="block py-2 md:py-0 hover:bg-gray-800 rounded md:bg-transparent"
                  onClick={() => setNavShow(false)}
                >
                  Swap
                </NavLink>
              </li>
            
          
            </ul>
          </div>
        </div>
        <div className="nav-right text-sm flex gap-2">
          {
            auth.isAuthenticated ?
            <button
            className="bg-accent py-2 px-5 rounded hover:bg-black h-[35px] text-primary"
            onClick={() => navigate("/profile")}
          >
             Profile
            </button>
            :
            <button
            className="bg-accent py-2 px-5 rounded hover:bg-black h-[35px] text-primary"
            onClick={() => navigate("/signin")}
          >
             Login
            </button>
          }
          
          <button
            className="bg-accent py-1 px-3 rounded hover:bg-black h-[35px]"
            onClick={() => {
              setNavShow(!navShow);
            }}
          >
            <Ellipsis />
          </button>
        </div>
      </div>

      {showModal && <LoginModal closeModal={closeModal} />}
    </div>
  );
};

export default Navigation;
