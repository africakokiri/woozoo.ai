/*
  Warnings:

  - You are about to drop the column `defaultModel` on the `ChatSession` table. All the data in the column will be lost.
  - Added the required column `model` to the `ChatSession` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `ChatSession` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ChatSession" DROP COLUMN "defaultModel",
ADD COLUMN     "model" TEXT NOT NULL,
ALTER COLUMN "title" SET NOT NULL;
