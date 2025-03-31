"use client";
import { Pencil } from "lucide-react";
import { useState } from "react";
import EditClubModal from "../modal/EditClubModal";
import { CurrentClubData } from "../club/ClubOne";

interface EditClubProps {
  clubId: number;
  clubData: CurrentClubData;
}

const EditClubButton: React.FC<EditClubProps> = ({ clubId, clubData }) => {
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
        <EditClubModal
          onClose={closeModal}
          clubId={clubId}
          clubData={clubData}
        />
      )}
    </div>
  );
};

export default EditClubButton;
