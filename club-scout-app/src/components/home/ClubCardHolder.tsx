"use client";

import { useEffect, useState } from "react";
import ClubCard, { ClubCardProps } from "../ClubCard";

const ClubCardHolder: React.FC = () => {
  const [clubs, setClubs] = useState<ClubCardProps[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching clubs...");
    const fetchClubs = async () => {
      try {
        const response = await fetch("/api/clubs");
        console.log(response);
        if (!response.ok) {
          throw new Error("Error Retrieving Clubs");
        }
        const data = await response.json();
        console.log("Clubs data:", data.clubs);
        setClubs(data.clubs); // Set the clubs data here
        setLoading(false); // Set loading to false once the data is fetched
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs(); // Call fetchClubs as soon as the page renders
  }, []); // [] tells it to run when the page renders, [anydata] will watch for changes in anydata

  return (
    <div className="bg-white p-4 rounded shadow dark:bg-gray-600 h-fit">
      <h2 className="font-bold mb-2 bg-sl">Find a Club for You!</h2>
      <div className="flex-1 overflow-y-auto md:h-[300px] lg:h-[500px] bg-green-50 mb-2">
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-3 grow h-full p-2 pr-4 mb-1">
          {loading ? (
            <div className="flex justify-center items-center col-span-3">
              <h1 className="text-3xl ">Loading...</h1>
            </div>
          ) : (
            clubs?.map((club) => (
              <div key={club.id}>
                <ClubCard
                  clubImage={club.clubImage}
                  name={club.name}
                  description={club.description}
                  tags={club.tags}
                  id={club.id}
                  memberships={club.memberships}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubCardHolder;
