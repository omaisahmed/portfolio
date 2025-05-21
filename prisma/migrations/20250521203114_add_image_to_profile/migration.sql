/*
  Warnings:

  - You are about to drop the column `message` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `read` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `Contact` table. All the data in the column will be lost.
  - Added the required column `description` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `Contact` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `image` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "message",
DROP COLUMN "read",
DROP COLUMN "subject",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "facebookUrl" TEXT,
ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "instagramUrl" TEXT,
ADD COLUMN     "linkedinUrl" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "twitterUrl" TEXT,
ADD COLUMN     "whatsappNumber" TEXT,
ALTER COLUMN "phone" SET NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "image" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);
