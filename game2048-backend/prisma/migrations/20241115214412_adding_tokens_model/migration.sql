-- CreateTable
CREATE TABLE "ActiveToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActiveToken_pkey" PRIMARY KEY ("id")
);
