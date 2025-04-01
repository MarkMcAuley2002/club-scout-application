"use client";
import { Club } from "@prisma/client";
import ClubCard from "../ClubCard";
import { useRef } from "react";

interface ProfileClubSectionProps {
  clubs: Club[] | [];
  clubOwner: boolean;
}
const ProfileClubSection: React.FC<ProfileClubSectionProps> = ({
  clubs,
  clubOwner,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollUp = () => {
    scrollContainerRef.current?.scrollBy({ top: -200, behavior: "smooth" });
  };

  const handleScrollDown = () => {
    scrollContainerRef.current?.scrollBy({ top: 200, behavior: "smooth" });
  };

  return (
    <div className=" w-1/2 h-full  p-4 rounded-sm shadow-md flex flex-col bg-green-50">
      <h3 className="text-lg font-bold mb-2">
        {clubOwner ? "My Clubs" : "My Memberships"}
      </h3>
      <div className="relative h-full flex flex-col overflow-y-hidden group/item">
        {/* scroll start */}
        <div
          className="w-full h-full p-2 shadow-md bg-green-100 overflow-hidden"
          ref={scrollContainerRef}
        >
          {clubs.length > 0 ? (
            <div className="flex flex-col gap-2 mt-2 p-1 pr-4 h-full snap-y">
              {clubs!.map((club) => (
                <div key={club.id}>
                  <ClubCard
                    clubImage={club.clubImage}
                    name={club.name}
                    description={club.description}
                    tags={club.tags}
                    id={club.id}
                    type="basic"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-gray-700 text-center">
              {clubOwner
                ? "You don't own any clubs."
                : "You have not joined any clubs."}
            </p>
          )}
        </div>
        {/* scroll end */}
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

export default ProfileClubSection;
