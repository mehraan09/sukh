-- CreateEnum
CREATE TYPE "public"."Author" AS ENUM ('Sukh', 'Akash');

-- CreateTable
CREATE TABLE "public"."Reason" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Reason_pkey" PRIMARY KEY ("id")
);
