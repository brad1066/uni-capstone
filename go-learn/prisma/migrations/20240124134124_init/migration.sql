-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'teacher', 'student', 'unassigned');

-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "forename" TEXT NOT NULL,
    "middleNames" TEXT,
    "surname" TEXT NOT NULL,
    "letters" TEXT,
    "role" "UserRole" NOT NULL,
    "contactId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "emergencyContactId" TEXT,
    "termAddressId" TEXT,
    "homeAddressId" TEXT,
    "courseId" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "addressId" TEXT,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "websiteURL" TEXT,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "websiteURL" TEXT,
    "courseId" TEXT,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" TIMESTAMP(3),
    "moduleId" TEXT,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "unitId" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorUsername" TEXT,
    "unitId" TEXT NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Upload" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "publicURL" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "resourceId" TEXT,

    CONSTRAINT "Upload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "authorUsername" TEXT,
    "assignmentId" TEXT NOT NULL,
    "uploadId" TEXT NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "town" TEXT,
    "stateCounty" TEXT,
    "zipPostCode" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "label" TEXT,
    "email" TEXT,
    "mobile" TEXT,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSession" (
    "id" TEXT NOT NULL,
    "cookieValue" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,

    CONSTRAINT "UserSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserVerification" (
    "id" TEXT NOT NULL,
    "verificationCode" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "username" TEXT NOT NULL,

    CONSTRAINT "UserVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ModuleToStudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ModuleToTeacher" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AssignmentToResource" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ResourceToSection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "contactId" ON "User"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_username_key" ON "Student"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Student_emergencyContactId_key" ON "Student"("emergencyContactId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_termAddressId_key" ON "Student"("termAddressId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_homeAddressId_key" ON "Student"("homeAddressId");

-- CreateIndex
CREATE INDEX "Student_courseId_idx" ON "Student"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_username_key" ON "Teacher"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_addressId_key" ON "Teacher"("addressId");

-- CreateIndex
CREATE INDEX "Module_courseId_idx" ON "Module"("courseId");

-- CreateIndex
CREATE INDEX "Assignment_moduleId_idx" ON "Assignment"("moduleId");

-- CreateIndex
CREATE INDEX "Unit_moduleId_idx" ON "Unit"("moduleId");

-- CreateIndex
CREATE INDEX "Section_unitId_idx" ON "Section"("unitId");

-- CreateIndex
CREATE INDEX "Resource_authorUsername_idx" ON "Resource"("authorUsername");

-- CreateIndex
CREATE INDEX "Resource_unitId_idx" ON "Resource"("unitId");

-- CreateIndex
CREATE INDEX "Upload_resourceId_idx" ON "Upload"("resourceId");

-- CreateIndex
CREATE INDEX "Submission_authorUsername_idx" ON "Submission"("authorUsername");

-- CreateIndex
CREATE INDEX "Submission_assignmentId_idx" ON "Submission"("assignmentId");

-- CreateIndex
CREATE INDEX "Submission_uploadId_idx" ON "Submission"("uploadId");

-- CreateIndex
CREATE INDEX "UserSession_username_idx" ON "UserSession"("username");

-- CreateIndex
CREATE INDEX "UserVerification_username_idx" ON "UserVerification"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_ModuleToStudent_AB_unique" ON "_ModuleToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_ModuleToStudent_B_index" ON "_ModuleToStudent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ModuleToTeacher_AB_unique" ON "_ModuleToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_ModuleToTeacher_B_index" ON "_ModuleToTeacher"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AssignmentToResource_AB_unique" ON "_AssignmentToResource"("A", "B");

-- CreateIndex
CREATE INDEX "_AssignmentToResource_B_index" ON "_AssignmentToResource"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ResourceToSection_AB_unique" ON "_ResourceToSection"("A", "B");

-- CreateIndex
CREATE INDEX "_ResourceToSection_B_index" ON "_ResourceToSection"("B");
