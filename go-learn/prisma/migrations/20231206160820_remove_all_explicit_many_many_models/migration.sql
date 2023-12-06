/*
  Warnings:

  - You are about to drop the `SectionResource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentModule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UnitResource` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SectionResource";

-- DropTable
DROP TABLE "StudentModule";

-- DropTable
DROP TABLE "UnitResource";

-- CreateTable
CREATE TABLE "_ModuleToStudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ResourceToUnit" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ResourceToSection" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ModuleToStudent_AB_unique" ON "_ModuleToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_ModuleToStudent_B_index" ON "_ModuleToStudent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ResourceToUnit_AB_unique" ON "_ResourceToUnit"("A", "B");

-- CreateIndex
CREATE INDEX "_ResourceToUnit_B_index" ON "_ResourceToUnit"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ResourceToSection_AB_unique" ON "_ResourceToSection"("A", "B");

-- CreateIndex
CREATE INDEX "_ResourceToSection_B_index" ON "_ResourceToSection"("B");
