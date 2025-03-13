import NextAuth from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
      username?: string; // Mark as optional to prevent Prisma Adapter conflict (its not actually optional)
    }

   interface Session { 
    user: User & {
        username: string
    }, 
    token: {
        username: string
    }
   }
}
