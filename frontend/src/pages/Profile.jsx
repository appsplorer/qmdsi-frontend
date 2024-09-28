import { useState, useEffect, useContext } from "react";
import { getUserBalances } from "../services/users.service";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Button } from "antd";
import Loading from "../components/Loading";
import CustomButton from "../components/ui/button";
import { getGoldPrice } from "../services/swap.service";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [qmgtBalance, setQmgtBalance] = useState("");
  const [goldPrice, setGoldPrice] = useState("");
  const { profile } = useContext(AuthContext);
  const navigate = useNavigate();

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
        <Loading />
      </div>
    );
  }

  const handleNavigateToInvites = () => {
    navigate("/invites");
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
              <p>
                <strong>KYC Status:</strong>{" "}
                {profileData.kycStatus === "Not Verified" ? (
                  <CustomButton
                    label="Verified now"
                    onClick={() => navigate("/kyc")}
                  />
                ) : (
                  profileData.kycStatus
                )}
              </p>
            </div>
          </motion.div>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-xl md:text-2xl mb-4">Referral Link</h2>
            <p className="text-sm md:text-base mb-2">
              {`${window.location.protocol}//${window.location.host}/signup?ref=${profileData.referralLink}`}
            </p>
            <ul className="space-y-2 text-sm md:text-base">
              {profileData.referralSignUps.map((signup, index) => (
                <li key={index} className="flex justify-between">
                  <span>{signup.created_at}</span>
                  <span>{signup.email}</span>
                </li>
              ))}
            </ul>
            <div className="flex space-x-2 mt-4">
              <Button
                className="rounded-full text-sm md:text-base"
                onClick={handleCopyReferralLink}
              >
                Copy
              </Button>
              <Button
                className="rounded-full text-sm md:text-base bg-primary text-white"
                onClick={handleNavigateToInvites}
              >
                My Invites
              </Button>
            </div>
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
              <div className="bg-silver/20 flex flex-col justify-between text-white p-4 h-32 md:h-40 rounded-lg">
                <p className="text-sm md:text-base">Balance</p>
                <p className="text-lg md:text-xl">{qmgtBalance} QMGT</p>
                <div className="flex justify-between">
                  <Button className="text-sm md:text-base">
                    <Link to="/deposits">Deposits</Link>
                  </Button>
                  <Button className="text-sm md:text-base">Transactions</Button>
                </div>
              </div>

              <div className="bg-silver/20 flex flex-col justify-between text-white p-4 h-32 md:h-40 rounded-lg">
                <p className="text-sm md:text-base">Address</p>
                <p className="break-all text-xs md:text-sm">
                  {profileData.walletAddress}
                </p>
                <div className="flex justify-end">
                  <Button
                    onClick={handleCopyAddress}
                    className="text-sm md:text-base"
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex justify-between items-center my-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-sm md:text-base">Gold Price</p>
              <p className="text-sm md:text-base">
                1.002g per {goldPrice} USDT
              </p>
            </motion.div>

            <motion.div
              className="flex justify-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Link to="/send-token" className="w-full">
                <Button className="bg-[#a1a0a0] text-white p-4 w-full text-sm md:text-base">
                  Send Token
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;
