import { createClub } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import React, { useActionState } from "react";

interface ClubModalProps {
  onClose: () => void;
}

// model Club {
//   id          Int      @id @default(autoincrement())
//   name        String
//   description String
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt
//   tags        String[]

//   events      Event[]
//   memberships Membership[]
//   images      Image[]
// }

const CreateClubModal: React.FC<ClubModalProps> = ({ onClose }) => {
    const [state, action, pending] = useActionState(createClub, undefined);
  
    // Redirect if signup is successful
    React.useEffect(() => {
      if (state?.success) {
        console.log("Club Created")
        onClose();
      }
    }, [state]);
  
    
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Create a New Club</h2>
        <form action={action}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Club Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Description
            </label>
            <textarea className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {pending ? "Creating..." : "Create Club"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClubModal;
