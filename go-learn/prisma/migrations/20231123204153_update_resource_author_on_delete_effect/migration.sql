-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_authorUsername_fkey";

-- AlterTable
ALTER TABLE "Resource" ALTER COLUMN "authorUsername" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_authorUsername_fkey" FOREIGN KEY ("authorUsername") REFERENCES "User"("username") ON DELETE SET NULL ON UPDATE CASCADE;
