/*
  Warnings:

  - You are about to drop the column `type` on the `Image` table. All the data in the column will be lost.
  - Made the column `description` on table `Image` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "type",
ALTER COLUMN "description" SET NOT NULL;
