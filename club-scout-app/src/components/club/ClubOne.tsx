"use client";

import { useSession } from "next-auth/react";
import { Club, Event as ClubEvent, Membership, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import ImageSection from "./ImageSection";
import EventSection from "./EventSection";
import MembersSection from "./MembersSection";

// Props for club one
interface ClubProps extends Club {
  events: ClubEventData[];
  memberships: MemberDetails[];
}

interface ClubEventData {
  title: string;
  date: Date;
  details: string;
}

interface MemberDetails extends Membership {
  user: Pick<User, "id" | "username">;
}

interface ClubOneTemplateProps {
  club: ClubProps;
}

const ClubOneTemplate: React.FC<ClubOneTemplateProps> = ({
  club,
}: ClubOneTemplateProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLeaveClub = async () => {
    if (session?.user) {
      const response = await fetch("/api/memberships/leave", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          club_id: club.id,
        }),
      });

      if (response.ok) {
        router.push(`/`);
      } else {
        console.log("Error leaving club", response);
      }
    }
  };

  return (
    <div className="w-full mt-4 bg-[url('https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742985051878-mountains.JPG')] bg-fixed bg-cover overflow-x-hidden  bg-center">
      <div className="flex justify-center backdrop-blur w-fit-content min-h-screen flex-col overflow-y-auto bg-scroll">
        <section className=" flex flex-col items-center justify-center min-h-screen px-4 text-white">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-4 max-w-[600px] text-center">
            Within this article goes a large amount of text. I would like it to
            take up a certain amount of screen space before it goes to the next
            line.
            {club.events[0].details}
          </p>
        </section>
        <ImageSection />
        <div className="flex justify-between">
          <EventSection events={club.events} />
          <MembersSection />
        </div>
      </div>
    </div>
  );
};

export default ClubOneTemplate;
