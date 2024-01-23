/*
  Warnings:

  - You are about to drop the column `unitId` on the `Assignment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Assignment_unitId_idx";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "unitId",
ADD COLUMN     "moduleId" TEXT;

-- CreateIndex
CREATE INDEX "Assignment_moduleId_idx" ON "Assignment"("moduleId");
