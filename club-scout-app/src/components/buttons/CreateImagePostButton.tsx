"use client";
import { ImagePlus } from "lucide-react";
import { useState } from "react";
import PostImageToClubModal from "../modal/PostImageToClubModal";

interface CreateImagePostButtonProps {
  club_id: number;
}

const CreateImagePostButton: React.FC<CreateImagePostButtonProps> = ({
  club_id,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Functions to handle modal visibility
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="px-4 w-fit h-fit hover:text-blue-500">
      <a onClick={openModal} className="rounded w-fit h-fit">
        <ImagePlus className="w-5 h-5 hover:w-6 hover:h-6" />
      </a>
      {isModalOpen && (
        <PostImageToClubModal onClose={closeModal} club_id={club_id} />
      )}
    </div>
  );
};

export default CreateImagePostButton;
