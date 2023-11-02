/*
  Warnings:

  - You are about to drop the column `userId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Teacher` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_userId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_userId_fkey";

-- DropIndex
DROP INDEX "Student_userId_key";

-- DropIndex
DROP INDEX "Teacher_userId_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "userId",
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "userId",
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "_id",
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("username");

-- CreateIndex
CREATE UNIQUE INDEX "Student_username_key" ON "Student"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_username_key" ON "Teacher"("username");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
