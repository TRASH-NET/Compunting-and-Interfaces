/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `ActiveToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ActiveToken_token_key" ON "ActiveToken"("token");
