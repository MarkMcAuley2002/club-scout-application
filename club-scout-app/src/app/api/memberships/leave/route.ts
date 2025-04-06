import { authOptions } from "@/app/lib/authOptions";
import { removeSelfMembershipSchema } from "@/app/lib/definitions";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // session returns a string instead of the number we need
    const parsedUserId = parseInt(session.user.id);

    if (!request.body) {
      return NextResponse.json(
        { error: "Request body is missing" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { club_id } = removeSelfMembershipSchema.parse(body);

    const response = await db.membership.delete({
      where: {
        user_id_club_id: {
          user_id: parsedUserId,
          club_id,
        },
      },
    });

    return NextResponse.json(
      { message: `left club ${response}` },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong while attempting to leave the club",
        error: error,
      },
      { status: 500 }
    );
  }
}
