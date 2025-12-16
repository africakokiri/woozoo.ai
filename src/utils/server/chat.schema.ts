import { z } from "zod";

export const createChatSessionSchema = z.object({
  title: z.string().min(1)
});

export type CreateChatSessionInput = z.infer<typeof createChatSessionSchema>;
