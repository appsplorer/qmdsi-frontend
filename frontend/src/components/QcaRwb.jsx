import { ArrowUpDown } from "lucide-react";
import React, { useState } from "react";
import ToUsdtModal from "./ToUsdtModal";
import ToCryptoModal from "./ToCryptoModal";
import Select from "react-select";
import ToRwbModal from "./ToRwbModal";
import { Table } from "antd";

function formatCurrency(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

const QcaRwb = () => {
  const CustomOption = (props) => {
    const { innerRef, innerProps, data } = props;
    return (
      <div ref={innerRef} {...innerProps} className="custom-option">
        <img
          src={data.image}
          alt=""
          style={{ width: "20px", marginRight: "10px" }}
        />
        {data.label}
      </div>
    );
  };

  // Custom single value component
  const CustomSingleValue = (props) => {
    const { data } = props;
    return (
      <div className="custom-single-value">
        <img
          src={data.image}
          alt=""
          style={{ width: "20px", marginRight: "10px" }}
        />
        {data.label}
      </div>
    );
  };

  const options = [
    {
      value: "USDT",
      label: "USDT",
      image:
        "https://w7.pngwing.com/pngs/113/18/png-transparent-tether-hd-logo-thumbnail.png",
    },
    { value: "QMGT", label: "QMGT", image: "https://via.placeholder.com/20" },
    {
      value: "ETHEREUM",
      label: "ETHEREUM",
      image: "https://via.placeholder.com/20",
    },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#1E1E20",
      borderColor: "#1E1E20",
      minHeight: "50px",
      height: "50px",
      outline: "none",
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "40px",
      display: "flex",
      alignItems: "center",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "50px",
      borderColor: "#1E1E20",
    }),
    indicatorSeparator: (provided) => ({
      display: "none", // Removes the left border line
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1E1E20", // Background color of the menu
      borderRadius: "5px",
      marginTop: "0px",
      padding: "5px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "blue"
        : state.isFocused
        ? "lightblue"
        : "white", // Background color on hover and selection
      color: state.isSelected ? "white" : "black", // Text color
      padding: "10px",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    }),
  };

  const [confirmModal, setConfirmModal] = useState(true);

  const closeModal = () => {
    setConfirmModal(false);
  };
  const resultModal = () => {
    setConfirmModal(false);
  };

  const tableData = [
    {
      company: "Nigrakon",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
      stake: "$1000",
      apr: "12%",
      collateral: "Y",
      vesting: "3 Yrs",
      status: "Open",
      remaining: "$8000",
      distributed: "$8000",
      link: "#",
    },
  ];
  const data = [
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
      company: "Nigrakon",
      stakeLimit: 1000000,
      apr: 12,
      isCollateral: true,
      vesting: 3,
      status: "Open",
      remaining: 800000,
      distributed: 800000,
    },
    // {logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png", company: 'GO8', stakeLimit: 1000000, apr: 15, isCollateral: true, vesting: 5, status: 'On-going', remaining: 0, distributed: 700000},
    // {logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png", company: 'AUTO TRADE', stakeLimit: 1000000, apr: 28, isCollateral: true, vesting: 5, status: 'Closed', remaining: 1280000, distributed: 1280000},
  ];

  const columns = [
    {
      title: "COMPANY",
      render: (v) => (
        <div className="flex gap-4 items-center">
          <img className="w-10 md:w-16 h-auto" src={v.logo} alt="" />
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
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Vesting",
      dataIndex: "vesting",
      render: (v) => `${v}yrs`,
      responsive: ["md", "lg", "xl"],
    },
    { title: "Status", dataIndex: "status", responsive: ["md", "lg", "xl"] },
    {
      title: "Remaining",
      dataIndex: "remaining",
      render: (v) => formatCurrency(v),
      responsive: ["md", "lg", "xl"],
    },
    {
      title: "Distributed",
      dataIndex: "distributed",
      render: (v) => formatCurrency(v),
      responsive: ["md", "lg", "xl"],
    },
  ];

  return (
    <div>
      <div className="overflow-x-auto">
        <Table
          className="custom-table"
          rowClassName="custom-row"
          pagination={false}
          columns={columns}
          dataSource={data}
        />
      </div>
      {confirmModal && (
        <ToRwbModal
          closeModal={closeModal}
          confirmModal={resultModal}
          isOpen={confirmModal}
        />
      )}
    </div>
  );
};

export default QcaRwb;
