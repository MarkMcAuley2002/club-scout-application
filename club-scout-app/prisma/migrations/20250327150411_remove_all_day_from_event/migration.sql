/*
  Warnings:

  - You are about to drop the column `all_day` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "all_day",
ADD COLUMN     "details" TEXT;
