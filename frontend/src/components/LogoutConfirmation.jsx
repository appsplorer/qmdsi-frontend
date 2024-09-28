import React from "react";

const LogoutConfirmation = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex justify-center items-center">
      <div className="bg-accent border-2 border-ash/30 p-6 rounded-lg shadow-lg w-full max-w-sm mx-4">
        <h2 className="text-xl font-semibold mb-4 text-white text-center">
          Confirm Logout
        </h2>
        <p className="text-gray-300 mb-6 text-center">
          Are you sure you want to logout?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition duration-300"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-golden text-white rounded-full hover:bg-primary transition duration-300"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
