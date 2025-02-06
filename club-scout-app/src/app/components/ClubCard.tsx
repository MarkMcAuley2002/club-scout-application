'use client'
import React from "react";

interface ClubCardProps {
  imageUrl: string; // Replace with an actual image URL
  clubName: string;
  description: string;
  tags: string[];
};

// const ClubCardProps = {
//   imageUrl: "/path-to-image.jpg", // Replace with an actual image URL
//   clubName: "Adventure Club",
//   description: "Join us for exciting outdoor adventures and hiking challenges.",
//   tags: ["Outdoors", "Hiking", "Adventure"],
// };

const ClubCard: React.FC<ClubCardProps> = ({imageUrl,clubName, description, tags}: ClubCardProps) => {
return (
  <div className="max-w-sm rounded-lg shadow-lg bg-white dark:bg-gray-800 overflow-hidden">
    <div className="flex">
      {/* Left: Profile Image */}
      <div className="w-1/3">
        <img
          src={imageUrl}
          alt="Club Image"
          className="w-full h-full object-cover rounded-l-lg"
        />
      </div>

      {/* Right: Club Info */}
      <div className="w-2/3 p-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {clubName}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 my-2">
          {description}
        </p>

        {/* Club Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full dark:bg-blue-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* Join Button */}
    <div className="p-4 text-right">
      <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
        Join
      </button>
    </div>
  </div>
);
}


export default ClubCard;