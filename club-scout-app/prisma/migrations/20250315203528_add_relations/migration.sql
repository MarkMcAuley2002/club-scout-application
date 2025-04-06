/*
  Warnings:

  - You are about to drop the column `description` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `all_day` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `club_id` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "tags" TEXT[];

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "all_day" BOOLEAN NOT NULL,
ADD COLUMN     "club_id" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updatedAt";

-- CreateTable
CREATE TABLE "Profile" (
    "user_id" INTEGER NOT NULL,
    "bio" TEXT,
    "profile_pic" TEXT DEFAULT 'https://img.icons8.com/?size=64&id=tZuAOUGm9AuS&format=png',

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Membership" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "club_id" INTEGER NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'member',

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "uploaded_by" INTEGER NOT NULL,
    "club_id" INTEGER NOT NULL,
    "uploaded_data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
