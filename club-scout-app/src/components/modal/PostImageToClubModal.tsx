import { createClubPost, editProfile } from "@/app/actions/auth";
import React, { useActionState, useState } from "react";
import ImageUpload from "./ImageUpload";
import { useRouter } from "next/navigation";
import { CodeSquare } from "lucide-react";

interface ProfileModalProps {
  onClose: () => void;
  club_id: number;
}

export interface PostImageFormData {
  description: FormDataEntryValue | null;
  image: FormDataEntryValue | null;
  clubId: FormDataEntryValue | null;
}

const PostImageToClubModal: React.FC<ProfileModalProps> = ({
  onClose,
  club_id,
}) => {
  const router = useRouter();
  const [state, action, pending] = useActionState(createClubPost, undefined);

  React.useEffect(() => {
    if (state?.success) {
      console.log("Image Uploaded");
      router.refresh();
      onClose();
    }
    if (!state?.success) {
      console.log("FAILED: ", state?.message);
      console.log(state?.error);
    }
  }, [state, router]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 mb-0 rounded-lg shadow-lg w-[30vw] h-[40vh] text-black">
        <h2 className="text-2xl font-bold mb-4">Create a new post</h2>
        <form action={action}>
          <input type="hidden" name="clubId" value={club_id} />
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
              placeholder="Tell us about your post..."
            />
          </div>

          <div className="mb-4">
            <label className=" text-sm font-semibold mb-2" htmlFor="image">
              Upload Image
            </label>
            <ImageUpload></ImageUpload>
          </div>
          <div className="flex justify-between gap-2">
            <button
              disabled={pending}
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {pending ? "Saving..." : "Post to Club"}
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

export default PostImageToClubModal;
