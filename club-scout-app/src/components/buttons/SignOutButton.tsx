"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface SignOutButtonProps {
  text?: string;
}
const SignOutButton: React.FC<SignOutButtonProps> = ({ text }) => {
  const [loading, setLoading] = useState(false);

  // Disable the button while waiting for the user to be logged out.
  const handleClick = async () => {
    setLoading(true);

    await signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/sign-in`,
    });
    // Enable the button again, not really necessary as the component will not be rendered after the user is logged out.
    setLoading(false);
  };

  return (
    <div className="px-4 w-fit h-fit hover:text-red-500">
      <a
        onClick={handleClick}
        className="rounded w-fit h-fit text-center text-xs flex flex-col items-center"
        aria-disabled={loading}
      >
        <LogOut className="w-5 h-5 hover:w-6 hover:h-6" />
        {text}
      </a>
    </div>
  );
};

export default SignOutButton;
