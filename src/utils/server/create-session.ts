"use server";

import { prisma } from "@/utils/prisma/prisma";

import { google } from "@ai-sdk/google";
import { auth } from "@clerk/nextjs/server";
import { generateText } from "ai";
import { v4 as uuidv4 } from "uuid";

export const createChatSessionAction = async (formData: FormData) => {
  const prompt = formData.get("prompt") as string;
  const model = formData.get("model") as string;

  const session = await createNewChatSession({
    publicId: uuidv4(),
    prompt,
    model
  });

  return session.id;
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
    model: google(model),
    prompt: `
      아래 유저의 입력을 보고, 채팅 세션 제목을 10자 내로 간단하게 만들어줘.
      핵심만 요약할 것.
      
      사용자 입력:
      """${prompt}"""
    `
  });

  return await prisma.chatSession.create({
    data: {
      publicId,
      userId,
      title: title ?? "New Chat",
      model
    }
  });
};
