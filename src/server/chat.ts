"use server";

import { prisma } from "@/libs/prisma/prisma";

import { google } from "@ai-sdk/google";
import { auth } from "@clerk/nextjs/server";
import { generateText } from "ai";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export const startNewChat = async (formData: FormData) => {
  const { userId } = await auth();

  if (!userId) return;

  const prompt = formData.get("prompt") as string;
  if (!prompt.trim()) throw new Error("Invalid prompt");

  const { text: title } = await generateText({
    model: google("gemini-2.5.-flash"),
    prompt: `
      아래 유저의 입력을 보고, 채팅 세션 제목을 10자 내로 간단하게 만들어줘.
      핵심만 요약할 것.
      
      사용자 입력:
      """${prompt}"""
    `
  });

  const session = await prisma.chatSession.create({
    data: {
      userId,
      publicId: uuidv4(),
      title: title ?? "New Chat"
    }
  });

  await prisma.message.create({
    data: {
      chatSessionId: session.id,
      role: "USER",
      content: prompt
    }
  });

  redirect(`/chat/${session.id}?p=${encodeURIComponent(prompt)}`);
};
