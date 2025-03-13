import Image from "next/image";
import ClubCard, { ClubCardProps } from "../components/ClubCard";

async function getClubs() {
  // Replace this with an actual API call
  const tags = ["Outdoors", "Sports", "Tech", "Art", "Music"];
  const desc = "This is a sample club description";
  const clubName = "Club Name";
  const url =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.fTWEm9c5vSGZHVoILl-BJwHaHa%26pid%3DApi&f=1&ipt=45b5dd227e353b97f74d6fd3ade06e8f6c81ecb1f75f454b80b2342ef2f2c044&ipo=images";
  const response: ClubCardProps[] = [
    {
      imageUrl: url,
      clubName: clubName,
      description: desc,
      tags: tags,
      key: 1,
    },
    { imageUrl: url, clubName: clubName, description: desc, tags: tags },
    ,
    {
      imageUrl: url,
      clubName: clubName,
      description: desc,
      tags: tags,
      key: 2,
    },
    {
      imageUrl: url,
      clubName: clubName,
      description: desc,
      tags: tags,
      key: 3,
    },
    {
      imageUrl: url,
      clubName: clubName,
      description: desc,
      tags: tags,
      key: 4,
    },
    {
      imageUrl: url,
      clubName: clubName,
      description: desc,
      tags: tags,
      key: 5,
    },
  ] as ClubCardProps[];

  return response;
}

export default async function Home() {
  const clubs = await getClubs();

  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen pt-[60px]">
      {/* Sidebar (Navigation) */}
      <aside className="bg-gray-100 p-4 rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <ul>
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
        <section className="flex flex-col gap-4 w-full p-4 dark:bg-gray-800 bg-gray-50 rounded">
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
          <div className="bg-white p-4 rounded shadow dark:bg-gray-600">
            <h2 className="font-bold mb-2">Join a Club</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {clubs.map((club) => (
                <ClubCard
                  imageUrl={club.imageUrl}
                  clubName={club.clubName}
                  description={club.description}
                  tags={club.tags}
                  key={club.key}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
