"use client";
//https://lucide.dev/icons/categories#social
import { useSession } from "next-auth/react";
import SignOutButton from "./buttons/SignOutButton";
import CreateClubButton from "./buttons/CreateClubButton";
import ProfileNavButton from "./buttons/ProfileNavButton";
import EditClubButton from "./buttons/EditClubButton";
import { CurrentClubData } from "./club/ClubOne";
import EditProfileButton from "./buttons/EditProfileButton";
import { UserData } from "@/app/(dashboard)/profile/page";

// Renders different Menu depending on the page the user is on.
interface FloatingMenuProps {
  menuType: "home" | "club" | "profile";
  clubData?: CurrentClubData;
  userData?: UserData;
  canEditClub?: boolean;
  clubId?: number;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({
  menuType,
  clubData,
  userData,
  canEditClub = false,
  clubId,
}) => {
  const { data: session, status } = useSession();

  // Need to check if there is a session first.
  // So to do this we will useSession
  if (status === "loading") {
    return;
  }
  if (session?.user.id) {
    if (menuType === "home") {
      return (
        <div className="fixed left-4 top-1/4 flex flex-col bg-green-500 rounded-lg p-1 shadow-md bg-opacity-60 ">
          <div className="flex flex-col gap-4 w-fit h-fit relative">
            <ProfileNavButton />
            <CreateClubButton />
            <SignOutButton />
          </div>
        </div>
      );
    } else if (menuType === "club") {
      return (
        <div className="fixed left-4 top-1/4 flex flex-col bg-slate-300 rounded-lg p-1 shadow-md bg-opacity-45 ">
          <div className="flex flex-col gap-4 w-fit h-fit relative">
            <ProfileNavButton />
            {canEditClub && (
              <EditClubButton clubId={clubId!} clubData={clubData!} />
            )}
            <SignOutButton />
            {/* Add an option to upload an image if the user has permission to post */}
          </div>
        </div>
      );
    } else {
      return (
        <div className="fixed left-4 top-1/4 flex flex-col bg-slate-300 rounded-lg p-1 shadow-md bg-opacity-45 ">
          <div className="flex flex-col gap-4 w-fit h-fit relative">
            <EditProfileButton userData={userData!} />
            <SignOutButton />
          </div>
        </div>
      );
    }
  }
};

export default FloatingMenu;
