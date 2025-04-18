"use client";
import { useEffect, useRef } from "react";
import { MemberDetails } from "./ClubOne";
import MemberCard from "./MemberCard";

interface MembersSectionProps {
  canRemoveMembers: boolean;
  memberDetails: MemberDetails[];
  clubId: number;
  userId: number;
  viewedByOwner: boolean;
}

const MembersSection: React.FC<MembersSectionProps> = ({
  canRemoveMembers,
  memberDetails,
  clubId,
  userId,
  viewedByOwner,
}) => {
  // .toDateString()
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const handleScrollUp = () => {
    scrollContainerRef.current?.scrollBy({ top: -200, behavior: "smooth" });
  };

  const handleScrollDown = () => {
    scrollContainerRef.current?.scrollBy({ top: 200, behavior: "smooth" });
  };

  useEffect(() => {
    console.log("MMA member details", memberDetails);
  }, []);

  return (
    <div className="p-5 w-[400px] h-[500px] bg-blue-100 rounded-lg m-5 relative justify-start group/item bg-opacity-45">
      <h1 className="text-3xl text-center">Club Members</h1>
      <div className="relative mt-3 p-3 justify-self-center">
        <div
          ref={scrollContainerRef}
          className="h-[400px] overflow-y-hidden snap-y pr-8"
        >
          {memberDetails.map((member) => (
            <div key={member.user.id}>
              <MemberCard
                onClick={() => {}} //todo
                member={member}
                canRemoveMember={canRemoveMembers && userId !== member.user.id}
                clubId={clubId}
                viewedByOwner={viewedByOwner}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleScrollUp}
          className="absolute right-0 top-0 ml-2 mt-2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 invisible group-hover/item:visible"
        >
          &uarr;
        </button>
        <button
          onClick={handleScrollDown}
          className="absolute right-0 bottom-0 ml-2 mb-2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 invisible group-hover/item:visible"
        >
          &darr;
        </button>
      </div>
    </div>
  );
};

export default MembersSection;
