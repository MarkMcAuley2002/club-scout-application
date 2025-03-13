import Link from "next/link";
import React from "react";
import ButtonLink from "./ButtonLink";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  href?: string;
  text: string;
  className?: string;
}

const NavBarButton: React.ForwardRefRenderFunction<
  HTMLAnchorElement,
  ButtonProps
> = ({ onClick, href, text, className }, ref) => {
  return (
    <a className={className} href={href} onClick={onClick} ref={ref}>
      {text}
    </a>
  );
};


const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-zinc-100 py-2 fixed w-full z-10 border-b border-zinc-200">
      <div className="container flex items-center justify-between">
        <Link href={"/"} passHref legacyBehavior>
          <ButtonLink text="Home"></ButtonLink>
        </Link>
        {session?.user ? (
          <Link href="/sign-in" passHref legacyBehavior>
            <ButtonLink text="Sign out"></ButtonLink>
          </Link>
        ) : (
          <Link href="/sign-in" passHref legacyBehavior>
            <ButtonLink text="Sign In"></ButtonLink>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
