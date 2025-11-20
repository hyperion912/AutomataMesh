/*
  Warnings:

  - Added the required column `type` to the `Credential` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Credential" ADD COLUMN     "type" "CredentialType" NOT NULL;
