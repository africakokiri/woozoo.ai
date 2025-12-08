"use server";

import { createNewChatSession } from "@/server/db/prisma";

import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export const startNewChat = async (formData: FormData) => {
  const prompt = formData.get("prompt") as string;

  const publicId = uuidv4();
  const model = "gemini-2.5-flash";

  await createNewChatSession({
    publicId,
    prompt,
    model
  });

  redirect(`/chat/${publicId}?p=${prompt}`);
};
