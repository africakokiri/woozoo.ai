/*
  Warnings:

  - You are about to drop the column `prompt` on the `ChatMessage` table. All the data in the column will be lost.
  - Added the required column `content` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatMessage" DROP COLUMN "prompt",
ADD COLUMN     "content" JSONB NOT NULL,
ADD COLUMN     "role" "ChatRole" NOT NULL;
