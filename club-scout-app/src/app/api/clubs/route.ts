import { NewUserSchema } from "@/app/lib/definitions";
import { ClubCardProps } from "@/components/ClubCard";
import { db } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

// This endpoint will be used to create a new user and user profile.
// Route handler https://next-auth.js.org/configuration/initialization#route-handlers-app
export async function GET() {
  const tags = ["Outdoors", "Sports", "Tech", "Art", "Music"];
  const desc = "This is a sample club description";
  const clubName = "Club Name";
  const url =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.fTWEm9c5vSGZHVoILl-BJwHaHa%26pid%3DApi&f=1&ipt=45b5dd227e353b97f74d6fd3ade06e8f6c81ecb1f75f454b80b2342ef2f2c044&ipo=images";
  const clubCards = [
    {
      imageUrl: url,
      clubName: clubName,
      description: desc,
      tags: tags,
      key: 1,
    },
    {
      imageUrl: url,
      clubName: clubName,
      description: desc,
      tags: tags,
      key: 7,
    },
    {
      imageUrl: url,
      clubName: clubName,
      description: desc,
      tags: tags,
      key: 2,
    },
    {
      imageUrl: url,
      clubName: clubName,
      description: desc,
      tags: tags,
      key: 3,
    },
    {
      imageUrl: url,
      clubName: clubName,
      description: desc,
      tags: tags,
      key: 4,
    },
    {
      imageUrl: url,
      clubName: clubName,
      description: desc,
      tags: tags,
      key: 5,
    },
  ];

  return new Response(JSON.stringify(clubCards), { status: 200 });
}
