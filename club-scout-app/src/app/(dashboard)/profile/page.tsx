import { authOptions } from "@/app/lib/authOptions";
import FloatingMenu from "@/components/FloatingMenu";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export interface UserData {
  username: string;
  bio: string;
  id: number;
  profilePicture: string;
}
const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <h2 className="text-2xl">Please login to access the profile page</h2>
    );
  }

  const user = await db.user.findUnique({
    where: {
      id: Number(session.user.id),
    },
    include: {
      profile: {
        select: {
          bio: true,
          profile_pic: true,
        },
      },
      memberships: {
        include: {
          club: true,
        },
      },
    },
  });

  const clubsJoined = user?.memberships.filter((m) => m.role !== "admin");
  const clubsOwned = user?.memberships.filter((m) => m.role === "admin");

  if (user?.profile) {
    return (
      <div className="flex h-screen p-6 ml-0 w-screen mt-10 gap-7">
        {/* Left Section: Profile Info */}
        <div className="w-1/4 bg-blue-50 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            <img
              src={
                user.profile.profile_pic ||
                "https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742159481855-image.png"
              }
              alt="Profile Picture"
              width={100}
              height={100}
              className="w-24 h-24 rounded-full border"
            />
            {/* Username */}
            <h2 className="mt-4 text-xl font-bold">{user.username}</h2>
            {/* Email */}
            <p className="text-gray-600">{user.email}</p>
            {/* Bio */}
            <p className="mt-4 text-sm text-gray-700 text-center">
              {user.profile.bio}
            </p>
          </div>
        </div>

        {/* Right Section: Main Content */}
        <div className="w-3/4 bg-blue-50 p-6 rounded-lg shadow-lg ">
          <h2 className="text-2xl font-semibold">My Clubs</h2>
          <div className="flex p-1 gap-2 h-full">
            {/* Clubs the user has joined */}
            <div className="bg-red-300 w-1/2 h-full p-4 ">
              <h3 className="text-lg font-bold">Clubs I Have Joined</h3>
              {clubsJoined!.length > 0 ? (
                <ul className="mt-2 space-y-2">
                  {clubsJoined!.map(({ club }) => (
                    <li key={club.id} className="p-2 bg-white rounded shadow">
                      {club.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-gray-700">
                  You haven't joined any clubs.
                </p>
              )}
            </div>
            {/* Clubs the user owns */}
            <div className="bg-yellow-100 w-1/2 h-full p-4 ">
              <h3 className="text-lg font-bold">Clubs I Own</h3>
              {clubsOwned!.length > 0 ? (
                <ul className="mt-2 space-y-2">
                  {clubsOwned!.map(({ club }) => (
                    <li key={club.id} className="p-2 bg-white rounded shadow">
                      {club.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-gray-700">You don't own any clubs.</p>
              )}
            </div>
          </div>
        </div>
        <FloatingMenu
          menuType={"profile"}
          userData={{
            username: user.username,
            bio: user.profile!.bio!,
            id: user.id,
            profilePicture: user.profile!.profile_pic!,
          }}
        />
      </div>
    );
  }
};

export default page;
