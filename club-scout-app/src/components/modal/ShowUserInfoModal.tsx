import React from "react";
import { X } from "lucide-react";
import { MemberDetails } from "../club/ClubOne";
import { PostPermission } from "@prisma/client";

interface ShowUserInfoModalProps {
  onClose: () => void;
  member: MemberDetails;
  viewdByOwner: boolean;
}

const ShowUserInfoModal: React.FC<ShowUserInfoModalProps> = ({
  onClose,
  member,
  viewdByOwner,
}) => {
  React.useEffect(() => {
    console.log("MMA OPENED MODAL ", member.user);
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-[25vw] h-[70vh] overflow-y-auto text-black">
        <div className="flex flex-col items-center ">
          <img
            src={
              member.user.profile?.profile_pic ||
              "https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742159481855-image.png"
            }
            alt="Profile Picture"
            width={100}
            height={100}
            className="w-24 h-24 rounded-full border"
          />
          {/* Username */}
          <h2 className="mt-4 text-xl font-bold">{member.user.username}</h2>
          {viewdByOwner &&
            member.postPermission === PostPermission.REQUESTED && (
              <>
                <p className="mt-4 text-sm text-gray-700 text-center">
                  This user has requested permission to post to the club,
                  confirm or deny the request below
                </p>
                <div className="mt-4 flex justify-center gap-4">
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                    Approve
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                    Deny
                  </button>
                </div>
              </>
            )}
          {/* Bio */}
          <p className="mt-4 text-sm text-gray-700 text-center">
            {member.user.profile?.bio || "Nothing to show here!"}
          </p>
        </div>
        <div
          className=" absolute top-0 right-0 m-2  hover:text-red-500"
          onClick={onClose}
        >
          <X />
        </div>
      </div>
    </div>
  );
};

export default ShowUserInfoModal;
