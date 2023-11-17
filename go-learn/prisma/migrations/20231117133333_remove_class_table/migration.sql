/*
  Warnings:

  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentClasses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeacherClasses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "StudentClasses" DROP CONSTRAINT "StudentClasses_classId_fkey";

-- DropForeignKey
ALTER TABLE "StudentClasses" DROP CONSTRAINT "StudentClasses_studentId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherClasses" DROP CONSTRAINT "TeacherClasses_classId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherClasses" DROP CONSTRAINT "TeacherClasses_teacherId_fkey";

-- DropTable
DROP TABLE "Class";

-- DropTable
DROP TABLE "StudentClasses";

-- DropTable
DROP TABLE "TeacherClasses";
