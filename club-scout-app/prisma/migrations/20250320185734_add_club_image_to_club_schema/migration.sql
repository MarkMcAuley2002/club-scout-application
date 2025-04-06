/*
  Warnings:

  - Made the column `clubImage` on table `Club` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Club" ALTER COLUMN "clubImage" SET NOT NULL,
ALTER COLUMN "clubImage" SET DEFAULT 'https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742159481855-image.png';
