-- CreateEnum
CREATE TYPE "PostPermission" AS ENUM ('BASE', 'REQUESTED', 'FULL');

-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "postPermission" "PostPermission" NOT NULL DEFAULT 'BASE';
