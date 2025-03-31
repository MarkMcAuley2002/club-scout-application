"use client";

import { MemberDetails } from "./ClubOne";
import React from "react";

interface MemberCardProps {
  canRemoveMember: boolean;
  member: MemberDetails;
  clubId: number;
}

const MemberCard: React.FC<MemberCardProps> = ({
  canRemoveMember,
  member,
  clubId,
}) => {
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
      <div className="p-4 rounded bg-gray-100 overflow-hidden w-full h-[7rem] shadow-lg">
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
              <div
                className="text-center relative h-fit bg-red-500 rounded-sm p-1 ml-20"
                onClick={handleRemoveMember}
              >
                X
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
