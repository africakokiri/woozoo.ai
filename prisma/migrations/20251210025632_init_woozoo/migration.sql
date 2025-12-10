/*
  Warnings:

  - You are about to drop the column `description` on the `CreditLedger` table. All the data in the column will be lost.
  - Made the column `title` on table `ChatSession` required. This step will fail if there are existing NULL values in that column.
  - Made the column `model` on table `ChatSession` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ChatSession" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "model" SET NOT NULL;

-- AlterTable
ALTER TABLE "CreditLedger" DROP COLUMN "description";
