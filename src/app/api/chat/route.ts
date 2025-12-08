import { vertex } from "@ai-sdk/google-vertex";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: vertex("gemini-2.5-flash-lite"),
    messages: convertToModelMessages(messages)
  });

  return result.toUIMessageStreamResponse();
}
