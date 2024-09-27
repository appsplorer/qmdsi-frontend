import React from "react";
import { Select, Table } from "antd";
import NokarinLogo from "../../public/nokarinLogo.jpg";

function formatCurrency(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

const Rwb = () => {
  const data = [
    {
      logo: NokarinLogo,
      company: "NOKARIN",
      stakeLimit: 1000000,
      apr: 12,
      isCollateral: true,
      vesting: 3,
      status: "Open",
      remaining: 800000,
      distributed: 800000,
    },
    {
      logo: NokarinLogo,
      company: "GO8",
      stakeLimit: 1000000,
      apr: 15,
      isCollateral: true,
      vesting: 5,
      status: "On-going",
      remaining: 0,
      distributed: 700000,
    },
    {
      logo: NokarinLogo,
      company: "AUTO TRADE",
      stakeLimit: 1000000,
      apr: 28,
      isCollateral: true,
      vesting: 5,
      status: "Closed",
      remaining: 1280000,
      distributed: 1280000,
    },
  ];

  const columns = [
    {
      title: "COMPANY",
      render: (v) => (
        <div className="flex gap-4 items-center">
          <img className="w-16 h-auto" src={v.logo} alt="" />
          <div className="flex flex-col">
            <p className="font-bold text-sm md:text-base">{v.company}</p>
            <button className="text-sky-600 underline text-xs md:text-sm">
              VIEW DETAILS
            </button>
          </div>
        </div>
      ),
    },
    {
      title: "Stake Limit",
      dataIndex: "stakeLimit",
      render: (v) => formatCurrency(v),
    },
    { title: "APR", dataIndex: "apr", render: (v) => `${v}%` },
    {
      title: "With Collateral?",
      dataIndex: "isCollateral",
      render: (v) => <p className="w-full text-center">{v ? "Y" : "N"}</p>,
      width: "150px",
    },
    { title: "Vesting", dataIndex: "vesting", render: (v) => `${v}yrs` },
    { title: "Status", dataIndex: "status" },
    {
      title: "Remaining",
      dataIndex: "remaining",
      render: (v) => formatCurrency(v),
    },
    {
      title: "Distributed",
      dataIndex: "distributed",
      render: (v) => formatCurrency(v),
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center my-4">
        <p className="text-white font-bold text-xl mb-2 md:mb-0">
          Convert up to: 8.5 $QMGT
        </p>
        <div>
          <Select defaultValue="USDT" className="w-full md:w-32">
            <Select.Option value="USDT">USDT</Select.Option>
            <Select.Option value="QMGT">QMGT</Select.Option>
          </Select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table
          scroll={{ x: "max-content" }}
          className="custom-table"
          pagination={false}
          columns={columns}
          dataSource={data}
        />
      </div>
      <div className="w-full flex justify-end mt-8">
        <button className="p-4 bg-golden rounded-md text-white w-full sm:w-auto sm:max-w-xs md:w-44 tracking-widest">
          CONVERT
        </button>
      </div>

      <div className="font-bold w-full md:flex-1 flex flex-col gap-8 text-white text-lg mt-12">
        <h2 className="font-bold text text-3xl">
          Welcome to QMGT Convert to Real World Business (QCR)
        </h2>
        <div>
          <h4 className="font-bold text-xl">Invest in Proven Success</h4>
          <p className="font-normal">
            Welcome to QMGT Convert to Real World Business (QCR), where your
            Quantum Metal Gold Tokens (QMGT) can be converted into RWB Tokens of
            established and audited businesses with a strong track record.
            Discover a new avenue for investment, leveraging the stability and
            potential of real-world enterprises.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-xl">Why Choose QCR?</h4>
          <ul className="font-normal list-disc list-inside pl-4">
            <li>
              Invest in Success: Convert your QMGT into RWB Tokens of businesses
              with a proven history of success, each with over 3 years of solid
              performance.
            </li>
            <li>
              Thoroughly Audited: Every business in the QCR program has been
              meticulously audited to ensure they meet strict criteria and can
              uphold their commitments.
            </li>
            <li>
              Secure and Reliable: Trust in the security of your investment with
              businesses that have demonstrated resilience and growth.
            </li>
            <li>
              Stable Liquidity: Each RWB Token is equivalent to 1 USDT, ensuring
              that the liquidity is not volatile.
            </li>
            <li>
              Liquidity Addition: Businesses will add liquidity based on the
              agreed terms to ensure the reward tokens remain liquid.
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-xl">How It Works:</h4>
          <ul className="font-normal list-decimal list-inside pl-4">
            <li>
              Select a Business: Choose from a selection of established
              businesses that have been carefully vetted for their track record
              and reliability.
            </li>
            <li>
              Convert Your QMGT: Convert your QMGT into RWB Tokens of the
              selected businesses.
            </li>
            <li>
              Locked and Released: Your RWB Tokens will be locked and released
              based on the terms indicated by each business.
            </li>
            <li>
              Earn RWB Tokens: Each conversion earns you RWB Tokens, providing a
              clear and tangible representation of your investment.
            </li>
            <li>
              Benefit from Stability: Enjoy the potential returns from stable
              and proven business ventures, mitigating the risks associated with
              more volatile investments.
            </li>
            <li>
              Track Your Investment: Use our platform to monitor the performance
              and progress of your converted investments.
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-xl">
            Why Convert to Real World Businesses?
          </h4>
          <ul className="font-normal list-disc list-inside pl-4">
            <li>
              Proven Track Record: Each business has been operating successfully
              for over 3 years, providing a solid foundation for your
              investment.
            </li>
            <li>
              Careful Auditing: Rigorous auditing ensures these businesses can
              meet their commitments, offering you peace of mind.
            </li>
            <li>
              Real Business Ventures: Invest in tangible, real-world enterprises
              that are making a difference in their industries.
            </li>
            <li>
              Stable and Liquid Rewards: Each RWB Token is backed by 1 USDT,
              ensuring stability and liquidity, with monthly additions from the
              businesses
            </li>
          </ul>
        </div>
        <p className="italic text-golden text-center">
          Join the QCR program today and become a part of the real deal in the
          business world. Stake your QMGT in ventures with a track record of
          success and watch your investment grow in a stable and secure
          environment.
        </p>
      </div>
    </div>
  );
};

export default Rwb;
