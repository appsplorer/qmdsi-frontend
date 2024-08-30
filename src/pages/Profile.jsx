import { useState, useEffect, useContext } from "react";
import { getUser } from "../services/users.service";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser(auth.accessToken);
        console.log(userData.referral_sign_ups)
        setProfileData({
          fullName: userData.full_name,
          phoneNumber: userData.phone_number,
          country: userData.country,
          email: userData.email,
          kycStatus: userData.kyc_verified ? "Verified" : "Not Verified",
          referralLink: userData.ref_link,
          walletAddress : userData.wallet_address,
          referralSignUps: userData.referral_sign_ups,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (auth?.accessToken) {
      fetchUserData();
    }
  }, [auth?.accessToken]);

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(profileData.referralLink);
    toast.info("Referral link copied to clipboard!");
  };

  if (!profileData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-primary text-4xl" />{" "}
        {/* Spinner */}
      </div>
    );
  }

  return (
    <div className="px-4 md:px-24 pt-4 h-full">
      <div className="border border-primary border-b-0 p-3 min-h-[100vh] flex justify-center">
        <div className="w-full max-w-[1200px] bg-accent rounded-md p-4 md:p-8 text-white">
          <h1 className="text-xl md:text-2xl mb-4 md:mb-6 text-center">
            View Profile
          </h1>
          <div className="space-y-4 md:space-y-6 px-4 md:px-24">
            <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0">
              <div>
                <p>
                  <strong>Full Name:</strong> {profileData.fullName}
                </p>
              </div>
              <div>
                <p>
                  <strong>Phone Number:</strong> {profileData.phoneNumber}
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0">
              <div>
                <p>
                  <strong>Country:</strong> {profileData.country}
                </p>
              </div>
              <div>
                <p>
                  <strong>Email:</strong> {profileData.email}
                </p>
              </div>
            </div>
            <div>
                <p>
                  <strong>Wallet Address:</strong> {profileData.walletAddress}
                </p>
              </div>
            <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:text-left text-left">
              <p>
                <strong>KYC Status:</strong> {profileData.kycStatus}
              </p>
              <Link
                to="/kyc"
                className="bg-primary mt-2 md:mt-0 px-4 py-2 rounded text-dark text-center"
              >
                Verify Identity
              </Link>
            </div>
            <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:text-left text-left">
              <p>
                <strong>Referral Link:</strong> {profileData.referralLink}
              </p>
              <button
                className="bg-primary mt-2 md:mt-0 px-4 py-2 rounded text-dark text-center"
                onClick={handleCopyReferralLink}
              >
                Copy Link
              </button>
            </div>
          </div>

          <div className="mt-6 md:mt-8 px-4 md:px-24">
            <h2 className="text-lg md:text-xl mb-4">Referral Sign-Ups</h2>
            <ul className="space-y-2">
              {profileData.referralSignUps.map((signup, index) => (
                <li key={index} className="flex justify-between">
                  <span>{signup.created_at}</span>
                  <span>{signup.email}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="hollow-text z-100 touch-none">PROFILE</div>
    </div>
  );
};

export default Profile;
