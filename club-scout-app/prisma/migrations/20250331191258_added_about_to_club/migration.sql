/*
  Warnings:

  - You are about to drop the column `uploaded_data` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "about" TEXT NOT NULL DEFAULT 'No about section has been added to this club yet';

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "uploaded_data",
ADD COLUMN     "upload_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
