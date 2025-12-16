import { z } from "zod";

export const recordTokenUsageSchema = z.object({
  sessionId: z.uuidv4(),
  provider: z.enum(["OPENAI", "ANTHROPIC", "GOOGLE"]),
  model: z.string(),
  promptTokens: z.number().int().nonnegative(),
  completionTokens: z.number().int().nonnegative(),
  costCredits: z.number().int().positive()
});

export type RecordTokenUsageInput = z.infer<typeof recordTokenUsageSchema>;
