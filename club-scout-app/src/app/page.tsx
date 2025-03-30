import ClubCardHolder from "@/components/home/ClubCardHolder";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/authOptions";
import FloatingMenu from "@/components/FloatingMenu";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen pt-[60px] w-full relative">
     
      <FloatingMenu/>
      <main className="w-full">
        <section className="flex flex-col gap-4 w-full h-full p-4 dark:bg-gray-800 bg-gray-50 rounded">
          {/* Top Row: Flex container for checkboxes and search bar */}
          <div className="flex gap-4 w-full ">
            {/* Left: Checkboxes Container */}
            <div className="w-1/3 bg-white p-4 rounded shadow dark:bg-gray-600">
              <h2 className="font-bold mb-2">Filters</h2>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>Option 1</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>Option 2</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>Option 3</span>
                </label>
              </div>
            </div>

            {/* Right: Search Bar Container */}
            <div className="flex-1 bg-white p-4 rounded shadow dark:bg-gray-600">
              <h2 className="font-bold mb-2">Search for Clubs</h2>
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Bottom Row: Club Cards Container */}
          <ClubCardHolder></ClubCardHolder>
        </section>
      </main>
    </div>
  );
}
