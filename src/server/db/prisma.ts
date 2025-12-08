"use server";

import { prisma } from "@/libs/prisma/prisma";

import { google } from "@ai-sdk/google";
import { auth } from "@clerk/nextjs/server";
import { generateText } from "ai";

export const createUser = async ({ clerkUserId, email }: { clerkUserId: string; email: string }) => {
  return await prisma.user.create({
    data: {
      id: clerkUserId,
      email
    }
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
    model: google("gemini-2.5-flash"),
    prompt: `
      아래 유저의 입력을 보고, 채팅 세션 제목을 10자 내로 간단하게 만들어줘.
      친절하고 깔끔하게, 핵심만 요약할 것.
      
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

export const getSessionByPublicId = async ({ publicId }: { publicId: string }) => {
  console.log("============================================================");
  console.log(publicId);
  console.log("============================================================");

  return prisma.chatSession.findUnique({
    where: { publicId },
    include: {
      messages: {
        orderBy: { createdAt: "asc" }
      }
    }
  });
};
