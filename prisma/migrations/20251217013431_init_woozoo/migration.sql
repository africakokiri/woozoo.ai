/*
  Warnings:

  - You are about to drop the column `content` on the `ChatMessage` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `ChatMessage` table. All the data in the column will be lost.
  - Added the required column `prompt` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatMessage" DROP COLUMN "content",
DROP COLUMN "role",
ADD COLUMN     "prompt" TEXT NOT NULL;
