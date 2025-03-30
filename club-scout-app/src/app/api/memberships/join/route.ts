import { authOptions } from "@/app/lib/authOptions";
import { newMembershipSchema } from "@/app/lib/definitions";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// This endpoint will be used to create a club
export async function POST(request: Request) {
  // Get the route
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
    const { club_id, role } = newMembershipSchema.parse(body);

    const newMember = await db.membership.create({
      data: {
        user_id: userId,
        club_id: club_id,
        role: role,
      },
    });

    return NextResponse.json(
      { member: newMember, message: "Membership added" },
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
