import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getUserRefs } from "../services/users.service";
import { ArrowRight } from "lucide-react";
import Loading from "../components/Loading";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const MyInvites = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useContext(AuthContext);

  useEffect(() => {
    fetchInvites();
  }, []);

  const fetchInvites = async () => {
    try {
      const userRefs = await getUserRefs();
      setInvites(userRefs);
    } catch (error) {
      console.error("Error fetching invites:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    const refLink = `${window.location.protocol}//${window.location.host}/signup?ref=${profile.referralLink}`;
    navigator.clipboard.writeText(refLink);
    toast.info("Referral link copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (invites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6 px-4">
        <div className="bg-primary/20 rounded-full p-6">
          <ArrowRight className="text-primary w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-white">No Invites Yet!</h2>
        <p className="text-gray-400 max-w-md">
          You haven’t referred anyone yet. Invite your friends and get rewards
          when they sign up!
        </p>
        <div className="flex flex-col items-center space-y-4 w-full max-w-md">
          {/* Display the referral link */}
          <div className="bg-silver/10 p-4 rounded-lg text-white w-full">
            <p className="text-sm text-gray-300">Your Referral Link:</p>
            <p className="text-lg font-semibold text-white break-all">
              {`${window.location.protocol}//${window.location.host}/signup?ref=${profile.referralLink}`}
            </p>
            <button
              onClick={copyToClipboard}
              className="mt-2 px-4 py-2 bg-golden text-white rounded-full hover:bg-primary transition duration-300 w-full"
            >
              Copy Link
            </button>
          </div>
          <button className="px-6 py-2 bg-golden text-white rounded-full hover:bg-primary transition duration-300">
            Invite Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">Your Invites</h1>
      <div className="space-y-4 w-full">
        {invites.map((invite) => (
          <motion.div
            key={invite.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-silver/10 rounded-lg p-4 text-white flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-primary/20 rounded-full p-3">
                <ArrowRight className="text-primary w-6 h-6" />
              </div>
              <div>
                <p className="text-lg font-semibold">{invite.email}</p>
                <p className="text-sm text-gray-400">
                  {new Date(invite.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyInvites;
