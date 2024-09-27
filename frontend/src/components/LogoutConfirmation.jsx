const LogoutConfirmation = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Confirm Logout
        </h2>
        <p className="text-gray-300 mb-6">Are you sure you want to logout?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition duration-300"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
