import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserDeposits } from "../services/deposit.service";
import { ArrowRight } from "lucide-react";
import Loading from "../components/Loading";

const Deposits = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeposits();
  }, []);

  const fetchDeposits = async () => {
    try {
      const userDeposits = await getUserDeposits();
      setDeposits(userDeposits);
    } catch (error) {
      console.error("Error fetching deposits:", error);
    } finally {
      setLoading(false);
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
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Fiat Transactions</h1>
      <div className="space-y-4">
        {deposits.map((deposit) => (
          <Link
            key={deposit.id}
            to={`/deposits/${deposit.id}`}
            className="block transition-transform hover:scale-105"
          >
            <div className="bg-silver/10 rounded-lg p-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/20 rounded-full p-3">
                  <ArrowRight className="text-primary w-6 h-6" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{deposit.amount} PHP</p>
                  <p className="text-sm text-gray-400">
                    {new Date(deposit.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    deposit.processed ? "bg-green-500" : "bg-yellow-500"
                  }`}
                >
                  {deposit.state}
                </span>
                <ArrowRight className="text-primary w-5 h-5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Deposits;
