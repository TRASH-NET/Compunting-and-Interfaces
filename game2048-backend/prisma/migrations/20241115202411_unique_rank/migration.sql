/*
  Warnings:

  - A unique constraint covering the columns `[rank]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Player_rank_key" ON "Player"("rank");