-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'teacher', 'student', 'unassigned');

-- CreateTable
CREATE TABLE "User" (
    "_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "forename" TEXT NOT NULL,
    "middleNames" TEXT,
    "surname" TEXT NOT NULL,
    "letters" TEXT,
    "role" "UserRole" NOT NULL,
    "contactId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Student" (
    "_id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "emergencyContactId" INTEGER,
    "termAddressId" INTEGER,
    "homeAddressId" INTEGER,
    "personalTutorId" INTEGER,
    "courseId" INTEGER,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "_id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Class" (
    "_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "moduleId" INTEGER,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Course" (
    "_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "websiteURL" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Module" (
    "_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "websiteURL" TEXT,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "moduleId" INTEGER NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Section" (
    "_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "unitId" INTEGER NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "StudentClasses" (
    "_id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,

    CONSTRAINT "StudentClasses_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "TeacherClasses" (
    "_id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,

    CONSTRAINT "TeacherClasses_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "CourseModules" (
    "_id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "moduleId" INTEGER NOT NULL,

    CONSTRAINT "CourseModules_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "SectionResources" (
    "_id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "resourceId" INTEGER NOT NULL,

    CONSTRAINT "SectionResources_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "UnitResources" (
    "_id" SERIAL NOT NULL,
    "unitId" INTEGER NOT NULL,
    "resourceId" INTEGER NOT NULL,

    CONSTRAINT "UnitResources_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Address" (
    "_id" SERIAL NOT NULL,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "town" TEXT,
    "stateCounty" TEXT,
    "zipPostCode" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "_id" SERIAL NOT NULL,
    "label" TEXT,
    "email" TEXT,
    "mobile" TEXT,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_emergencyContactId_key" ON "Student"("emergencyContactId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_termAddressId_key" ON "Student"("termAddressId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_homeAddressId_key" ON "Student"("homeAddressId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_userId_key" ON "Teacher"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_addressId_key" ON "Teacher"("addressId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_emergencyContactId_fkey" FOREIGN KEY ("emergencyContactId") REFERENCES "Contact"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_termAddressId_fkey" FOREIGN KEY ("termAddressId") REFERENCES "Address"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_homeAddressId_fkey" FOREIGN KEY ("homeAddressId") REFERENCES "Address"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_personalTutorId_fkey" FOREIGN KEY ("personalTutorId") REFERENCES "Teacher"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentClasses" ADD CONSTRAINT "StudentClasses_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentClasses" ADD CONSTRAINT "StudentClasses_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherClasses" ADD CONSTRAINT "TeacherClasses_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherClasses" ADD CONSTRAINT "TeacherClasses_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseModules" ADD CONSTRAINT "CourseModules_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseModules" ADD CONSTRAINT "CourseModules_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionResources" ADD CONSTRAINT "SectionResources_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionResources" ADD CONSTRAINT "SectionResources_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitResources" ADD CONSTRAINT "UnitResources_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitResources" ADD CONSTRAINT "UnitResources_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
