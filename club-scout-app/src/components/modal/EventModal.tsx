import { createClub } from "@/app/actions/auth";
import React, { use, useActionState, useState } from "react";
import { useRouter } from "next/navigation";

interface EventModalProps {
  onClose: () => void;
}

export interface CreateEventFormData {
  title: FormDataEntryValue | null;
  date: FormDataEntryValue | null;
  details: FormDataEntryValue | null;
  club_id: FormDataEntryValue | null;
}

const EventModal: React.FC<EventModalProps> = ({ onClose }) => {
  const router = useRouter();
  const [state, action, pending] = useActionState(createClub, undefined);

  // Redirect if signup is successful
  React.useEffect(() => {
    if (state?.success) {
      console.log("Event Created");
      // After club is created navigate with router to club page.
      onClose();
      if (state.club) {
        router.push(`/club/${state.club.id}`);
      }
    }
  }, [state, router]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Add an Event</h2>
        <form action={action}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="details"
            >
              Details
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              name="details"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
              disabled={pending}
            >
              Cancel
            </button>
            <button
              disabled={pending}
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {pending ? "Adding Event" : "Add Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
