-- DropForeignKey
ALTER TABLE "CourseModules" DROP CONSTRAINT "CourseModules_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseModules" DROP CONSTRAINT "CourseModules_moduleId_fkey";

-- AddForeignKey
ALTER TABLE "CourseModules" ADD CONSTRAINT "CourseModules_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseModules" ADD CONSTRAINT "CourseModules_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
