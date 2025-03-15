import { authOptions } from "@/app/lib/authOptions";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <h2>Not logged In</h2>;
  }

  // // MMA catch error
  const profile = await db.profile.findUnique({
    where: { user_id: Number(session.user.id) },
  });

  if (session?.user || !profile) {
    return (
      <div>
        <h1 className="text-2xl">{profile?.bio}</h1>
        <h2 className="text-2xl">{session.user.username}'s Profile</h2>
      </div>
    );
  } else {
    return (
      <h2 className="text-2xl">Please login to access the profile page</h2>
    );
  }
};

export default page;
