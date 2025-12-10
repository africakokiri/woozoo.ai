"use server";

import { prisma } from "@/libs/prisma/prisma";

import { google } from "@ai-sdk/google";
import { auth } from "@clerk/nextjs/server";
import { generateText } from "ai";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export const startNewChat = async ({ prompt, model }: { prompt: string; model: string }) => {
  const { userId } = await auth();

  if (!userId) return;

  const { text: title } = await generateText({
    model: google(model),
    prompt: `
      Based on the user's input below, create a simple chat session title within 10 characters.
      Summarize only the core meaning.

      User input:
      """${prompt}"""
    `
  });

  const publicId = uuidv4();

  const session = await prisma.chatSession.create({
    data: {
      userId,
      publicId: publicId,
      title: title ?? "New Chat",
      model
    }
  });

  await prisma.message.create({
    data: {
      chatSessionId: session.id,
      role: "USER",
      content: prompt
    }
  });

  redirect(`/chat/${publicId}`);
};
