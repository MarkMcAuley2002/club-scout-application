import ClubCardHolder from "@/components/home/ClubCardHolder";
import FloatingMenu from "@/components/FloatingMenu";

export default async function Home() {
  return (
    <div className="min-h-screen w-full  bg-inherit ">
      <FloatingMenu menuType="home" />
      <main className="w-full p-6">
        <section className="flex flex-col w-full h-full rounded">
          <div className="flex flex-col items-center justify-center text-center m-10">
            <img
              src="/Logo.svg"
              alt="Club Image"
              className="w-[300px] h-[300px] object-fit mb-4"
            />
            <h2 className="text-3xl font-bold mb-4">
              Welcome to the Club Scout!
            </h2>
            <p className="text-lg text-balance text-gray-700 mb-4 max-w-[600px]">
              Here is my message about how great this app is!
            </p>
          </div>

          {/*Search Bar Container */}
          <div className="bg-white p-4 rounded shadow w-full sm:w-1/2 md:w-1/3 mx-auto dark:bg-gray-600 justify-start">
            <h2 className="font-bold mb-2">Search for Clubs</h2>
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <ClubCardHolder />
        </section>
      </main>
    </div>
  );
}
