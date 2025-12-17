"use server";

import { prisma } from "@/utils/prisma/prisma";
import { generateChatTitle } from "@/utils/server/ai/generate-chat-title";

import { auth } from "@clerk/nextjs/server";

// 메시지 저장
export const createChatSession = async ({ model, prompt }: { model: string; prompt: string }) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const title = await generateChatTitle({
    model,
    prompt
  });

  const session = await prisma.chatSession.create({
    data: {
      userId,
      title,
      model
    }
  });

  return session;
};

// 세션과 메시지 조회
export const getChatSession = async (sessionId: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  return await prisma.chatSession.findUnique({
    where: {
      id: sessionId,
      userId // 본인의 세션만
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc"
        }
      }
    }
  });
};

// 메시지 생성
export const createChatMessage = async ({
  sessionId,
  prompt
}: {
  sessionId: string;
  prompt: string;
}) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  // 세션이 본인 것인지 확인
  const session = await prisma.chatSession.findFirst({
    where: {
      id: sessionId,
      userId
    }
  });

  if (!session) throw new Error("Session not found or unauthorized");

  return await prisma.chatMessage.create({
    data: {
      sessionId,
      prompt
    }
  });
};
