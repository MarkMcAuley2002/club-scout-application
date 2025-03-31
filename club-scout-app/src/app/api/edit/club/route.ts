import { authOptions } from "@/app/lib/authOptions";
import { editClubSchema } from "@/app/lib/definitions";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// This endpoint will be used to create a club
export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return NextResponse.json(
        { error: "Unauthorized: No valid session found" },
        { status: 401 }
      );
    }
    if (!request.body) {
      return NextResponse.json(
        { error: "Request body is missing" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { about, description, tags, clubImage, id } =
      editClubSchema.parse(body);
    // Check if the club name is being used already.

    const editedClub = await db.club.update({
      where: {
        id,
      },
      data: {
        about,
        description,
        tags: { set: tags },
        clubImage,
      },
    });

    return NextResponse.json(
      { club: editedClub, message: "Changes applied successfully" },
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
