import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, model } = await req.json();

  const modelInstance = google(model ?? "gemini-2.5-flash-lite");

  const result = streamText({
    model: modelInstance,
    messages: convertToModelMessages(messages)
  });

  return result.toUIMessageStreamResponse();
}
