/**
 * - Google Generative AI Provider
 * https://ai-sdk.dev/providers/ai-sdk-providers/google-generative-ai
 *
 * - streamText
 * https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text#to-ui-message-stream-response.response-init%20&%20ui-message-stream-options
 */
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export async function POST(res: Response) {
  // model은 나중에 사용
  const { messages, model } = await res.json();

  const stream = streamText({
    model: google("gemini-2.5-flash-lite"),
    messages
  });

  return stream.toUIMessageStreamResponse;
}
