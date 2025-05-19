/*
  Warnings:

  - You are about to drop the column `credentialId` on the `Certification` table. All the data in the column will be lost.
  - You are about to drop the column `field` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `gpa` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Experience` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Certification" DROP COLUMN "credentialId";

-- AlterTable
ALTER TABLE "Education" DROP COLUMN "field",
DROP COLUMN "gpa";

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "location";
