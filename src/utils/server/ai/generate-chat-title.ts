import { google } from "@ai-sdk/google";
import { streamText } from "ai";

const TITLE_SYSTEM_PROMPT = `
You are a title generator for chat sessions.

Rules:
- The title must describe an action, not just a topic
- Do not output a single noun
- Use a short verb phrase
- Maximum 10 Korean characters or 6 English words
- Do not include punctuation or quotation marks
- Output only the title text
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
