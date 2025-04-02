import ClubOneTemplate from "@/components/club/ClubOne";
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";

const ClubPage = async ({ params }: { params: { clubId: string } }) => {
  // Resolve params before using them
  // https://nextjs.org/docs/messages/sync-dynamic-apis
  const resolvedParams = await Promise.resolve(params);
  const clubId = resolvedParams.clubId;
  // reuse for admin profiles, get club owner by user, include memberships with user id, username and postPermission if it is requested.
  const club = await db.club.findUnique({
    where: {
      id: parseInt(clubId),
    },
    include: {
      events: {
        select: {
          title: true,
          date: true,
          details: true,
        },
      },
      memberships: {
        select: {
          role: true,
          postPermission: true,
          user: {
            select: {
              username: true,
              id: true,
              profile: { select: { profile_pic: true } },
            },
          },
        },
      },
    },
  });

  console.log("Memberships", club?.memberships);

  if (!club || !club.events) {
    return notFound();
  } else {
    // console.log("MMA EVENTS", club.events);
  }

  return (
    <div className="flex w-full h-full mt-10">
      <ClubOneTemplate club={club} />
    </div>
  );
};

export default ClubPage;
