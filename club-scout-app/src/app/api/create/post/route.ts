import { authOptions } from "@/app/lib/authOptions";
import { newEventSchema, newImageSchema } from "@/app/lib/definitions";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// This endpoint will be used to create an event
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      return NextResponse.json(
        { error: "Unauthorized: No valid session found" },
        { status: 401 }
      );
    }

    const parsedUserId = parseInt(session?.user.id);

    if (!request.body) {
      return NextResponse.json(
        { error: "Request body is missing" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { club_id, description, url } = newImageSchema.parse(body);

    await db.image.create({
      data: {
        uploaded_by: parsedUserId,
        club_id,
        url,
        description,
      },
    });

    return NextResponse.json({ message: "Image added" }, { status: 201 });
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
