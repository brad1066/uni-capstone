/*
  Warnings:

  - You are about to drop the column `uploads` on the `Resource` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "uploads";

-- CreateTable
CREATE TABLE "Upload" (
    "_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "resourceId" INTEGER,

    CONSTRAINT "Upload_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE INDEX "Upload_resourceId_idx" ON "Upload"("resourceId");
