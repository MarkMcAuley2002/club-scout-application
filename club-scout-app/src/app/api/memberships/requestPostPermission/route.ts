import { authOptions } from "@/app/lib/authOptions";
import { editMemberSchema } from "@/app/lib/definitions";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
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
    const { user_id, club_id } = editMemberSchema.parse(body);

    const response = await db.membership.update({
      where: {
        user_id_club_id: {
          user_id: user_id,
          club_id,
        },
      },
      data: {
        postPermission: "REQUESTED",
      },
    });

    return NextResponse.json(
      { message: `Permission requested ${response}` },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong while update the users post permission",
        error: error,
      },
      { status: 500 }
    );
  }
}
