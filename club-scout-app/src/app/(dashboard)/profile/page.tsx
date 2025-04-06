import { authOptions } from "@/app/lib/authOptions";
import FloatingMenu from "@/components/FloatingMenu";
import ProfileClubSection from "@/components/profile/ProfileClubSection";
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

  const clubsJoined = user?.memberships
    .filter((membership) => membership.role !== "admin")
    .map((membership) => membership.club);
  const clubsOwned = user?.memberships
    .filter((membership) => membership.role === "admin")
    .map((membership) => membership.club);

  if (user?.profile) {
    return (
      <div className="flex h-screen p-6 ml-0 w-screen mt-10 gap-7 bg-inherit">
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
        <div className="w-3/4 bg-blue-50  rounded-lg shadow-lg p-4 ">
          <div className="flex gap-2 h-full ">
            {/* Clubs the user owns */}
            <ProfileClubSection
              clubs={clubsOwned ? clubsOwned : []}
              clubOwner={true}
            />
            {/* Clubs the user has joined */}
            <ProfileClubSection
              clubOwner={false}
              clubs={clubsJoined ? clubsJoined : []}
            />
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
