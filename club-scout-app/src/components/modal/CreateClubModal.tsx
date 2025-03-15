import React from "react";

interface ClubModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

const CreateClubModal: React.FC<ClubModalProps> = ({ onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Create a New Club</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Club Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Description
          </label>
          <textarea className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Create Club
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateClubModal;
