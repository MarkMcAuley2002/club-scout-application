import { authOptions } from "@/app/lib/authOptions";
import { newEventSchema } from "@/app/lib/definitions";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// This endpoint will be used to create an event
export async function POST(request: Request) {
  try {
    // const session = await getServerSession(authOptions);

    // if (!session?.user.id) {
    //   return NextResponse.json(
    //     { error: "Unauthorized: No valid session found" },
    //     { status: 401 }
    //   );
    // }

    if (!request.body) {
      return NextResponse.json(
        { error: "Request body is missing" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, date, details, club_id } = newEventSchema.parse(body);

    const newEvent = await db.event.create({
      data: {
        title: title,
        date: date,
        details: details,
        club_id: club_id,
      },
    });

    return NextResponse.json(
      { club: newEvent, message: "Event added" },
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
