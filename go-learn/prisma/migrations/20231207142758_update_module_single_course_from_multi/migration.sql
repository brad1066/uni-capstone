/*
  Warnings:

  - You are about to drop the `_CourseToModule` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "websiteURL" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "courseId" INTEGER;

-- DropTable
DROP TABLE "_CourseToModule";

-- CreateIndex
CREATE INDEX "Module_courseId_idx" ON "Module"("courseId");
