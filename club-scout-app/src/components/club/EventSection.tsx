"use client";
import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

interface EventSectionProps {
  events?: EventData[];
  canEdit?: boolean;
}

interface EventData {
  title: string;
  date: Date;
  details: string;
}

const EventSection: React.FC<EventSectionProps> = ({ events, canEdit }) => {
  const { data: session } = useSession();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollUp = () => {
    scrollContainerRef.current?.scrollBy({ top: -200, behavior: "smooth" });
  };

  const handleScrollDown = () => {
    scrollContainerRef.current?.scrollBy({ top: 200, behavior: "smooth" });
  };

  useEffect(() => {
    console.log("Club Events ", events);
  });

  const addEvent = async () => {
    try {
      if (!session?.user) {
        throw Error("Unauthorized User");
      }
      const title = "This is the title";
      const date = "2025-03-03";
      const details = "Some details";
      const club_id = 1;

      const response = await fetch("/api/create/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          date: date,
          details: details,
          club_id: club_id,
        }),
      });

      if (!response.ok) {
        console.log("Failed: ", response);
      }
    } catch (error) {
      console.log("Error making post: ", error);
    }
  };

  return (
    <div className="p-5 w-[400px] h-[500px] bg-blue-100 rounded-lg m-5 relative justify-start group/item bg-opacity-45">
      <h1 className="text-3xl text-center">Upcoming Events</h1>
      <div className="relative mt-3 p-3 justify-self-center">
        <div
          ref={scrollContainerRef}
          className="h-[400px] overflow-y-hidden snap-y pr-8"
        >
          {/* Mock event cards */}
          <div className="space-y-4 justify-self-center bg-opacity-50">
            {events?.map((info) => (
              <div className="bg-purple-200 p-4 rounded-lg justify-items-center text-center bg-opacity-50">
                <h2 className="font-bold">{info.title}</h2>
                <p>Date: {info.date.toDateString()}</p>
                <p>Details: {info.details}</p>
              </div>
            ))}
          </div>
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

export default EventSection;
