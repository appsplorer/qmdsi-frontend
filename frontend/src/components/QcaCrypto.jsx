import { ArrowUpDown } from "lucide-react";
import React, { useState } from "react";
import ToUsdtModal from "./ToUsdtModal";
import ToCryptoModal from "./ToCryptoModal";
import Select from "react-select";
import { Input, Table } from "antd";
import TextInput from "./ui/input";

const QcaCrypto = () => {
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
      token: "Bitcoin",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
      symbol: "$BTC",
      price: "$53,000",
      amount: 0,
      expected: "$52,000",
    },
    {
      token: "Ethereum",
      icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      symbol: "$ETH",
      price: "$3,000",
      amount: 0,
      expected: "$2,800",
    },
  ];

  const columns = [
    {
      title: "Token",
      render: (v) => (
        <div className="flex items-center gap-4">
          <img className="w-[40px] h-[40px]" src={v.icon} alt={v.token} />
          <div>
            <h2>{v.token}</h2>
            <p>{v.symbol}</p>
          </div>
        </div>
      ),
    },
    { title: "Price", dataIndex: "price" },
    {
      title: "Amount",
      render: (v) => <TextInput type="number" value={v.amount} />,
    },
    { title: "Expected Value", dataIndex: "expected" },
    {
      title: "Action",
      render: (v) => (
        <button
          className="w-1/2 text-lg font-medium p-3 border bg-golden text-white rounded-lg"
          onClick={() => setConfirmModal(true)}
        >
          Convert
        </button>
      ),
      responsive: ["md", "lg", "xl"],
    },
  ];
  return (
    <div className="mt-4 w-full flex flex-col justify-center">
      <div className="w-full flex items-center gap-4">
        <div className="w-3/5">
          <div className="flex gap-4 items-end">
            <input
              type="text"
              value={100}
              className="w-full bg-transparent border-0 border-b outline-none text-3xl"
            />
          </div>
          <div className="mt-2 text-secondary text-xs">
            Convert upto: 8.5 $QMGT
          </div>
        </div>
        <div className="w-2/5">
          <Select
            options={options}
            components={{
              Option: CustomOption,
              SingleValue: CustomSingleValue,
            }}
            styles={customStyles}
            placeholder="Select an option"
          />
        </div>
      </div>

      <div className="w-full table-crypto mt-6">
        <Table
          className="custom-table"
          rowClassName="custom-row"
          dataSource={tableData}
          columns={columns}
          pagination={false}
        />
      </div>

      {confirmModal && (
        <ToCryptoModal
          closeModal={closeModal}
          confirmModal={resultModal}
          isOpen={confirmModal}
        />
      )}
    </div>
  );
};

export default QcaCrypto;
