"use client";
import { Pencil } from "lucide-react";
import { useState } from "react";
import EditProfileModal from "../modal/EditProfileModal";
import { UserData } from "@/app/(dashboard)/profile/page";

interface EditProfileProps {
  userData: UserData;
}

const EditProfileButton: React.FC<EditProfileProps> = ({ userData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Functions to handle modal visibility
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="px-4 w-fit h-fit hover:text-blue-500">
      <a onClick={openModal} className="rounded w-fit h-fit">
        <Pencil className="w-5 h-5 hover:w-6 hover:h-6" />
      </a>
      {isModalOpen && (
        <EditProfileModal onClose={closeModal} userData={userData} />
      )}
    </div>
  );
};

export default EditProfileButton;
