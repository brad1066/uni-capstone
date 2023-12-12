/*
  Warnings:

  - You are about to drop the `_ResourceToUnit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `unitId` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "unitId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ResourceToUnit";

-- CreateIndex
CREATE INDEX "Resource_unitId_idx" ON "Resource"("unitId");
