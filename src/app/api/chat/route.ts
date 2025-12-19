/**
 * - Google Generative AI Provider
 * https://ai-sdk.dev/providers/ai-sdk-providers/google-generative-ai
 *
 * - streamText
 * https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text#to-ui-message-stream-response.response-init%20&%20ui-message-stream-options
 *
 * - Chatbot Tool Usage
 * https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-tool-usage
 *
 * - Chatbot
 * https://ai-sdk.dev/docs/ai-sdk-ui/chatbot
 */
import { google } from "@ai-sdk/google";
import { type UIMessage, convertToModelMessages, streamText } from "ai";

// maxDuration만큼 요청이 살아있을 수 있다.
// maxDuration 안에 모든 응답이 생성되어야 한다 X -> 첫 응답이 시작되어야 한다 O
export const runtime = "edge";
export const maxDuration = 30;

export async function POST(res: Response) {
  // model은 나중에 사용
  const { messages }: { messages: UIMessage[] } = await res.json();

  const result = streamText({
    model: google("gemini-2.5-flash"),
    // useChat에서 가져온 UI 메시지 배열을 AI 함수(streamText, generateText 등)에서 사용할 수 있는 ModelMessage 배열로 반환한다.
    messages: convertToModelMessages(messages)
  });

  return result.toUIMessageStreamResponse();
}
