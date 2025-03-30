"use client";
import { useRef } from "react";
import ImageCardTextBottom from "./ImageCardTextBottom";
import ImageCardTextCenter from "./ImageCardTextCenter";
import Button from "../Button";

const MembersSection: React.FC = ({}) => {
  // .toDateString()
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const handleScrollUp = () => {
    scrollContainerRef.current?.scrollBy({ top: -200, behavior: "smooth" });
  };

  const handleScrollDown = () => {
    scrollContainerRef.current?.scrollBy({ top: 200, behavior: "smooth" });
  };

  return (
    <div className="p-5 w-[400px] h-[500px] bg-blue-100 rounded-lg m-5 relative justify-start group/item bg-opacity-45">
      <h1 className="text-3xl text-center">Club Members</h1>
      <div className="relative mt-3 p-3 justify-self-center">
        <div
          ref={scrollContainerRef}
          className="h-[400px] overflow-y-hidden snap-y pr-8"
        >
          <div className="space-y-4 justify-self-center bg-opacity-50 w-[20rem] mb-3">
            <div className="p-4 rounded bg-gray-100 bg-opacity-50 overflow-hidden w-full h-[7rem] shadow-lg">
              <div className="flex">
                <div className="w-full h-full overflow-hidden relative flex">
                  <img
                    src={
                      "https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742587637072-neilschmeal.png"
                    }
                    alt="Club Image"
                    className="w-[5rem] h-[5rem] object-cover"
                  />
                  <div className=" flex flex-col justify-top ml-5">
                    <h3 className="text-l font-semibold text-gray-900 dark:text-white">
                      Username
                    </h3>
                    <h3 className="text-l italic font-semibold text-gray-900 dark:text-white">
                      Role
                    </h3>
                  </div>
                  <div className="text-center relative h-fit bg-red-500 rounded-sm p-1 ml-20">
                    X
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 justify-self-center bg-opacity-50 w-[20rem] mb-3">
            <div className="p-4 rounded bg-gray-100 overflow-hidden w-full h-[7rem] shadow-lg">
              <div className="flex">
                <div className="w-full h-full overflow-hidden relative flex">
                  <img
                    src={
                      "https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742587637072-neilschmeal.png"
                    }
                    alt="Club Image"
                    className="w-[5rem] h-[5rem] object-cover"
                  />
                  <div className=" flex flex-col justify-top ml-5">
                    <h3 className="text-l font-semibold text-gray-900 dark:text-white">
                      Username
                    </h3>
                    <h3 className="text-l italic font-semibold text-gray-900 dark:text-white">
                      Role
                    </h3>
                  </div>
                  <div className="text-center relative h-fit bg-red-500 rounded-sm p-1 ml-20">
                    X
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 justify-self-center bg-opacity-50 w-[20rem] mb-3">
            <div className="p-4 rounded bg-gray-100 overflow-hidden w-full h-[7rem] shadow-lg">
              <div className="flex">
                <div className="w-full h-full overflow-hidden relative flex">
                  <img
                    src={
                      "https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742587637072-neilschmeal.png"
                    }
                    alt="Club Image"
                    className="w-[5rem] h-[5rem] object-cover"
                  />
                  <div className=" flex flex-col justify-top ml-5">
                    <h3 className="text-l font-semibold text-gray-900 dark:text-white">
                      Username
                    </h3>
                    <h3 className="text-l italic font-semibold text-gray-900 dark:text-white">
                      Role
                    </h3>
                  </div>
                  <div className="text-center relative h-fit bg-red-500 rounded-sm p-1 ml-20">
                    X
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 justify-self-center bg-opacity-50 w-[20rem] mb-3">
            <div className="p-4 rounded bg-gray-100 overflow-hidden w-full h-[7rem] shadow-lg">
              <div className="flex">
                <div className="w-full h-full overflow-hidden relative flex">
                  <img
                    src={
                      "https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742587637072-neilschmeal.png"
                    }
                    alt="Club Image"
                    className="w-[5rem] h-[5rem] object-cover"
                  />
                  <div className=" flex flex-col justify-top ml-5">
                    <h3 className="text-l font-semibold text-gray-900 dark:text-white">
                      Username
                    </h3>
                    <h3 className="text-l italic font-semibold text-gray-900 dark:text-white">
                      Role
                    </h3>
                  </div>
                  <div className="text-center relative h-fit bg-red-500 rounded-sm p-1 ml-20">
                    X
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 justify-self-center bg-opacity-50 w-[20rem] mb-3">
            <div className="p-4 rounded bg-gray-100 overflow-hidden w-full h-[7rem] shadow-lg">
              <div className="flex">
                <div className="w-full h-full overflow-hidden relative flex">
                  <img
                    src={
                      "https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742587637072-neilschmeal.png"
                    }
                    alt="Club Image"
                    className="w-[5rem] h-[5rem] object-cover"
                  />
                  <div className=" flex flex-col justify-top ml-5">
                    <h3 className="text-l font-semibold text-gray-900 dark:text-white">
                      Username
                    </h3>
                    <h3 className="text-l italic font-semibold text-gray-900 dark:text-white">
                      Role
                    </h3>
                  </div>
                  <div className="text-center relative h-fit bg-red-500 rounded-sm p-1 ml-20">
                    X
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 justify-self-center bg-opacity-50 w-[20rem] mb-3">
            <div className="p-4 rounded bg-gray-100 bg-opacity-50 overflow-hidden w-full h-[7rem] shadow-lg">
              <div className="flex">
                <div className="w-full h-full overflow-hidden relative flex">
                  <img
                    src={
                      "https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742587637072-neilschmeal.png"
                    }
                    alt="Club Image"
                    className="w-[5rem] h-[5rem] object-cover"
                  />
                  <div className=" flex flex-col justify-top ml-5">
                    <h3 className="text-l font-semibold text-gray-900 dark:text-white">
                      Username
                    </h3>
                    <h3 className="text-l italic font-semibold text-gray-900 dark:text-white">
                      Role
                    </h3>
                  </div>
                  <div className="text-center relative h-fit bg-red-500 rounded-sm p-1 ml-20">
                    X
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 justify-self-center bg-opacity-50 w-[20rem] mb-3">
            <div className="p-4 rounded bg-gray-100 overflow-hidden w-full h-[7rem] shadow-lg">
              <div className="flex">
                <div className="w-full h-full overflow-hidden relative flex">
                  <img
                    src={
                      "https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742587637072-neilschmeal.png"
                    }
                    alt="Club Image"
                    className="w-[5rem] h-[5rem] object-cover"
                  />
                  <div className=" flex flex-col justify-top ml-5">
                    <h3 className="text-l font-semibold text-gray-900 dark:text-white">
                      Username
                    </h3>
                    <h3 className="text-l italic font-semibold text-gray-900 dark:text-white">
                      Role
                    </h3>
                  </div>
                  <div className="text-center relative h-fit bg-red-500 rounded-sm p-1 ml-20">
                    X
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 justify-self-center bg-opacity-50 w-[20rem] mb-3">
            <div className="p-4 rounded bg-gray-100 overflow-hidden w-full h-[7rem] shadow-lg">
              <div className="flex">
                <div className="w-full h-full overflow-hidden relative flex">
                  <img
                    src={
                      "https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742587637072-neilschmeal.png"
                    }
                    alt="Club Image"
                    className="w-[5rem] h-[5rem] object-cover"
                  />
                  <div className=" flex flex-col justify-top ml-5">
                    <h3 className="text-l font-semibold text-gray-900 dark:text-white">
                      Username
                    </h3>
                    <h3 className="text-l italic font-semibold text-gray-900 dark:text-white">
                      Role
                    </h3>
                  </div>
                  <div className="text-center relative h-fit bg-red-500 rounded-sm p-1 ml-20">
                    X
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 justify-self-center bg-opacity-50 w-[20rem] mb-3">
            <div className="p-4 rounded bg-gray-100 overflow-hidden w-full h-[7rem] shadow-lg">
              <div className="flex">
                <div className="w-full h-full overflow-hidden relative flex">
                  <img
                    src={
                      "https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742587637072-neilschmeal.png"
                    }
                    alt="Club Image"
                    className="w-[5rem] h-[5rem] object-cover"
                  />
                  <div className=" flex flex-col justify-top ml-5">
                    <h3 className="text-l font-semibold text-gray-900 dark:text-white">
                      Username
                    </h3>
                    <h3 className="text-l italic font-semibold text-gray-900 dark:text-white">
                      Role
                    </h3>
                  </div>
                  <div className="text-center relative h-fit bg-red-500 rounded-sm p-1 ml-20">
                    X
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
        <button
          onClick={handleScrollUp}
          className="absolute right-0 top-0 ml-2 mt-2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 invisible group-hover/item:visible"
        >
          &uarr;
        </button>
        <button
          onClick={handleScrollDown}
          className="absolute right-0 bottom-0 ml-2 mb-2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 invisible group-hover/item:visible"
        >
          &darr;
        </button>
      </div>
    </div>
  );
};

export default MembersSection;
