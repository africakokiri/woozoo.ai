"use server";

import { createNewChatSession } from "@/server/db/prisma";

import { redirect } from "next/navigation";

export const startNewChat = async (formData: FormData) => {
  "use server";

  const prompt = formData.get("prompt") as string;

  const publicId = crypto.randomUUID();
  const model = "gemini-2.5-flash";

  await createNewChatSession({
    publicId,
    prompt,
    model
  });

  redirect(`/chat/${publicId}?p=${encodeURIComponent(prompt)}`);
};
