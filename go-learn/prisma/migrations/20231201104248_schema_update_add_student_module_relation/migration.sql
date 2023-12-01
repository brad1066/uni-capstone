-- CreateTable
CREATE TABLE "StudentModules" (
    "_id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "moduleId" INTEGER NOT NULL,

    CONSTRAINT "StudentModules_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "StudentModules" ADD CONSTRAINT "StudentModules_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentModules" ADD CONSTRAINT "StudentModules_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
