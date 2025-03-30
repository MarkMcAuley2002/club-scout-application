import { authOptions } from "@/app/lib/authOptions";
import { newClubSchema, NewUserSchema } from "@/app/lib/definitions";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// This endpoint will be used to create a club
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return NextResponse.json(
        { error: "Unauthorized: No valid session found" },
        { status: 401 }
      );
    }
    const userId = parseInt(session?.user.id);

    if (!request.body) {
      return NextResponse.json(
        { error: "Request body is missing" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, description, tags, clubImage } = newClubSchema.parse(body);

    // Check if the club name is being used already.
    const existingClubByName = await db.club.findUnique({
      where: { name: name },
    });

    if (existingClubByName) {
      return NextResponse.json(
        { user: "none", message: "A club with this name already exists" },
        { status: 409 }
      );
    }

    const newClub = await db.$transaction(async (prisma) => {
      // First attempt to create the club, if anything fails in transaction it will rollback.
      const club = await prisma.club.create({
        data: {
          name,
          createdBy: userId,
          description,
          tags: tags,
          clubImage,
        },
      });

      await prisma.membership.create({
        data: {
          user_id: userId,
          club_id: club.id,
          role: "admin",
        },
      });

      return club;
    });

    return NextResponse.json(
      { club: newClub, message: "Club created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
        error: error,
      },
      { status: 500 }
    );
  }
}
