-- DropForeignKey
ALTER TABLE "CourseModules" DROP CONSTRAINT "CourseModules_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseModules" DROP CONSTRAINT "CourseModules_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_unitId_fkey";

-- DropForeignKey
ALTER TABLE "SectionResources" DROP CONSTRAINT "SectionResources_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "SectionResources" DROP CONSTRAINT "SectionResources_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_emergencyContactId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_homeAddressId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_termAddressId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_username_fkey";

-- DropForeignKey
ALTER TABLE "StudentClasses" DROP CONSTRAINT "StudentClasses_classId_fkey";

-- DropForeignKey
ALTER TABLE "StudentClasses" DROP CONSTRAINT "StudentClasses_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_username_fkey";

-- DropForeignKey
ALTER TABLE "TeacherClasses" DROP CONSTRAINT "TeacherClasses_classId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherClasses" DROP CONSTRAINT "TeacherClasses_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Unit" DROP CONSTRAINT "Unit_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "UnitResources" DROP CONSTRAINT "UnitResources_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "UnitResources" DROP CONSTRAINT "UnitResources_unitId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_contactId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_emergencyContactId_fkey" FOREIGN KEY ("emergencyContactId") REFERENCES "Contact"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_termAddressId_fkey" FOREIGN KEY ("termAddressId") REFERENCES "Address"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_homeAddressId_fkey" FOREIGN KEY ("homeAddressId") REFERENCES "Address"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentClasses" ADD CONSTRAINT "StudentClasses_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentClasses" ADD CONSTRAINT "StudentClasses_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherClasses" ADD CONSTRAINT "TeacherClasses_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherClasses" ADD CONSTRAINT "TeacherClasses_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseModules" ADD CONSTRAINT "CourseModules_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseModules" ADD CONSTRAINT "CourseModules_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionResources" ADD CONSTRAINT "SectionResources_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionResources" ADD CONSTRAINT "SectionResources_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitResources" ADD CONSTRAINT "UnitResources_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitResources" ADD CONSTRAINT "UnitResources_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
