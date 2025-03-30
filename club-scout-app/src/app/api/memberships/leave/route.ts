import { authOptions } from "@/app/lib/authOptions";
import {
  newMembershipSchema,
  removeMembershipSchema,
} from "@/app/lib/definitions";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// This endpoint will be used to create a club
export async function DELETE(request: Request) {
  // Get the route

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session?.user.id);

    if (!request.body) {
      return NextResponse.json(
        { error: "Request body is missing" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { club_id } = removeMembershipSchema.parse(body);

    const response = await db.membership.delete({
      where: {
        user_id_club_id: {
          user_id: userId,
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
