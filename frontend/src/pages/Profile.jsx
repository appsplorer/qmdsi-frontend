import { useState, useEffect, useContext } from "react";
import { getUser, getUserBalances } from "../services/users.service";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Button } from "antd";
import { getGoldPrice, getTokenBalance } from "../services/swap.service";
import { TOKENAddress } from "../addresses";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [kycStatus, setKycStatus] = useState();
  const [qmgtBalance, setQmgtBalance] = useState("");
  const [goldPrice, setGoldPrice] = useState("");
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    getGoldPrice().then((res) => {
      setGoldPrice(res);
    });
  }, []);

  useEffect(() => {
    const userId = profileData?.id;
    if (!userId) return;
    getUserBalances(userId).then((res) => {
      setQmgtBalance(res.qmgt);
    });
  }, [profileData?.id]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser(auth.accessToken);

        setProfileData({
          fullName: userData.full_name,
          phoneNumber: userData.phone_number,
          country: userData.country,
          email: userData.email,
          id: userData.id,
          kycStatus: userData.kyc_verified ? (
            <span style={{ color: "green", fontSize: "15px" }}>Verified</span>
          ) : (
            "Not Verified"
          ),
          referralLink: userData.ref_link,
          walletAddress: userData.wallet_address,
          referralSignUps: userData.referral_sign_ups,
        });

        setKycStatus(userData.kyc_verified);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (auth?.accessToken) {
      fetchUserData();
    }
  }, [auth?.accessToken]);

  const handleCopyReferralLink = () => {
    const refLink = `${window.location.protocol}//${window.location.host}/signup?ref=${profileData.referralLink}`;
    navigator.clipboard.writeText(refLink);
    toast.info("Referral link copied to clipboard!");
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(profileData.walletAddress);
    toast.info("Wallet Address copied to clipboard!");
  };

  if (!profileData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-primary text-4xl" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className=" pb-8 md:p-4 flex flex-col gap-12 md:flex-row flex-wrap md:px-32 mt-12 h-full"
    >
      <motion.div
        className="text-gray-300 flex-wrap font-bold w-full md:flex-1 flex flex-col px-4 md:px-8 gap-8"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="leading-10 flex flex-col gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal">
            Profile
          </h1>
          <p className="text-3xl md:text-5xl lg:text-6xl font-normal">
            Hi: {profileData.fullName}
          </p>
        </motion.div>

        <motion.div
          className="text-lg md:text-2xl font-normal"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p>KYC</p>
          <div className="flex flex-col gap-1">
            <p>
              <strong>Phone Number:</strong> {profileData.phoneNumber}
            </p>
            <p>
              <strong>Country:</strong> {profileData.country}
            </p>
            <p>
              <strong>Email:</strong> {profileData.email}
            </p>
            <p>
              <strong>KYC Status:</strong> {profileData.kycStatus}
            </p>

            {!kycStatus && (
              <Link
                to="/kyc"
                className="bg-primary mt-4 max-w-xs px-4 py-2 rounded text-white block"
                style={{ display: "inline-block" }}
              >
                Verify Identity
              </Link>
            )}
          </div>
        </motion.div>

        <motion.div
          className="text-lg md:text-2xl font-normal"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p>Referral</p>
          <ul className="space-y-2">
            {profileData.referralSignUps.map((signup, index) => (
              <li key={index} className="flex justify-between">
                <span>{signup.created_at}</span>
                <span>{signup.email}</span>
              </li>
            ))}
          </ul>
          <Button
            className="rounded-full mt-4"
            onClick={handleCopyReferralLink}
          >
            Copy
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex-1 justify-center flex items-center mt-8 md:mt-0 px-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="w-full max-w-[400px] md:max-w-[450px] lg:max-w-[70%] min-h-[400px] p-4 flex flex-col gap-2 border-2 border-silver/10 bg-ash text-gray-300 rounded-lg">
          <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4">Wallet</h2>

          <motion.div
            className="text-sm md:text-base lg:text-lg flex flex-col gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-silver/20 flex flex-col justify-between text-white p-4 w-full h-28 md:h-36 lg:h-40 rounded-lg">
              <p>Balance</p>
              <p>{qmgtBalance} QMGT</p>
              <div className="flex justify-end">
                <Button>Transactions</Button>
              </div>
            </div>

            <div className="bg-silver/20 flex flex-col justify-between text-white p-4 w-full h-28 md:h-36 lg:h-40 rounded-lg">
              <p>Address</p>
              <p className="break-words">{profileData.walletAddress}</p>
              <div className="flex justify-end">
                <Button onClick={handleCopyAddress}>Copy</Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-between items-center my-6 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p>Gold Price</p>
            <p>1.002g per {goldPrice} USDT</p>
          </motion.div>

          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button className="bg-[#a1a0a0] text-white p-4 py-6 w-full">
              Connecting
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
