import {
  Descriptions,
  Segmented,
  Table,
  Modal,
  notification,
  Input,
  Radio,
} from "antd";
import React, { useState, useEffect } from "react";
import CustomTable from "../../components/ui/table";
import { useParams } from "react-router-dom";
import { maskName } from "../../utils/maskName";
import TextInput from "../../components/ui/input";

let rawData = [
  { id: 1, name: "Juan Diego", month: "20,000", isTurn: true, isOwner: true },
  { id: 2, name: "Marie Chan", month: "17,000", isTurn: false, isOwner: false },
  { id: 3, name: "John Doe", month: "17,000", isTurn: false, isOwner: false },
  { id: 4, name: "Mike Tan", month: "17,000", isTurn: false, isOwner: false },
  { id: 5, name: "Jun David", month: "17,000", isTurn: false, isOwner: false },
];

const GroupSavingInfo = () => {
  const { type } = useParams();
  const [list, setList] = useState(rawData);
  const [releaseModalVisible, setReleaseModalVisible] = useState(false);
  const [depositModalVisible, setDepositModalVisible] = useState(false); // State for deposit modal
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(""); // State for Segmented value
  const [paymentMethod, setPaymentMethod] = useState("fiat"); // State for payment method
  const [depositAmount, setDepositAmount] = useState(""); // State for deposit amount

  // Dynamically select the default month based on the member with `isTurn: true`
  const defaultMonthValue = () => {
    const activeMember = list?.find((v) => v.isTurn);
    const activeIndex = list.indexOf(activeMember);
    const monthOptions = [
      "1st Month",
      "2nd Month",
      "3rd Month",
      "4th Month",
      "5th Month",
    ];
    return monthOptions[activeIndex] || "1st Month"; // Fallback to 1st Month
  };

  // Set the default month when the component mounts or the list changes
  useEffect(() => {
    setCurrentMonth(defaultMonthValue());
  }, [list]);

  const columns = [
    { title: "No.", dataIndex: "id", width: "100px" },
    {
      title: "Member Name",
      dataIndex: "name",
      render: (v) => `${maskName(v)}`,
    },
    {
      title: "Monthly",
      render: (v) => (!v.isOwner ? `₱${v.month} + ₱3,000` : `₱${v.month}`),
      responsive: ["md", "lg", "xl"],
    },
    { title: "Other Field 1", dataIndex: "name" },
    { title: "Other Field 2", dataIndex: "name" },
    { title: "Other Field 3", dataIndex: "name" },
    {
      title: "Actions",
      render: (v) => {
        // Check if the current month is the first or second month
        const isFirstMonth = currentMonth === "1st Month";
        const buttonLabel = isFirstMonth ? "Deposit" : "Release";

        return (
          <div className="flex gap-2">
            <button
              className="animated-button text-center hover:tracking-widest w-full bg-charcoalBlue border-2 border-ash/20 transition-all duration-300 ease-in-out text-white px-4 py-2 rounded-full"
              onClick={() =>
                isFirstMonth ? showDepositModal(v) : showReleaseModal(v)
              } // Open deposit modal if it's the first month
            >
              {buttonLabel} {/* Set button label dynamically */}
            </button>
          </div>
        );
      },
      width: "150px",
      responsive: ["md", "lg", "xl"],
    },
  ];

  // Show release modal
  const showReleaseModal = (member) => {
    setSelectedMember(member);
    setReleaseModalVisible(true);
  };

  // Show deposit modal
  const showDepositModal = (member) => {
    setSelectedMember(member);
    setDepositModalVisible(true);
  };

  // Handle deposit submission
  const handleDeposit = () => {
    if (!depositAmount) {
      notification.error({
        message: "Deposit Failed",
        description: "Please enter an amount.",
      });
      return;
    }

    notification.success({
      message: "Deposit Successful",
      description: `${depositAmount} has been successfully deposited via ${paymentMethod}.`,
    });

    setDepositModalVisible(false); // Close modal after deposit
  };

  const handleRelease = () => {
    setReleaseModalVisible(false);
    notification.success({
      message: "Funds Released",
      description: `${selectedMember.name} has successfully received the funds.`,
    });

    setList((prevList) => {
      const currentIndex = prevList.findIndex((member) => member.isTurn);
      const nextIndex = (currentIndex + 1) % prevList.length;

      const updatedList = prevList.map((member, idx) => ({
        ...member,
        isTurn: idx === nextIndex,
      }));

      const monthOptions = [
        "1st Month",
        "2nd Month",
        "3rd Month",
        "4th Month",
        "5th Month",
      ];
      setCurrentMonth(monthOptions[nextIndex]);

      return updatedList;
    });
  };

  return (
    <div className="w-full text-white px-4 pb-12">
      <div className="flex flex-col gap-4 mb-7">
        <h1 className="text-xl md:text-3xl text-white font-medium">
          PALUWAGAN (GROUP ENHANCE SAVINGS)
        </h1>
        <span className="text-xl md:text-2xl text-white font-semibold tracking-wide">
          Welcome
        </span>
      </div>
      <div className="flex flex-nowrap flex-col md:flex-row gap-12 bg-charcoalBlue/20 rounded-lg border-2 border-ash/20 p-4 md:px-8">
        <div className="mb-4 space-y-2 flex-1">
          <p className="font-extralight text-silver">
            <strong className="font-medium text-white">Group Name:</strong>{" "}
            Group 1
          </p>
          <p className="font-extralight text-silver">
            <strong className="font-medium text-white">Description: </strong>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="flex-1 flex gap-2 flex-col items-end">
          <p className="font-extralight text-silver">
            <strong className="font-medium text-white">Total Funds:</strong>{" "}
            ₱20,000
          </p>
          <p className="font-extralight text-silver">
            <strong className="font-medium text-white">
              Initial Contributions:{" "}
            </strong>{" "}
            ₱2,000
          </p>
          <p className="font-extralight text-silver">
            <strong className="font-medium text-white">
              Monthly Contributions:{" "}
            </strong>{" "}
            ₱3,000
          </p>
          <p className="font-extralight text-silver">
            <strong className="font-medium text-white">
              Total Number of Members:{" "}
            </strong>{" "}
            5
          </p>
          <p className="font-extralight text-silver">
            <strong className="font-medium text-white">Started Date: </strong>{" "}
            October 2, 2024
          </p>
          <p className=" font-extralight text-silver">
            <strong className="font-medium text-white">Ended Date: </strong>{" "}
            October 12, 2024
          </p>
        </div>
      </div>
      <div className="w-full h-16 flex justify-end items-center gap-4 text-white">
        <div>
          <Segmented
            value={currentMonth} // Controlled by state
            options={[
              "1st Month",
              "2nd Month",
              "3rd Month",
              "4th Month",
              "5th Month",
            ]}
            onChange={(value) => setCurrentMonth(value)} // Allow manual change
          />
        </div>
      </div>
      <CustomTable columns={columns} dataSource={list} />

      {/* Deposit Modal */}
      <Modal
        title={<p className="text-white text-xl">Deposit Funds</p>}
        open={depositModalVisible}
        onCancel={() => setDepositModalVisible(false)}
        onOk={handleDeposit}
        okText="Deposit"
        cancelText="Cancel"
        className="custom-modal"
      >
        <div className="mb-4">
          <TextInput
            placeholder="Enter deposit amount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />
        </div>
        <div>
          <Radio.Group
            onChange={(e) => setPaymentMethod(e.target.value)}
            value={paymentMethod}
          >
            <Radio value="fiat">Fiat</Radio>
            <Radio value="usdt">USDT</Radio>
          </Radio.Group>
        </div>
      </Modal>

      {/* Release Modal */}
      <Modal
        title={<p className="text-white text-xl">Release Funds</p>}
        open={releaseModalVisible}
        onCancel={() => setReleaseModalVisible(false)}
        onOk={handleRelease}
        okText="Release"
        cancelText="Cancel"
        className="custom-modal"
      >
        <Descriptions
          bordered
          column={1}
          className="w-full"
          contentStyle={{
            background: "#1E293B",
            fontSize: "15px",
            fontWeight: "300",
            color: "#F8FAFC",
          }}
          labelStyle={{
            background: "#1E293B",
            fontSize: "15px",
            fontWeight: "bold",
            color: "#F8FAFC",
          }}
        >
          <Descriptions.Item label="Receiver">
            {maskName(selectedMember?.name)}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
};

export default GroupSavingInfo;
