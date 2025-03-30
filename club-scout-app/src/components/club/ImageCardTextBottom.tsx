export interface ImageCardProps {
  url: String;
  uploadedBy: String;
  uploadDate: String;
  description: String;
}

const ImageCardTextBottom: React.FC<ImageCardProps> = ({
  url,
  uploadedBy,
  uploadDate,
  description,
}) => {
  // .toDateString()

  return (
    <div className="bg-cyan-100 shadow-md jutify-center flex flex-col items-center w-[600px] h-[400px] rounded-lg mt-3 snap-start scroll-ml-6 group/item">
      <div
        key="1"
        className="relative rounded-lg bg-cover w-[600px] h-[400px] bg-[url('https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742159481855-image.png')]"
      >
        <div className="absolute rounded-lg bottom-0 w-full p-1 m-1 group/edit invisible group-hover/item:visible text-white ">
          <p className="mr-3 ml-3 text-left text-balance text-xl justify-between items-center italic text-md  border-b border-gray-300">
            <span className="">{uploadedBy}</span>
            <span className=""> {uploadDate}</span>
          </p>
          <p className="mr-3 ml-3 text-left text-balance italic text-xl line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageCardTextBottom;
