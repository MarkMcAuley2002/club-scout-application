"use client";
import { useRef } from "react";
import ImageCardTextBottom from "./ImageCardTextBottom";
import ImageCardTextCenter from "./ImageCardTextCenter";

const ImageSection: React.FC = ({}) => {
  // .toDateString()
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const handleScrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -620, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 620, behavior: "smooth" });
  };

  return (
    <div className=" justify-start border-gray-500">
      <h1 className="text-3xl justify-center flex text-white m-3 mb-5">
        Club Photos
      </h1>
      <div className="relative  m-3">
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
    </div>
  );
};

export default ImageSection;
