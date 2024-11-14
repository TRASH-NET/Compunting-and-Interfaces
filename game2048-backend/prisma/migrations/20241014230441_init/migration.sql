/*
  Warnings:

  - You are about to drop the column `email` on the `Player` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[playerName]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Player_email_key";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "email";

-- CreateIndex
CREATE UNIQUE INDEX "Player_playerName_key" ON "Player"("playerName");
