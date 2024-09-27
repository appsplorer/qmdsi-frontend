import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
} from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/ui/button";
import AddGroupForm from "../../components/forms/addGroup";
import JoinGroupForm from "../../components/forms/joinGroup";
import CustomModal from "../../components/ui/modal";
import CustomTable from "../../components/ui/table";

const GroupEnhanceSavings = () => {
  const navigate = useNavigate();
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const [openJoinGroup, setOpenJoinGroup] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const rawData = [
    {
      roomId: "1",
      start: "October 2, 2024",
      end: "December 3, 2024",
      total: "₱20,000",
      initial: "₱2,000",
      monthly: "₱3,000",
      members: 4,
      isRoom: false,
      roomName:'Group 0'
    },
    {
      roomId: "2",
      start: "October 2, 2024",
      end: "December 3, 2024",
      total: "₱20,000",
      initial: "₱2,000",
      monthly: "₱3,000",
      members: 3,
      isRoom: false,
      roomName:'Group 1'
    },
    {
      roomId: "3",
      start: "October 2, 2024",
      end: "December 3, 2024",
      total: "₱20,000",
      initial: "₱2,000",
      monthly: "₱3,000",
      members: 7,
      isRoom: false,
      roomName:'Group 2'
    },
    {
      roomId: "4",
      start: "October 2, 2024",
      end: "December 3, 2024",
      total: "₱20,000",
      initial: "₱2,000",
      monthly: "₱3,000",
      members: 5,
      isRoom: true,
      roomName:'Group 3'
    },
    {
      roomId: "5",
      start: "October 2, 2024",
      end: "December 3, 2024",
      total: "₱20,000",
      initial: "₱2,000",
      monthly: "₱3,000",
      members: 8,
      isRoom: false,
      roomName:'Group 4'
    },
    {
      roomId: "6",
      start: "October 2, 2024",
      end: "December 3, 2024",
      total: "₱20,000",
      initial: "₱2,000",
      monthly: "₱3,000",
      members: 6,
      isRoom: false,
      roomName:'Group 5'
    },
  ];

  const columns = [
    { title: "Room ID", dataIndex: "roomId", className: "header-center" },
    { title: "Group Name", dataIndex: "roomName", className: "header-center" },
    { title: "Start", dataIndex: "start", className: "header-right" },
    { title: "End", dataIndex: "end", className: "header-right" },
    { title: "Funds", dataIndex: "total", className: "header-right" },
    {
      title: "Initial Contribution",
      dataIndex: "initial",
      className: "header-right",
    },
    {
      title: "Monthly Contribution",
      dataIndex: "monthly",
      responsive: ["md", "lg", "xl"],
      className: "header-right",
    },
    {
      title: "No of members",
      dataIndex: "members",
      responsive: ["md", "lg", "xl"],
      className: "header-right",
    },
    {
      title: "Action",
      render: (v) => {
        return (
          <div>
            {v.isRoom ? (
              <button
                className="w-full hover:text-golden hover:underline transition-all duration-300 ease-in-out text-white px-4 py-2 rounded-md"
                onClick={handleView}
              >
                View
              </button>
            ) : (
              <button
                className="w-full animated-button hover:tracking-widest bg-charcoalBlue border-2 border-ash/20 transition-all duration-300 ease-in-out text-white px-4 py-2 rounded-full"
                onClick={() => handleJoinGroup(v)}
              >
                Join
              </button>
            )}
          </div>
        );
      },
      responsive: ["md", "lg", "xl"],
      width: "150px",
      className: "header-center",
    },
  ];

  const handleOpenCreateGroupModal = () => {
    setOpenCreateGroup(true);
  };

  const handleView = () => {
    navigate("/GesInfo");
  };

  const handleJoinGroup = (room) => {
    setSelectedRoom(room);
    setOpenJoinGroup(true);
  };

  const handleJoinSubmit = (values) => {
    console.log("User Details for Joining Group:", values);
    // Handle the logic to join the group with `selectedRoom` and user details

    // Close the modal after submission
    setOpenJoinGroup(false);
    // Optionally navigate or show a success message
  };

  return (
    <div className="w-full px-4">
      <div className="flex flex-col gap-4 mb-7">
        <h1 className="text-xl md:text-3xl text-white font-medium">
          PALUWAGAN (GROUP ENHANCE SAVINGS)
        </h1>
        <span className="text-xl md:text-2xl text-white font-semibold tracking-wide">
          Welcome
        </span>
      </div>
      <div className="w-full flex justify-end my-4">
          <CustomButton
            onClick={handleOpenCreateGroupModal}
            label="Create Group"
          />
      </div>
      <CustomTable rowKey="roomId" dataSource={rawData} columns={columns} />

      <CustomModal
        title={<p className="text-white font-normal text-4xl">Create Group</p>}
        open={openCreateGroup}
        onCancel={() => setOpenCreateGroup(false)}
        closable={false}
        footer={null}
        width={1000}
      >
        <AddGroupForm setOpenCreateGroup={setOpenCreateGroup} />
      </CustomModal>
      <CustomModal
        title={<p className="text-white">Join Group</p>}
        open={openJoinGroup}
        onCancel={() => setOpenJoinGroup(false)}
        closable={false}
        footer={null}
        width={1000}
      >
        <JoinGroupForm
          selectedRoom={selectedRoom}
          setOpenJoinGroup={setOpenJoinGroup}
        />
      </CustomModal>
    </div>
  );
};

export default GroupEnhanceSavings;
