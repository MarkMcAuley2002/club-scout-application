"use client";
import { House } from "lucide-react";
const HomeNavButton: React.FC = () => {
  return (
    <div className="w-fit h-fit hover:text-blue-500">
      <a href="/#" className="w-fit h-fit">
        <House className="w-8 h-8 hover:w-9 hover:h-9" />
      </a>
    </div>
  );
};

export default HomeNavButton;
