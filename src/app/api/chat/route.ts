import logger from "@/utils/debug/logger";

import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google("gemini-2.5-flash-lite"),
    messages: convertToModelMessages(messages)
  });

  logger({
    message: "!"
  });
  logger({
    message: messages
  });

  return result.toUIMessageStreamResponse();
}
