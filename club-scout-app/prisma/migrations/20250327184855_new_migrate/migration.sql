/*
  Warnings:

  - Made the column `details` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "details" SET NOT NULL;
