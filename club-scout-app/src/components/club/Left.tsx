"use client";

import { useSession } from "next-auth/react";
import { Club } from "@prisma/client";
import Button from "../Button";
import { useRouter } from "next/navigation";

// Props for club one
interface ClubOneTemplateProps {
  name: String;
}

const Left: React.FC<ClubOneTemplateProps> = ({
  name,
}: ClubOneTemplateProps) => {
  return (
    <div className="p-4 bg-red-300">
      <section className=" flex flex-col mt-4 bg-white">
        <h1 className="text-3xl">{name}</h1>
        {/* Show the tags here */}
        <article className="bg-teal-50 p-1 mt-2">
          There once was a ship that sailed to sea the name of the ship was the
          Billy O Tea
        </article>
        <ul className="p-1 mt-20 flex flex-col gap-10">
          <li>About</li>
          <li>Photos</li>
          <li>Events</li>
        </ul>
      </section>
    </div>
  );
};

export default Left;
