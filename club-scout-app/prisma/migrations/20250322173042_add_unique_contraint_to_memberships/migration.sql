/*
  Warnings:

  - A unique constraint covering the columns `[user_id,club_id]` on the table `Membership` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Membership_user_id_club_id_key" ON "Membership"("user_id", "club_id");
