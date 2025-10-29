/*
  Warnings:

  - You are about to drop the column `postiton` on the `Node` table. All the data in the column will be lost.
  - Added the required column `position` to the `Node` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Node" DROP COLUMN "postiton",
ADD COLUMN     "position" JSONB NOT NULL;
