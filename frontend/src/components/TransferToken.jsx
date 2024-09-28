import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { TOKENAddress, USDTAddress } from "../addresses";
import { getTokenBalance, getTokenBalanceFormated, getTokenDecimals } from "../services/swap.service";
import { formatUnits, isAddress } from "ethers";
import { transferToken } from "../services/users.service";
import TransferCompleteModal from "./TransferCompleteModal";


const tokens = {
  usdt: USDTAddress,

};


const TransferToken = () => {
  const { auth, profile } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [balance, setBalance] = useState("0.00")
  const [tokenType, setTokenType] = useState("usdt");
  const [showCompletModal, setShowCompleteModal] = useState(true)
  const [transferData, setTransferData] = useState({})

    

  useEffect(() => {
    if(!profile?.walletAddress) {
      setBalance("0.00")
      return 
    }
    const tokenAddress = tokens[tokenType];

    getTokenBalanceFormated(tokenAddress, profile.walletAddress).then((balance) => {
      setBalance(balance)
    } )

   

    const interValId = setInterval(async () => {
       getTokenBalanceFormated(tokenAddress, profile.walletAddress).then((balance) => {
        setBalance(balance)
    } )
    }, 3000);

    return () => clearInterval(interValId);
  }, [tokenType, profile?.walletAddress]);

  
  
  const handleSend = async () => {
    if (!auth.isAuthenticated) {
      toast.error("Please log in to send tokens");
      return;
    }

    if(!isAddress(recipientAddress)) {
      toast.error("Please enter a valid recipient address")
      return 
    }
    if(!amount || parseFloat(amount) <= 0) {
      toast.warn("Please enter a valid amount")
      return 
    }
    if(parseFloat(amount) > parseFloat(balance)) {
      toast.warn("Insufficient Balance")
      return 
    }

    setLoading(true);

    const tokenAddress = tokens[tokenType];
    try{
      const res = await transferToken(auth.accessToken, tokenAddress, amount, recipientAddress)
    
      console.log(res.hash)
    toast.success("Token sent successfully");
    setTransferData({
      amount : amount,
      to : recipientAddress,
      token : tokenType,
      hash : res.hash
    })
    setAmount("");
    setRecipientAddress("");
    setShowCompleteModal(true)  
  }catch(e){
    
    toast.warn(e.response.data.detail)
    }finally{
      setLoading(false)
    }
    
    
    

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
            {/* <option value="btc">BTC</option>
            <option value="eth">ETH</option> */}
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
          <div className="mt-2 text-white text-xs flex gap-2">
              <p>
                Balance: {balance}
              </p>
              <button className="border-none text-white font-semibold" onClick={(() => setAmount(balance))}>
                Max
              </button>
              </div>
          
          
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
      {showCompletModal && <TransferCompleteModal closeModal={() => setShowCompleteModal(false)} data={transferData} />}
    </div>
  );
};

export default TransferToken;
