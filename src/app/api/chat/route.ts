import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, model } = await req.json();

  const modelInstance = google("gemini-1.5-pro");

  const result = streamText({
    model: modelInstance,
    messages: convertToModelMessages(messages)
  });

  console.log("================================================================");
  console.log(result);
  console.log(messages);
  console.log("================================================================");

  return result.toUIMessageStreamResponse();
}
