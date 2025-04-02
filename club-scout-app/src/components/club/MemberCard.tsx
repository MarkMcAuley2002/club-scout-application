"use client";

import RemoveMemberButton from "../buttons/RemoveMemberButton";
import ShowUserInfoModal from "../modal/ShowUserInfoModal";
import { MemberDetails } from "./ClubOne";
import React, { useState } from "react";

interface MemberCardProps {
  canRemoveMember: boolean;
  member: MemberDetails;
  clubId: number;
  viewedByOwner?: boolean;
  onClick: () => void;
}

const MemberCard: React.FC<MemberCardProps> = ({
  canRemoveMember,
  viewedByOwner = true,
  member,
  clubId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Functions to handle modal visibility
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleRemoveMember = async () => {
    try {
      const response = await fetch("/api/memberships/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: member.user.id,
          club_id: clubId,
        }),
      });

      if (!response.ok) {
        console.log("Error removing member from the club", response);
      } else {
      }
    } catch (error) {}
  };

  return (
    <div
      className="space-y-4 justify-self-center bg-opacity-50 w-[20rem] mb-3"
      key={member.user.id}
    >
      <div
        onClick={openModal}
        className="p-4 rounded bg-gray-100 overflow-hidden w-full h-[7rem] shadow-lg"
      >
        <div className="flex">
          <div className="w-full h-full overflow-hidden relative flex">
            <img
              src={member.user.profile!.profile_pic!}
              alt="Club Image"
              className="w-[5rem] h-[5rem] object-cover"
            />
            <div className=" flex flex-col justify-top ml-5">
              <h3 className="text-l font-semibold text-gray-900 dark:text-white">
                {member.user.username}
              </h3>
              <h3 className="text-l italic font-semibold text-gray-900 dark:text-white">
                {member.role}
              </h3>
            </div>
            {canRemoveMember && (
              <div className=" absolute top-0 right-0 m-2">
                <RemoveMemberButton onClick={handleRemoveMember} />
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed left-4 top-1/4 flex flex-col bg-green-500 rounded-lg p-1 shadow-md bg-opacity-60 ">
          <div className="flex flex-col gap-4 w-fit h-fit relative">
            <ShowUserInfoModal
              onClose={closeModal}
              member={member}
              viewdByOwner={viewedByOwner}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberCard;
