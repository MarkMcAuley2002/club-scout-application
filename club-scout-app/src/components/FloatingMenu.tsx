"use client";
//https://lucide.dev/icons/categories#social
import { useSession } from "next-auth/react";
import SignOutButton from "./buttons/SignOutButton";
import CreateClubButton from "./buttons/CreateClubButton";
import ProfileNavButton from "./buttons/ProfileNavButton";

const FloatingMenu: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className="fixed left-4 top-1/4 flex flex-col bg-slate-300 rounded-lg p-1 shadow-md bg-opacity-45 ">
      {session?.user && (
        <div className="flex flex-col gap-4 w-fit h-fit relative">
          <ProfileNavButton />
          <CreateClubButton />
          <SignOutButton />
        </div>
      )}
    </div>
  );
};

export default FloatingMenu;
