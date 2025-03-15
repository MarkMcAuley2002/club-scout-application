'use client'
import ClubCard, { ClubCardProps } from "../components/ClubCard";
import Button from "@/components/Button";
import { useEffect, useState } from "react";

export default function Home() {
  const [clubs, setClubs] = useState<ClubCardProps[]>([]);

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

  // Move all of this code.
  let showModal = false;

  const handleCreateClubClick = () =>{
    showModal = true;
  }

  const handleCloseModal = () => {
    showModal = false; // Simulate closing modal
  };

   const handleSubmitModal = () => {
     // Placeholder for submit logic
     console.log("Club submitted");
     showModal = false; // Simulate closing modal after submission
   };

  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen pt-[60px]">
      {/* Sidebar (Navigation) */}
      <aside className="bg-gray-100 p-4 rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <ul>
          <li>
            <a href="#">Option 1</a>
          </li>
          <li>
            <a href="#">Option 2</a>
          </li>
          <li>
            <a href="#">Option 3</a>
          </li>
        </ul>
      </aside>
      <main>
        <section className="flex flex-col gap-4 w-full p-4 dark:bg-gray-800 bg-gray-50 rounded">
          {/* Top Row: Flex container for checkboxes and search bar */}
          <div className="flex gap-4 w-full ">
            {/* Left: Checkboxes Container */}
            <div className="w-1/3 bg-white p-4 rounded shadow dark:bg-gray-600">
              <h2 className="font-bold mb-2">Filters</h2>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>Option 1</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>Option 2</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>Option 3</span>
                </label>
              </div>
            </div>

            {/* Right: Search Bar Container */}
            <div className="flex-1 bg-white p-4 rounded shadow dark:bg-gray-600">
              <h2 className="font-bold mb-2">Search for Clubs</h2>
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Bottom Row: Club Cards Container */}
          <div className="bg-white p-4 rounded shadow dark:bg-gray-600">
            <h2 className="font-bold mb-2">Join a Club</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {clubs.map((club) => (
                <ClubCard
                  imageUrl={club.imageUrl}
                  clubName={club.clubName}
                  description={club.description}
                  tags={club.tags}
                  key={club.key}
                />
              ))}
            </div>
            <div className="font-bold mb-2 flex justify-end">
              <Button accent="create" >
                Create a club
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
