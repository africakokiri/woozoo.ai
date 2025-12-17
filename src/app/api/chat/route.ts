import { google } from "@ai-sdk/google";
import { auth } from "@clerk/nextjs/server";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { messages } = await req.json();

  const result = streamText({
    model: google("gemini-2.5-flash-lite"),
    messages: convertToModelMessages(messages)
  });

  return result.toTextStreamResponse();
}
