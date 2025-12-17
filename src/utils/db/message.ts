"use server";

import { prisma } from "@/utils/prisma/prisma";

type CreateChatMessage = {
  sessionId: string;
  role: "USER" | "ASSISTANT" | "SYSTEM";
  content: any; // MessageContent[]
};

// 메시지를 저장하는 함수
export const createChatMessage = async (data: CreateChatMessage) => {
  return await prisma.chatMessage.create({
    data: {
      sessionId: data.sessionId,
      role: data.role,
      content: data.content
    }
  });
};
