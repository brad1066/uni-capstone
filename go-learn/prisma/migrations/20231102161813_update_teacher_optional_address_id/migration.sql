-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_addressId_fkey";

-- AlterTable
ALTER TABLE "Teacher" ALTER COLUMN "addressId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
