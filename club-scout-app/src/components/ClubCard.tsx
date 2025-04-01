"use client";
import React, { useEffect, useState } from "react";
import Button from "./buttons/Button";
import { useSession } from "next-auth/react";
import { Membership } from "@prisma/client";
import { useRouter } from "next/navigation";

export interface ClubCardProps {
  id: number;
  clubImage: string;
  name: string;
  description: string;
  tags: string[];
  memberships?: Membership[];
  type?: "full" | "basic";
}

const ClubCard: React.FC<ClubCardProps> = ({
  id,
  clubImage,
  name,
  description,
  tags,
  memberships,
  type = "full",
}: ClubCardProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [joined, setJoined] = useState(false);

  const handleJoinClub = async () => {
    // Add the current user as a member to the club using their id
    if (joined) {
      router.push(`/club/${id}`);
    } else {
      if (session && session.user) {
        const response = await fetch("/api/memberships/join", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            club_id: id,
            user_id: parseInt(session.user.id),
            role: "member",
          }),
        });

        if (response.ok) {
          setJoined(true);
          router.push(`/club/${id}`);
        } else {
          console.log("Error joining club", response);
        }
      } else {
        router.push("/sign-in");
      }
    }
  };

  useEffect(() => {
    console.log("MMA club name: ", name);
    if (session && session.user) {
      // Check if the user is already a member of the club
      const userMembership = memberships?.find(
        (member) => member.user_id.toString() === session.user.id
      );
      if (userMembership) {
        setJoined(true);
      }
    }
  }, []);

  // This is the club card for the profile, smaller and only includes the name and image,
  // the rest is not necessary as the user has already decided to join the club.
  if (type === "basic") {
    return (
      <div
        className="p-2 rounded bg-gray-100 shadow-md flex items-center cursor-pointer hover:bg-gray-200 transition"
        onClick={() => router.push(`/club/${id}`)}
      >
        {/* Rounded to match the profile picture */}
        <div className="w-[3rem] h-[3rem] rounded-full overflow-hidden">
          <img
            src={clubImage}
            alt="Club Image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Club Name is positioned on the right of the image */}
        <h3 className="ml-3 text-lg font-semibold text-gray-900">{name}</h3>
      </div>
    );
  }

  return (
    <div className="p-4 rounded bg-gray-100 w-full h-fit shadow-lg">
      <div className="flex">
        {/* Left: Profile Image */}
        <div className="w-[10rem] h-[10rem] ">
          <img
            src={clubImage}
            alt="Club Image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Club Info */}
        <div className="w-2/3 p-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 my-2 max-h-[100px] overflow-x-hidden">
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
        <Button accent={joined ? "navigate" : "join"} onClick={handleJoinClub}>
          {session?.user ? (joined ? "View" : "Join") : "Sign in"}
        </Button>
      </div>
    </div>
  );
};

export default ClubCard;
