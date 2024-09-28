import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "./Loading";
import { toast } from "react-toastify";

const TransferToken = () => {
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [tokenType, setTokenType] = useState("usdt");

  const handleSend = () => {
    if (!auth.isAuthenticated) {
      toast.error("Please log in to send tokens");
      return;
    }

    if (!recipientAddress || !amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid recipient address and amount");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      toast.success("Token sent successfully (simulation)");
      setLoading(false);
      setAmount("");
      setRecipientAddress("");
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-white">Token Type</label>
          <select
            value={tokenType}
            onChange={(e) => setTokenType(e.target.value)}
            className="w-full mt-1 p-2 bg-transparent border border-gray-700 rounded text-white"
          >
            <option value="usdt">USDT</option>
            <option value="btc">BTC</option>
            <option value="eth">ETH</option>
          </select>
        </div>

        <div>
          <label className="block text-white">Amount</label>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mt-1 p-2 bg-transparent border border-gray-700 rounded text-white"
          />
        </div>

        <div>
          <label className="block text-white">Recipient Address</label>
          <input
            type="text"
            placeholder="Enter recipient wallet address"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="w-full mt-1 p-2 bg-transparent border border-gray-700 rounded text-white"
          />
        </div>

        <button
          onClick={handleSend}
          disabled={loading}
          className="w-full h-[50px] text-lg bg-golden text-white rounded-lg mt-4 border-2 border-gray-700 cursor-pointer"
        >
          {loading ? <Loading /> : "Send"}
        </button>
      </div>
    </div>
  );
};

export default TransferToken;
