import { authOptions } from "@/app/lib/authOptions";
import { removeMemberSchema } from "@/app/lib/definitions";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); // Make sure the user is actually logged in first. 
    }

    if (!request.body) {
      return NextResponse.json(
        { error: "Request body is missing" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { user_id, club_id } = removeMemberSchema.parse(body);

    const response = await db.membership.delete({
      where: {
        user_id_club_id: {
          user_id: user_id,
          club_id,
        },
      },
    });

    return NextResponse.json(
      { message: `member removed from the club ${response}` },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Something went wrong while attempting to remove the member from the club",
        error: error,
      },
      { status: 500 }
    );
  }
}
