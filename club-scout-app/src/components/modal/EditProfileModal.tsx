import { editProfile } from "@/app/actions/auth";
import React, { useActionState, useState } from "react";
import ImageUpload from "./ImageUpload";
import { useRouter } from "next/navigation";
import { UserData } from "@/app/(dashboard)/profile/page";
import { stat } from "fs";

interface ProfileModalProps {
  onClose: () => void;
  userData: UserData;
}

export interface EditProfileFormData {
  username: FormDataEntryValue | null;
  bio: FormDataEntryValue | null;
  profilePicture: FormDataEntryValue | null;
  profilePictureUrl: FormDataEntryValue | null; // If the user does not include a new profile image just use their old one
  userId: FormDataEntryValue | null;
}

const EditClubModal: React.FC<ProfileModalProps> = ({ onClose, userData }) => {
  const router = useRouter();
  const [state, action, pending] = useActionState(editProfile, undefined);
  const [username, setUsername] = useState(userData.username);
  const [bio, setBio] = useState(userData.bio);

  React.useEffect(() => {
    if (state?.success) {
      console.log("Profile Updated", state.user);
      router.refresh();
      onClose();
    }
  }, [state, router]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[30vw] h-[70vh] overflow-y-auto text-black">
        <h2 className="text-2xl font-bold mb-4">Edit Your Profile</h2>
        <form action={action}>
          <input type="hidden" name="id" value={userData.id} />
          <input
            type="hidden"
            name="profile-pic-url"
            value={userData.profilePicture}
          />
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              name="username"
              className="w-full p-2 border border-gray-300 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="description"
            >
              Bio
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              name="description"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="profilePicture"
            >
              Profile Picture
            </label>
            <ImageUpload></ImageUpload>
          </div>
          <div className="flex justify-between gap-2">
            <button
              disabled={pending}
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {pending ? "Saving..." : "Edit Profile"}
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

export default EditClubModal;
