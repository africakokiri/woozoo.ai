"use server";

import { createNewChatSession } from "@/server/prisma";

import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export const startNewChat = async (formData: FormData) => {
  const prompt = formData.get("prompt") as string;

  const publicId = uuidv4();

  await createNewChatSession({
    publicId,
    prompt,
    model: "gemini-2.5-flash-lite"
  });

  redirect(`/chat/${publicId}?p=${prompt}`);
};
