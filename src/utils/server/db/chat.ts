"use server";

import { prisma } from "@/utils/prisma/prisma";
import { generateChatTitle } from "@/utils/server/ai/generate-chat-title";
import { createChatSessionSchema } from "@/utils/server/db/chat.schema";

import { auth } from "@clerk/nextjs/server";

export const createChatSession = async (input: unknown) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const data = createChatSessionSchema.parse(input);

  let title: string | null = null;

  try {
    title = await generateChatTitle({
      model: data.model,
      prompt: data.title
    });
  } catch {
    title = data.title.slice(0, 20);
  }

  const session = await prisma.chatSession.create({
    data: {
      userId,
      title: data.title,
      model: data.model
    }
  });

  return session;
};
