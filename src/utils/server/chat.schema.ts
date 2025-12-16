import { MODELS_GOOGLE } from "@/constants/models";

import { z } from "zod";

export const createChatSessionSchema = z.object({
  title: z.string().min(1),
  model: z.enum(MODELS_GOOGLE.map((m) => m.id) as [string, ...string[]])
});

export type CreateChatSessionInput = z.infer<typeof createChatSessionSchema>;
