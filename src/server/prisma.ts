"use server";

import { prisma } from "@/utils/prisma/prisma";

import { google } from "@ai-sdk/google";
import { auth, currentUser } from "@clerk/nextjs/server";
import { generateText } from "ai";

export const createUserIfNotExist = async () => {
  const user = await currentUser();

  if (!user) return null;

  await prisma.user.upsert({
    where: { id: user.id },
    create: {
      id: user.id,
      email: user.emailAddresses[0].emailAddress
    },
    update: {}
  });
};

export const createNewChatSession = async ({
  publicId,
  prompt,
  model
}: {
  publicId: string;
  prompt: string;
  model: string;
}) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const { text: title } = await generateText({
    model: google("gemini-2.5.-flash"),
    prompt: `
      아래 유저의 입력을 보고, 채팅 세션 제목을 10자 내로 간단하게 만들어줘.
      핵심만 요약할 것.
      
      사용자 입력:
      """${prompt}"""
    `
  });

  await prisma.chatSession.create({
    data: {
      publicId,
      userId,
      title: title ?? "New Chat",
      model
    }
  });
};
