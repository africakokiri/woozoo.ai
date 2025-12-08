"use server";

import { prisma } from "@/libs/prisma/prisma";

import { auth } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

export const createUser = async ({ clerkUserId, email }: { clerkUserId: string; email: string }) => {
  return await prisma.user.create({
    data: {
      id: clerkUserId,
      email
    }
  });
};

export const createNewChatSession = async () => {
  const userId = await auth();

  if (!userId) throw new Error("Unauthorized");

  const session = await prisma.chatSession.create({
    data: {
      userId: userId.userId ?? "",
      publicId: randomUUID(),
      title: "New Chat",
      model: "gemini-flash-2.5"
    }
  });

  redirect(`/chat/${session.publicId}`);
};
