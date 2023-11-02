/*
  Warnings:

  - You are about to drop the column `cookieKey` on the `UserSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSession" DROP COLUMN "cookieKey";
