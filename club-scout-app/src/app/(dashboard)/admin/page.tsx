import { authOptions } from "@/app/lib/authOptions";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return <h2 className="text-2xl">{session.user.username}'s Profile</h2>;
  } else {
    return (
      <h2 className="text-2xl">Please login to access the profile page</h2>
    );
  }
};

export default page;
