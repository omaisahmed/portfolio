/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Project` table. All the data in the column will be lost.
  - The `tags` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "imageUrl",
ADD COLUMN     "images" TEXT[],
DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[];
