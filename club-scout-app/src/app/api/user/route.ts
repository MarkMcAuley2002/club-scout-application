import { NewUserSchema } from "@/app/lib/definitions";
import { db } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

// This endpoint will be used to create a new user and user profile.
// Route handler https://next-auth.js.org/configuration/initialization#route-handlers-app
export async function POST(request: Request) {
  // Get the route
  try {
    if (!request.body) {
      return NextResponse.json(
        { error: "Request body is missing" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { email, username, password } = NewUserSchema.parse(body);

    // Check if the email already exists
    const existingUserbyEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUserbyEmail) {
      return NextResponse.json(
        { user: "none", message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Check if the username already exists
    const existingUserbyUsername = await db.user
      .findUnique({
        where: { username: username },
      })
      .catch((reason) => {
        return NextResponse.json({
          user: "none",
          message: `Error creating user ${reason}`,
        });
      });

    if (existingUserbyUsername) {
      return NextResponse.json(
        { user: "none", message: "User with this username already exists" },
        { status: 409 }
      );
    }

    // Hash the user password
    const hashedPassword = await hash(password, 10);
    // The transaction will fail if either the user or profile is not created.
    const newUser = await db.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
          profile: {
            create: {},
          },
        },
        include: { profile: true },
      });

      return user;
    });

    const { password: newUserPassword, ...userNoPw } = newUser;

    return NextResponse.json(
      { user: userNoPw, message: "User created successfully" },
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
