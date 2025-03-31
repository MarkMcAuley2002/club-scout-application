"use client";
import { User } from "lucide-react";
const SignOutButton: React.FC = () => {
  return (
    <div className="px-4 w-fit h-fit hover:text-blue-500">
      <a href="/admin" className="rounded w-fit h-fit">
        <User className="w-5 h-5 hover:w-6 hover:h-6" />
      </a>
    </div>
  );
};

export default SignOutButton;
