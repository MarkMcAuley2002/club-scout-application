"use client";
import Link from "next/link";
import React, { ChangeEvent, useRef, useState } from "react";
import ButtonLink from "./ButtonLink";
import SignOutButton from "./SignOutButton";
import { useSession } from "next-auth/react";

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  href?: string;
  text: string;
  className?: string;
}

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-zinc-100 py-2 fixed w-full z-10 border-b border-zinc-200">
      <div className="container flex items-center justify-between">
       
        <Link href={"/"} passHref legacyBehavior>
          <ButtonLink text="Home"></ButtonLink>
        </Link>
        {session?.user ? (
          <SignOutButton />
        ) : (
          <div className="flex flex-row">
            <Link href="/sign-up" passHref legacyBehavior>
              <ButtonLink text="Sign up"></ButtonLink>
            </Link>

            <Link href="/sign-in" passHref legacyBehavior>
              <ButtonLink text="Sign In"></ButtonLink>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
