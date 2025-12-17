"use server";

import { prisma } from "@/utils/prisma/prisma";

import { auth } from "@clerk/nextjs/server";

type CreateChatSession = {
  userId: string;
  title: string;
  model: string;
};

// 새로운 채팅 세션을 생성하는 함수
export const createChatSession = async (data: CreateChatSession) => {
  return await prisma.chatSession.create({
    data: {
      userId: data.userId,
      title: data.title,
      model: data.model
    }
  });
};
// 세션을 조회하는 함수
export const getSessionId = async (sessionId: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  return await prisma.chatSession.findFirst({
    where: {
      id: sessionId,
      userId // 본인 세션만
    },
    include: {
      messages: {
        orderBy: { createdAt: "asc" }
      }
    }
  });
};
