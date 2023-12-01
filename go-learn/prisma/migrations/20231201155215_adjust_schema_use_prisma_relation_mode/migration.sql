-- DropForeignKey
ALTER TABLE "CourseModule" DROP CONSTRAINT "CourseModule_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseModule" DROP CONSTRAINT "CourseModule_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_authorUsername_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_unitId_fkey";

-- DropForeignKey
ALTER TABLE "SectionResource" DROP CONSTRAINT "SectionResource_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "SectionResource" DROP CONSTRAINT "SectionResource_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_emergencyContactId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_homeAddressId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_termAddressId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_username_fkey";

-- DropForeignKey
ALTER TABLE "StudentModule" DROP CONSTRAINT "StudentModule_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "StudentModule" DROP CONSTRAINT "StudentModule_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_username_fkey";

-- DropForeignKey
ALTER TABLE "Unit" DROP CONSTRAINT "Unit_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "UnitResource" DROP CONSTRAINT "UnitResource_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "UnitResource" DROP CONSTRAINT "UnitResource_unitId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_contactId_fkey";

-- DropForeignKey
ALTER TABLE "UserSession" DROP CONSTRAINT "UserSession_userUsername_fkey";

-- CreateIndex
CREATE INDEX "CourseModule_courseId_idx" ON "CourseModule"("courseId");

-- CreateIndex
CREATE INDEX "CourseModule_moduleId_idx" ON "CourseModule"("moduleId");

-- CreateIndex
CREATE INDEX "Resource_authorUsername_idx" ON "Resource"("authorUsername");

-- CreateIndex
CREATE INDEX "Section_unitId_idx" ON "Section"("unitId");

-- CreateIndex
CREATE INDEX "SectionResource_sectionId_idx" ON "SectionResource"("sectionId");

-- CreateIndex
CREATE INDEX "SectionResource_resourceId_idx" ON "SectionResource"("resourceId");

-- CreateIndex
CREATE INDEX "Student_courseId_idx" ON "Student"("courseId");

-- CreateIndex
CREATE INDEX "StudentModule_studentId_idx" ON "StudentModule"("studentId");

-- CreateIndex
CREATE INDEX "StudentModule_moduleId_idx" ON "StudentModule"("moduleId");

-- CreateIndex
CREATE INDEX "Unit_moduleId_idx" ON "Unit"("moduleId");

-- CreateIndex
CREATE INDEX "UnitResource_unitId_idx" ON "UnitResource"("unitId");

-- CreateIndex
CREATE INDEX "UnitResource_resourceId_idx" ON "UnitResource"("resourceId");

-- CreateIndex
CREATE INDEX "contactId" ON "User"("contactId");

-- CreateIndex
CREATE INDEX "userUsername" ON "UserSession"("userUsername");
