"use client";
import { UserRoundMinus } from "lucide-react";

interface RemoveMemberButtonProps {
  onClick: () => void;
}

const RemoveMemberButton: React.FC<RemoveMemberButtonProps> = ({ onClick }) => {
  return (
    <div className="w-fit h-fit hover:text-red-500">
      <a onClick={onClick} className="w-fit h-fit">
        <UserRoundMinus className="w-3 h-3 hover:w-5 hover:h-6" />
      </a>
    </div>
  );
};

export default RemoveMemberButton;
