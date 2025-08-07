/*
  Warnings:

  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Message";

-- DropTable
DROP TABLE "public"."Notification";

-- CreateTable
CREATE TABLE "public"."Reason" (
    "id" TEXT NOT NULL,
    "author" "public"."Author" NOT NULL,
    "content" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reason_pkey" PRIMARY KEY ("id")
);
