import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Route handler https://next-auth.js.org/configuration/initialization#route-handlers-app
export async function GET() {
  try {
    const clubs = await db.club.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        tags: true,
        clubImage: true,
        createdBy: true,
        memberships: true,
        images: true,
      },
    });

    return NextResponse.json({ clubs: clubs }, { status: 200 });
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
