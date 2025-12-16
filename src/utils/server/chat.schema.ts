import { z } from "zod";

export const createChatSessionSchema = z.object({
  title: z.string().min(1).max(50).optional()
});

export type CreateChatSessionInput = z.infer<typeof createChatSessionSchema>;
