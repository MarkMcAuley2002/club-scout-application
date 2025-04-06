import { createClub } from "@/app/actions/auth";
import React, { use, useActionState, useState } from "react";
import ImageUpload from "./ImageUpload";
import SelectTags from "./SelectTags";
import { useRouter } from "next/navigation";

interface ClubModalProps {
  onClose: () => void;
}

export interface CreateClubFormData {
  name: FormDataEntryValue | null;
  description: FormDataEntryValue | null;
  clubImageFile: FormDataEntryValue | null;
  tags: FormDataEntryValue | null;
}

const CreateClubModal: React.FC<ClubModalProps> = ({ onClose }) => {
  const router = useRouter();
  const [state, action, pending] = useActionState(createClub, undefined);

  // Redirect if signup is successful
  React.useEffect(() => {
    if (state?.success) {
      console.log("Club Created");
      // After club is created navigate with router to club page.
      onClose();
      if (state.club) {
        router.push(`/club/${state.club.id}`);
      }
    }
  }, [state, router]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 h-[70vh] overflow-y-auto text-black">
        <h2 className="text-2xl font-bold mb-4">Create a New Club</h2>
        <form action={action}>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="clubName"
            >
              Club Name
            </label>
            <input
              type="text"
              name="clubName"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              name="description"
            />
          </div>
          <div className="mb-4">
            <SelectTags></SelectTags>
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="clubCardImage"
            >
              Upload an Image to display your Club
            </label>
            <ImageUpload></ImageUpload>
          </div>
          <div className="flex justify-between gap-2">
            <button
              disabled={pending}
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {pending ? "Create Club" : "Create Club"}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
              disabled={pending}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClubModal;
