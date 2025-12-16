"use server";

import { prisma } from "@/utils/prisma/prisma";
import { createChatSessionSchema } from "@/utils/server/chat.schema";

import { auth } from "@clerk/nextjs/server";

export const createChatSession = async (input: unknown) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const data = createChatSessionSchema.parse(input);

  const session = await prisma.chatSession.create({
    data: {
      userId,
      title: data.title
    }
  });

  return session;
};
