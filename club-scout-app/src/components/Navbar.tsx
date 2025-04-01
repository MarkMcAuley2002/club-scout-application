import Link from "next/link";
import React from "react";
import SignOutButton from "./buttons/SignOutButton";
import SignInButton from "./buttons/SignInButton";
import SignUpButton from "./buttons/SignUpButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-blue-500 fixed w-full z-10 shadow-sm shadow-blue-300 h-20 items-center">
      <div className="container flex items-center justify-between h-full">
        <Link href="/" className="flex items-center ml-0 ">
          <img
            src="/Logo.svg"
            alt="Club Scout Logo"
            className="w-[100px] h-[100px]"
          />
        </Link>
        <div className="justify-between ">
          {session?.user ? (
            <SignOutButton text="Sign Out" />
          ) : (
            <div className="flex items-center justify-between h-full">
              <SignInButton />
              <SignUpButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
