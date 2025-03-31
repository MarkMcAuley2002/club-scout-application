"use client";
import { UserPlus } from "lucide-react";
const SignInButton: React.FC = () => {
  return (
    <div className="px-4 w-fit h-fit hover:text-blue-500">
      <a
        href="/sign-up"
        className="rounded w-fit h-fit  text-center text-xs flex flex-col items-center"
      >
        <UserPlus className="w-5 h-5 hover:w-6 hover:h-6" />
        Sign Up
      </a>
    </div>
  );
};

export default SignInButton;
