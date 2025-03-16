"use client";

import { useActionState, useEffect, useState } from "react";
import ClubCard, { ClubCardProps } from "../ClubCard";
import Button from "../Button";
import { useSession } from "next-auth/react";
import { createClub } from "@/app/actions/auth";
import CreateClubModal from "../modal/CreateClubModal";

const ClubCardHolder: React.FC = () => {
  const [clubs, setClubs] = useState<ClubCardProps[]>([]);
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("Fetching clubs...");
    const fetchClubs = async () => {
      try {
        const response = await fetch("/api/clubs"); // This is where we fetch clubs from your API
        console.log(response);
        if (!response.ok) {
          throw new Error("Error Retrieving Clubs");
        }
        const data = await response.json();
        console.log("Clubs data:", data);
        setClubs(data); // Set the clubs data here
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs(); // Call fetchClubs as soon as the page loads
  }, []);

  // Functions to handle modal visibility
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-white p-4 rounded shadow dark:bg-gray-600 h-fit">
      <h2 className="font-bold mb-2 bg-sl">Join a Club</h2>
      <div className="flex-1 overflow-y-auto md:h-[300px] lg:h-[500px] bg-green-50 mb-2">
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-3 grow h-full p-2 pr-4 mb-1">
          {clubs.map((club) => (
            <div key={club.key}>
              <ClubCard
                imageUrl={club.imageUrl}
                clubName={club.clubName}
                description={club.description}
                tags={club.tags}
                key={club.key}
              />
            </div>
          ))}
        </div>
      </div>
      {session?.user && (
        <div className="font-bold mb-2 mt-2 flex justify-end mr-7">
          <Button onClick={openModal} accent="create">
            Create a club
          </Button>
        </div>
      )}
      {isModalOpen && (
        <CreateClubModal
          onClose={closeModal}
        ></CreateClubModal>
      )}
    </div>
  );
};

export default ClubCardHolder;
