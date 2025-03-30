import ClubOneTemplate from "@/components/club/ClubOne";
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";

/**
 * For editing the club
 * handleChange = (e) => {
 * setClub({ ...club, [e.target.name]: e.target.value });
 *
 */

const ClubPage = async ({ params }: { params: { clubId: string } }) => {
  // Resolve params before using them
  // https://nextjs.org/docs/messages/sync-dynamic-apis
  const resolvedParams = await Promise.resolve(params);
  const clubId = resolvedParams.clubId;

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
        include: { user: { select: { username: true, id: true } } },
      },
    },
  });

  if (!club || !club.events) {
    return notFound();
  } else {
    console.log("MMA EVENTS", club.events);
  }

  return (
    <div className="flex  bg-purple-300 w-full h-full mt-10">
      <ClubOneTemplate club={club} />
    </div>
  );
};

export default ClubPage;
