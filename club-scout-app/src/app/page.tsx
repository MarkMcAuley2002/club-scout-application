import ClubCardHolder from "@/components/home/ClubCardHolder";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen pt-[60px] w-full">
      {/* Sidebar (Navigation) */}
      <aside className="bg-gray-100 p-4 rounded-lg shadow-md dark:bg-gray-800 w-full">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <ul>
          {session?.user && (
            <li>
              <a href="/admin">Profile</a>
            </li>
          )}
          <li>
            <a href="#">Option 1</a>
          </li>
          <li>
            <a href="#">Option 2</a>
          </li>
          <li>
            <a href="#">Option 3</a>
          </li>
        </ul>
      </aside>
      <main>
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
