"use client";
import { useRef } from "react";
import ImageCardTextCenter from "./ImageCardTextCenter";
import { useSession } from "next-auth/react";
import { PostPermission } from "@prisma/client";

interface ImageSectionProps {
  permissionStatus: PostPermission;
  clubId: number;
}
// .toDateString()

const ImageSection: React.FC<ImageSectionProps> = ({
  permissionStatus,
  clubId,
}) => {
  const { data: session } = useSession();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -620, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 620, behavior: "smooth" });
  };

  const handleRequestPostPermission = async () => {
    try {
      if (!session?.user) {
        throw Error("Unauthorized User");
      }

      const response = await fetch("/api/memberships/requestPostPermission", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          club_id: clubId,
        }),
      });

      if (!response.ok) {
        console.log("Failed: ", response);
      }
    } catch (error) {
      console.log("Error making post: ", error);
    }
  };

  return (
    <div className=" justify-start border-gray-500 mb-5">
      <h1 className="text-3xl justify-center flex text-white m-3 mb-5">
        Club Images
      </h1>
      <div className="relative ml-3 mr-3 mt-3 ">
        <div
          ref={scrollContainerRef}
          className="snap-x snap-start overflow-x-hidden flex gap-6 mt-4 whitespace-nowrap  w-full"
          dir="ltr"
        >
          <ImageCardTextCenter
            uploadedBy="markmcauley"
            uploadDate="21st March 2025"
            url="https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742159481855-image.png"
            description=" And here is a description of the photo isn't it lovely? What
              happens if I keep going..."
          />
          <ImageCardTextCenter
            uploadedBy="markmcauley"
            uploadDate="21st March 2025"
            url="https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742159481855-image.png"
            description=" And here is a description of the photo isn't it lovely? What
              happens if I keep going..."
          />
          <ImageCardTextCenter
            uploadedBy="markmcauley"
            uploadDate="21st March 2025"
            url="https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742159481855-image.png"
            description=" And here is a description of the photo isn't it lovely? What
              happens if I keep going..."
          />
          <ImageCardTextCenter
            uploadedBy="markmcauley"
            uploadDate="21st March 2025"
            url="https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742159481855-image.png"
            description=" And here is a description of the photo isn't it lovely? What
              happens if I keep going..."
          />
          <ImageCardTextCenter
            uploadedBy="markmcauley"
            uploadDate="21st March 2025"
            url="https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742985051878-mountains.JPG"
            description="And here is a picture of mountain people"
          />
          <ImageCardTextCenter
            uploadedBy="markmcauley"
            uploadDate="21st March 2025"
            url="https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742159481855-image.png"
            description=" And here is a description of the photo isn't it lovely? What
              happens if I keep going..."
          />
          <ImageCardTextCenter
            uploadedBy="markmcauley"
            uploadDate="21st March 2025"
            url="https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742159481855-image.png"
            description=" And here is a description of the photo isn't it lovely? What
              happens if I keep going..."
          />
        </div>
        {/* Button to scroll images to the left */}
        <button
          onClick={handleScrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 ml-2"
        >
          &larr;
        </button>

        {/* Button to scroll images to the right */}
        <button
          onClick={handleScrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 mr-2"
        >
          &rarr;
        </button>
      </div>
      {permissionStatus === PostPermission.BASE && (
        <div className="mt-2 text-center">
          <p className="text-white text-lg">
            Want to post an image of your own?
          </p>
          <span
            onClick={handleRequestPostPermission}
            className="text-white underline cursor-pointer hover:text-blue-300 "
          >
            Click here to request post permission.
          </span>
        </div>
      )}
      {permissionStatus === PostPermission.REQUESTED && (
        <div className="mt-2 text-center">
          <p className="text-white text-lg">
            You have requested permission to post images in this club.
          </p>
          <p className="text-white text-lg">
            If the club owner accepts your request you will be able to upload
            images
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageSection;
