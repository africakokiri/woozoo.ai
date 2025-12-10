-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatSessionId_fkey";

-- DropForeignKey
ALTER TABLE "TokenUsage" DROP CONSTRAINT "TokenUsage_chatSessionId_fkey";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatSessionId_fkey" FOREIGN KEY ("chatSessionId") REFERENCES "ChatSession"("publicId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TokenUsage" ADD CONSTRAINT "TokenUsage_chatSessionId_fkey" FOREIGN KEY ("chatSessionId") REFERENCES "ChatSession"("publicId") ON DELETE RESTRICT ON UPDATE CASCADE;
