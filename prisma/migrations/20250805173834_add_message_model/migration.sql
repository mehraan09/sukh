/*
  Warnings:

  - You are about to drop the `Reason` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Reason";

-- CreateTable
CREATE TABLE "public"."Message" (
    "id" TEXT NOT NULL,
    "author" "public"."Author" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Notification" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "timestamp" BIGINT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);
