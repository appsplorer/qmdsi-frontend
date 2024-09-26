import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getDeposit, processDeposit } from "../services/deposit.service";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Loading from "../components/Loading";

const Deposit = () => {
  const { id } = useParams();
  const [deposit, setDeposit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchDeposit();
  }, [id]);

  const fetchDeposit = async () => {
    try {
      const depositData = await getDeposit(id);
      setDeposit(depositData);
    } catch (error) {
      console.error("Error fetching deposit:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReProcess = async () => {
    setProcessing(true);
    try {
      await processDeposit(id);
      await fetchDeposit();
    } catch (error) {
      console.error("Error processing deposit:", error);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!deposit) {
    return <div className="text-center text-white mt-8">Deposit not found</div>;
  }

  return (
    <div className="mt-4 px-4 max-w-2xl mx-auto">
      <Link
        to="/deposits"
        className="text-primary flex items-center mb-6 hover:underline"
      >
        <ArrowLeft className="mr-2" />
        Back to Deposits
      </Link>
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-opacity-50 backdrop-filter backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-white mb-2">
            Deposit Details
          </h1>
          <p className="text-gray-300 text-sm">{deposit.id}</p>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Amount</span>
            <span className="text-2xl font-semibold text-white">
              {deposit.amount} PHP
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">USD Amount</span>
            <span className="text-xl text-white">${deposit.usd_amount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Status</span>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                deposit.processed
                  ? "bg-green-500 text-green-100"
                  : "bg-yellow-500 text-yellow-100"
              }`}
            >
              {deposit.state}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Created At</span>
            <span className="text-white">
              {new Date(deposit.created_at).toLocaleString()}
            </span>
          </div>
          {deposit.url && (
            <a
              href={deposit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300"
            >
              View Payment Link
            </a>
          )}
          {deposit.state === "In process" && (
            <button
              onClick={handleReProcess}
              disabled={processing}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 flex items-center justify-center"
            >
              {processing ? (
                <Loading size={24} />
              ) : (
                <>
                  <RefreshCw className="mr-2" size={18} />
                  Re Process
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Deposit;
