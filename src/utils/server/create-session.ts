"use server";

import logger from "@/utils/debug/logger";
import { prisma } from "@/utils/prisma/prisma";

import { google } from "@ai-sdk/google";
import { auth } from "@clerk/nextjs/server";
import { generateText } from "ai";

export const createChatSessionAction = async (formData: FormData) => {
  const prompt = formData.get("prompt");
  const model = formData.get("model");

  const { userId } = await auth();

  console.log(userId);
  logger({
    message: prompt + " " + model
  });
};

const createNewChatSession = async ({
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
