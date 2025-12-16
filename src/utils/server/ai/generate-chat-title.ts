import { google } from "@ai-sdk/google";
import { streamText } from "ai";

const TITLE_SYSTEM_PROMPT = `
You are a title generator for chat sessions.
Summarize the user's input into a concise title.
Rules:
- Maximum 10 characters (Korean) or 6 words (English)
- Do not include punctuation
- Do not include quotation marks
- Only output the title text
`;

export async function generateChatTitle({
  model,
  prompt
}: {
  model: string;
  prompt: string;
}): Promise<string> {
  const result = await streamText({
    model: google(model),
    messages: [
      { role: "system", content: TITLE_SYSTEM_PROMPT },
      { role: "user", content: prompt }
    ]
  });

  let title = "";

  for await (const chunk of result.textStream) {
    title += chunk;
  }

  return title.trim();
}
