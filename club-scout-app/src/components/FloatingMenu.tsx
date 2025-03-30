"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import CreateClubModal from "./modal/CreateClubModal";

const FloatingMenu: React.FC = () => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Functions to handle modal visibility
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="fixed left-4 top-1/4 flex flex-col gap-4 z-50 bg-slate-300 rounded-lg p-1 shadow-md bg-opacity-45">
      {session?.user && (
        <div className="flex flex-col gap-4">
          <a
            href="/admin"
            className="bg-gray-400 text-white px-4 py-2 rounded shadow-md hover:bg-gray-600 transition"
          >
            Profile
          </a>
          <a
            onClick={openModal}
            className="bg-gray-400 text-white px-4 py-2 rounded shadow-md hover:bg-green-600 transition"
          >
            Create a Club
          </a>
        </div>
      )}

      <a
        href="/admin"
        className="bg-gray-400 text-white px-4 py-2 rounded shadow-md hover:bg-gray-600 transition"
      >
        Profile
      </a>
      <a
        href="/admin"
        className="bg-gray-400 text-white px-4 py-2 rounded shadow-md hover:bg-gray-600 transition"
      >
        Profile
      </a>
      {isModalOpen && <CreateClubModal onClose={closeModal}></CreateClubModal>}
    </div>
  );
};

export default FloatingMenu;
