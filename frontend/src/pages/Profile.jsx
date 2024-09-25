import { useState, useEffect, useContext } from "react";
import { getUserBalances } from "../services/users.service";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Button } from "antd";
import { getGoldPrice } from "../services/swap.service";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [kycStatus, setKycStatus] = useState();
  const [qmgtBalance, setQmgtBalance] = useState("");
  const [goldPrice, setGoldPrice] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const { profile } = useContext(AuthContext);

  useEffect(() => {
    getGoldPrice().then((res) => {
      setGoldPrice(res);
    });
  }, []);

  useEffect(() => {
    const userId = profile?.id;
    if (!userId) return;
    getUserBalances(userId).then((res) => {
      setQmgtBalance(res.qmgt);
    });
  }, [profile?.id]);

  useEffect(() => {
    if (profile) {
      setProfileData({
        fullName: profile.fullName,
        phoneNumber: profile.phoneNumber,
        country: profile.country,
        email: profile.email,
        id: profile.id,
        kycStatus: profile.kycStatus,
        referralLink: profile.referralLink,
        walletAddress: profile.walletAddress,
        referralSignUps: profile.referralSignUps,
      });

      setKycStatus(profile.kycStatus === "Verified");
    }
  }, [profile]);

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

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      alert("Connected successfully!");
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="container mx-auto px-4 py-8 mt-20 md:mt-24"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div
          className="text-gray-300 w-full lg:w-1/2"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-4">
              Profile
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl font-normal">
              Hi: {profileData.fullName}
            </p>
          </motion.div>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl md:text-2xl mb-4">KYC</h2>
            <div className="space-y-2 text-sm md:text-base">
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
            </div>
            {!kycStatus && (
              <Link
                to="/kyc"
                className="bg-primary mt-4 inline-block px-4 py-2 rounded text-white text-sm md:text-base"
              >
                Verify Identity
              </Link>
            )}
          </motion.div>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-xl md:text-2xl mb-4">Referral</h2>
            <ul className="space-y-2 text-sm md:text-base">
              {profileData.referralSignUps.map((signup, index) => (
                <li key={index} className="flex justify-between">
                  <span>{signup.created_at}</span>
                  <span>{signup.email}</span>
                </li>
              ))}
            </ul>
            <Button
              className="rounded-full mt-4 text-sm md:text-base"
              onClick={handleCopyReferralLink}
            >
              Copy
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div className="w-full p-4 border-2 border-silver/10 bg-ash text-gray-300 rounded-lg">
            <h2 className="text-2xl md:text-3xl mb-6">Wallet</h2>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="bg-silver/20 flex flex-col justify-between text-white/60 px-6 py-3 rounded-md">
                <h3 className="text-lg">Wallet Address</h3>
                <p className="text-white text-lg mb-4">
                  {profileData.walletAddress}
                </p>
                <Button
                  className="rounded-full mt-4 text-sm md:text-base"
                  onClick={handleCopyAddress}
                >
                  Copy
                </Button>
              </div>
              <div className="bg-silver/20 flex flex-col justify-between text-white/60 px-6 py-3 rounded-md">
                <h3 className="text-lg">Gold Balance</h3>
                <p className="text-white text-lg">{qmgtBalance}</p>
              </div>
              <div className="bg-silver/20 flex flex-col justify-between text-white/60 px-6 py-3 rounded-md">
                <h3 className="text-lg">Gold Price</h3>
                <p className="text-white text-lg">${goldPrice}</p>
              </div>
            </motion.div>

            <motion.div
              className="flex justify-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Button className="bg-[#a1a0a0] text-white p-4 w-full text-sm md:text-base">
                Connecting
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;
