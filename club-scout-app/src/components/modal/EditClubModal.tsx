import { editClub } from "@/app/actions/auth";
import React, { useActionState, useState } from "react";
import ImageUpload from "./ImageUpload";
import SelectTags from "./SelectTags";
import { useRouter } from "next/navigation";
import { CurrentClubData } from "../club/ClubOne";

interface ClubModalProps {
  onClose: () => void;
  clubData: CurrentClubData;
}
// We also want to pass in the current club data so we need to add an about section to the club in the database first
// Then just pass the club description, about section, tags and image.

export interface EditClubFormData {
  about: FormDataEntryValue | null;
  description: FormDataEntryValue | null;
  clubImageFile: FormDataEntryValue | null;
  tags: FormDataEntryValue | null;
  id: FormDataEntryValue | null;
}

const EditClubModal: React.FC<ClubModalProps> = ({ onClose, clubData }) => {
  const router = useRouter();
  const [state, action, pending] = useActionState(editClub, undefined);
  const [aboutText, setAboutText] = useState(clubData?.about || "");
  const [descriptionText, setDescriptionText] = useState(
    clubData?.description || ""
  );

  // Redirect if signup is successful
  React.useEffect(() => {
    console.log("MMA CLUB DATA FOR EDIT MODAL", clubData);
    if (state?.success) {
      console.log("Club Edited");
      router.refresh();
      onClose();
    }
  }, [state, router]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[40vw] h-[70vh] overflow-y-auto text-black">
        <h2 className="text-2xl font-bold mb-4">Edit Your Club Page</h2>
        <form action={action}>
          <input type="hidden" name="id" value={clubData.id} />
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="about">
              About Section
            </label>
            <textarea
              name="about"
              className="w-full p-2 border border-gray-300 rounded"
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
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
              value={descriptionText}
              onChange={(e) => setDescriptionText(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Tags</label>
            <SelectTags currentTags={clubData.tags} />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="clubCardImage"
            >
              Club Card Image
            </label>
            <ImageUpload></ImageUpload>
          </div>
          <div className="flex justify-between gap-2">
            <button
              disabled={pending}
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {pending ? "Saving..." : "Edit Club"}
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
