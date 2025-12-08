"use server";

import { prisma } from "@/libs/prisma/prisma";

import { auth } from "@clerk/nextjs/server";

export const createUser = async ({ clerkUserId, email }: { clerkUserId: string; email: string }) => {
  return await prisma.user.create({
    data: {
      id: clerkUserId,
      email
    }
  });
};

export const createNewChatSession = async (publicId: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  await prisma.chatSession.create({
    data: {
      publicId,
      userId,
      title: "New Chat",
      model: "gemini-flash-2.5"
    }
  });
};
