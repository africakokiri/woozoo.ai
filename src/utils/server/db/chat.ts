"use server";

import { prisma } from "@/utils/prisma/prisma";
import { createChatSessionSchema } from "@/utils/server/db/chat.schema";

import { auth } from "@clerk/nextjs/server";

const TITLE_SYSTEM_PROMPT = `
You are a title generator for chat sessions.
Summarize the user's input into a concise title.
Rules:
- Maximum 10 characters (Korean) or 6 words (English)
- Do not include punctuation
- Do not include quotation marks
- Only output the title text
`;

export const createChatSession = async (input: unknown) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const data = createChatSessionSchema.parse(input);

  const session = await prisma.chatSession.create({
    data: {
      userId,
      title: data.title,
      model: data.model
    }
  });

  return session;
};
