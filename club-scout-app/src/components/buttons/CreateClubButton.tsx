"use client";
import { HousePlus, LogOut } from "lucide-react";
import { useState } from "react";
import CreateClubModal from "../modal/CreateClubModal";

const CreateClubButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Functions to handle modal visibility
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="px-4 w-fit h-fit hover:text-blue-500">
      <a onClick={openModal} className="rounded w-fit h-fit">
        <HousePlus className="w-5 h-5 hover:w-6 hover:h-6" />
      </a>
      {isModalOpen && <CreateClubModal onClose={closeModal}></CreateClubModal>}
    </div>
  );
};

export default CreateClubButton;
