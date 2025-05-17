/*
  Warnings:

  - You are about to drop the column `resumeUrl` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "resumeUrl",
ADD COLUMN     "facebookUrl" TEXT,
ADD COLUMN     "instagramUrl" TEXT,
ADD COLUMN     "personalWebsite" TEXT,
ADD COLUMN     "twitterUrl" TEXT,
ADD COLUMN     "whatsappNumber" TEXT;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "tags" SET NOT NULL,
ALTER COLUMN "tags" SET DATA TYPE TEXT;
