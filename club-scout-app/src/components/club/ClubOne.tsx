"use client";

import { useSession } from "next-auth/react";
import { Club, PostPermission, Profile, User } from "@prisma/client";
import ImageSection from "./ImageSection";
import EventSection from "./EventSection";
import MembersSection from "./MembersSection";
import { useEffect, useState } from "react";
import FloatingMenu from "../FloatingMenu";

export interface CurrentClubData {
  about: string;
  description: string;
  tags: string[];
  id: number;
}

interface ClubProps extends Club {
  events: ClubEventData[];
  memberships: MemberDetails[];
}

interface ClubEventData {
  title: string;
  date: Date;
  details: string;
}

export interface MemberDetails {
  user: {
    id: number;
    username: string;
    profile?: { profile_pic: string | null } | null;
  };
  role: string;
  postPermission: PostPermission;
}

interface ClubOneTemplateProps {
  club: ClubProps;
}

const ClubOneTemplate: React.FC<ClubOneTemplateProps> = ({
  club,
}: ClubOneTemplateProps) => {
  const [isOwner, setOwner] = useState(false); // Extra functionality will be available if the owner is the current user
  const [hasEditPermission, setEditPermission] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<PostPermission>(
    PostPermission.BASE
  );
  const { data: session, status } = useSession();

  useEffect(() => {
    if (club.createdBy.toString() === session?.user.id) {
      setOwner(true);
      setEditPermission(true);
    }
    if (club.memberships) {
      const userMembership = club.memberships.find(
        (member) => member.user.id.toString() === session?.user.id
      );
      if (userMembership) {
        setPermissionStatus(userMembership.postPermission);
      }
    }
    // Set the permission status, this will be used to determine
    // If a user can create a post
  }, [session, club]);

  if (status === "loading") {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="w-full mt-4 bg-[url('https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742985051878-mountains.JPG')] bg-fixed bg-cover overflow-x-hidden  bg-center">
      <div className="flex justify-center backdrop-blur w-fit-content min-h-screen flex-col overflow-y-auto bg-scroll">
        <section className=" flex flex-col items-center justify-center min-h-screen px-4 text-white">
          <h1 className="text-4xl font-bold">About Us</h1>
          {/* Todo, make this an editable component */}
          <p className="mt-4 max-w-[600px] text-center text-balance">
            {club.about}
          </p>
        </section>
        <div className="flex justify-between">
          <EventSection
            events={club.events}
            canEdit={isOwner || hasEditPermission}
          />
          <MembersSection
            canRemoveMembers={isOwner}
            memberDetails={club.memberships}
            clubId={club.id}
            // session! means we will get the session and removes the <type> | undefined.
            // The session will not exist if the user is not logged in, in which case they will not be able to see the club page.
            userId={parseInt(session!.user.id)}
          />
        </div>
        <ImageSection clubId={club.id} permissionStatus={permissionStatus} />
      </div>
      <FloatingMenu
        menuType="club"
        canEditClub={isOwner || permissionStatus === PostPermission.FULL}
        clubData={{
          id: club.id,
          about: club.description,
          description: club.description,
          tags: club.tags,
        }}
      />
    </div>
  );
};

export default ClubOneTemplate;
