export interface ImageCardProps {
  url: string;
  uploadedBy: string;
  uploadDate: string;
  description: string;
}

const ImageCardTextCenter: React.FC<ImageCardProps> = ({
  url,
  uploadedBy,
  uploadDate,
  description,
}) => {
  // .toDateString()

  return (
    <div className="shadow-md jutify-center flex flex-col items-center w-[600px] h-[400px] rounded-lg  snap-start scroll-ml-6 group/item mb-10">
      <div className="relative w-[600px] h-[400px] m-3 rounded-lg group shadow-md">
        {/* Background image */}
        <img
          src={url}
          alt="Image"
          className="w-[600px] h-[400px] object-cover"
        />

        {/* Overlay */}
        <div className="absolute w-[600px] inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
          <p className="w-full text-center text-md italic  pb-2 flex flex-col">
            <span className="border-b border-gray-300">{uploadedBy}</span>
            <span className="border-b border-gray-300">{uploadDate}</span>
          </p>
          <p className="mr-3 ml-3 text-center text-balance text-xl italic mt-1 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageCardTextCenter;
