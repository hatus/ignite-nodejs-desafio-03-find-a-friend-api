/*
  Warnings:

  - You are about to drop the column `petId` on the `pet_photos` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `petId` on the `requirements` table. All the data in the column will be lost.
  - Added the required column `pet_id` to the `pet_photos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pet_id` to the `requirements` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pet_photos" DROP CONSTRAINT "pet_photos_petId_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "requirements" DROP CONSTRAINT "requirements_petId_fkey";

-- AlterTable
ALTER TABLE "pet_photos" DROP COLUMN "petId",
ADD COLUMN     "pet_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "organizationId",
ADD COLUMN     "organization_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "requirements" DROP COLUMN "petId",
ADD COLUMN     "pet_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_photos" ADD CONSTRAINT "pet_photos_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requirements" ADD CONSTRAINT "requirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
