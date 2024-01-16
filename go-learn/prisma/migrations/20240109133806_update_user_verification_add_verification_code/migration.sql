/*
  Warnings:

  - Added the required column `verificationCode` to the `UserVerification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserVerification" ADD COLUMN     "verificationCode" TEXT NOT NULL;
