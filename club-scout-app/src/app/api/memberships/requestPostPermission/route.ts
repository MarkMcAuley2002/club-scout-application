import { authOptions } from "@/app/lib/authOptions";
import { requestPostPermissionSchema } from "@/app/lib/definitions";
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
    const parsedUserId = parseInt(session.user.id);
    const body = await request.json();
    const { club_id } = requestPostPermissionSchema.parse(body);

    const response = await db.membership.update({
      where: {
        user_id_club_id: {
          user_id: parsedUserId,
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
