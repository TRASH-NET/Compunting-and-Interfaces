/*
  Warnings:

  - You are about to drop the column `score` on the `Player` table. All the data in the column will be lost.
  - Added the required column `score` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "score" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "score",
ALTER COLUMN "rank" DROP NOT NULL;
