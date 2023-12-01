/*
  Warnings:

  - You are about to drop the `CourseModules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SectionResources` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentModules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UnitResources` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseModules" DROP CONSTRAINT "CourseModules_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseModules" DROP CONSTRAINT "CourseModules_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "SectionResources" DROP CONSTRAINT "SectionResources_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "SectionResources" DROP CONSTRAINT "SectionResources_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "StudentModules" DROP CONSTRAINT "StudentModules_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "StudentModules" DROP CONSTRAINT "StudentModules_studentId_fkey";

-- DropForeignKey
ALTER TABLE "UnitResources" DROP CONSTRAINT "UnitResources_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "UnitResources" DROP CONSTRAINT "UnitResources_unitId_fkey";

-- DropTable
DROP TABLE "CourseModules";

-- DropTable
DROP TABLE "SectionResources";

-- DropTable
DROP TABLE "StudentModules";

-- DropTable
DROP TABLE "UnitResources";

-- CreateTable
CREATE TABLE "CourseModule" (
    "courseId" INTEGER NOT NULL,
    "moduleId" INTEGER NOT NULL,

    CONSTRAINT "CourseModule_pkey" PRIMARY KEY ("courseId","moduleId")
);

-- CreateTable
CREATE TABLE "StudentModule" (
    "studentId" INTEGER NOT NULL,
    "moduleId" INTEGER NOT NULL,

    CONSTRAINT "StudentModule_pkey" PRIMARY KEY ("studentId","moduleId")
);

-- CreateTable
CREATE TABLE "SectionResource" (
    "sectionId" INTEGER NOT NULL,
    "resourceId" INTEGER NOT NULL,

    CONSTRAINT "SectionResource_pkey" PRIMARY KEY ("sectionId","resourceId")
);

-- CreateTable
CREATE TABLE "UnitResource" (
    "unitId" INTEGER NOT NULL,
    "resourceId" INTEGER NOT NULL,

    CONSTRAINT "UnitResource_pkey" PRIMARY KEY ("unitId","resourceId")
);

-- AddForeignKey
ALTER TABLE "CourseModule" ADD CONSTRAINT "CourseModule_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseModule" ADD CONSTRAINT "CourseModule_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentModule" ADD CONSTRAINT "StudentModule_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentModule" ADD CONSTRAINT "StudentModule_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionResource" ADD CONSTRAINT "SectionResource_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionResource" ADD CONSTRAINT "SectionResource_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitResource" ADD CONSTRAINT "UnitResource_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitResource" ADD CONSTRAINT "UnitResource_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
