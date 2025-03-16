"use client";
import React from "react";
import Button from "./Button";

export interface ClubCardProps {
  imageUrl: string; // Replace with an actual image URL
  clubName: string;
  description: string;
  tags: string[];
  key: number;
}

const ClubCard: React.FC<ClubCardProps> = ({
  imageUrl,
  clubName,
  description,
  tags,
}: ClubCardProps) => {
  return (
    <div className="p-4 rounded bg-gray-100 overflow-hidden w-full h-fit shadow-lg">
      <div className="flex">
        {/* Left: Profile Image */}
        <div className="w-1/3">
          <img src={imageUrl} alt="Club Image" className="w-full h-full" />
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
                className="bg-orange-600 text-white text-xs px-3 py-1 rounded-full dark:bg-blue-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Join Button */}
      <div className="p-4 text-right">
        <Button accent="join">Join</Button>
      </div>
    </div>
  );
};

export default ClubCard;
