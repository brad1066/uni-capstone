/*
  Warnings:

  - You are about to drop the `CourseModule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CourseModule";

-- CreateTable
CREATE TABLE "_CourseToModule" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToModule_AB_unique" ON "_CourseToModule"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToModule_B_index" ON "_CourseToModule"("B");
