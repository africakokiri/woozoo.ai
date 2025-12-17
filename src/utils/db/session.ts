"use server";

import { prisma } from "@/utils/prisma/prisma";

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
