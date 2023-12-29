-- CreateTable
CREATE TABLE "_ModuleToTeacher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ModuleToTeacher_AB_unique" ON "_ModuleToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_ModuleToTeacher_B_index" ON "_ModuleToTeacher"("B");
