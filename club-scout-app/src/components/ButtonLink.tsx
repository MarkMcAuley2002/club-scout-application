import Link from "next/link";
import React from "react";

interface ButtonProps {
  className?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  text: string;
}

const ButtonLinkComponent: React.ForwardRefRenderFunction<
  HTMLAnchorElement,
  ButtonProps
> = ({ onClick, href, text, className }, ref) => {
  return (
    <a
      className={
        className
          ? className
          : "bg-black rounded-xl p-1 border-solid border-2 border-bg-zinc-200 w-20 text-center text-white hover:bg-blue-300"
      }
      href={href}
      onClick={onClick}
      ref={ref}
    >
      {text}
    </a>
  );
};

const ButtonLink = React.forwardRef(ButtonLinkComponent);

export default ButtonLink;
