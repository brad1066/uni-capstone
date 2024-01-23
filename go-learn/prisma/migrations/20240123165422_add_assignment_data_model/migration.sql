-- CreateTable
CREATE TABLE "Assignment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" TIMESTAMP(3),
    "unitId" TEXT NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AssignmentToResource" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Assignment_unitId_idx" ON "Assignment"("unitId");

-- CreateIndex
CREATE UNIQUE INDEX "_AssignmentToResource_AB_unique" ON "_AssignmentToResource"("A", "B");

-- CreateIndex
CREATE INDEX "_AssignmentToResource_B_index" ON "_AssignmentToResource"("B");
