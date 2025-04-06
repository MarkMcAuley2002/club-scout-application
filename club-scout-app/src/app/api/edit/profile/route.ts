import { authOptions } from "@/app/lib/authOptions";
import { editProfileSchema } from "@/app/lib/definitions";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// https://www.prisma.io/docs/orm/prisma-client/queries/crud#update
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
    const { username, bio, profilePicture, id } = editProfileSchema.parse(body);

    // Get the user that is updating their profile.
    // Use this to compare the current values with the ones they are trying to change
    // exclude if they match.
    const existingUser = await db.user.findUnique({
      where: { id },
      include: { profile: true },
    });

    // Check if the username is being used already, the same as when creating an account
    // but now also check if they have the same id (this is fine).
    if (!existingUser) {
      return NextResponse.json(
        { user: "none", message: "User not found" },
        { status: 404 }
      );
    }

    // Now make sure that another user with the same username (that is being set)
    // does not exist
    if (username !== existingUser.username) {
      if (username) {
        const userWithSameUsername = await db.user.findUnique({
          where: { username },
        });

        if (userWithSameUsername) {
          return NextResponse.json(
            { message: "A user with this username already exists" },
            {
              status: 409,
            }
          );
        }
      }
    }

    // Update the user and profile in the same call.
    // Setting a field to undefiend during an update will tell prisma that it
    // should not be updated.
    // https://stackoverflow.com/questions/69526209/prisma-how-can-i-update-only-some-of-the-models-fields-in-update
    const updatedUser = await db.user.update({
      where: { id },
      data: {
        username: username
          ? username !== existingUser.username
            ? username
            : undefined
          : undefined,
        profile: {
          update: {
            bio: bio ?? undefined,
            profile_pic: profilePicture
              ? profilePicture !== existingUser.profile?.profile_pic
                ? profilePicture
                : undefined
              : undefined,
          },
        },
      },
      include: { profile: true },
    });

    return NextResponse.json(
      { user: updatedUser, message: "Changes applied successfully" },
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
