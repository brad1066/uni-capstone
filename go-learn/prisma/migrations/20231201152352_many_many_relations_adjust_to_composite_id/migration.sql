/*
  Warnings:

  - The primary key for the `CourseModules` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `CourseModules` table. All the data in the column will be lost.
  - The primary key for the `SectionResources` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `SectionResources` table. All the data in the column will be lost.
  - The primary key for the `StudentModules` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `StudentModules` table. All the data in the column will be lost.
  - The primary key for the `UnitResources` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `UnitResources` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CourseModules" DROP CONSTRAINT "CourseModules_pkey",
DROP COLUMN "_id",
ADD CONSTRAINT "CourseModules_pkey" PRIMARY KEY ("courseId", "moduleId");

-- AlterTable
ALTER TABLE "SectionResources" DROP CONSTRAINT "SectionResources_pkey",
DROP COLUMN "_id",
ADD CONSTRAINT "SectionResources_pkey" PRIMARY KEY ("sectionId", "resourceId");

-- AlterTable
ALTER TABLE "StudentModules" DROP CONSTRAINT "StudentModules_pkey",
DROP COLUMN "_id",
ADD CONSTRAINT "StudentModules_pkey" PRIMARY KEY ("studentId", "moduleId");

-- AlterTable
ALTER TABLE "UnitResources" DROP CONSTRAINT "UnitResources_pkey",
DROP COLUMN "_id",
ADD CONSTRAINT "UnitResources_pkey" PRIMARY KEY ("unitId", "resourceId");
