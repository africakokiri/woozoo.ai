"use server";

import { prisma } from "@/utils/prisma/prisma";
import { recordTokenUsageSchema } from "@/utils/server/credit.schema";

import { auth } from "@clerk/nextjs/server";

export const recordTokenUsage = async (input: unknown) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const data = recordTokenUsageSchema.parse(input);

  return prisma.$transaction(async (tx) => {
    const tokenUsage = await tx.tokenUsage.create({
      data: {
        userId,
        sessionId: data.sessionId,
        provider: data.provider,
        model: data.model,
        promptTokens: data.promptTokens,
        completionTokens: data.completionTokens,
        totalTokens: data.promptTokens + data.completionTokens,
        costCredits: data.costCredits
      }
    });

    await tx.creditLedger.create({
      data: {
        userId,
        type: "SPEND",
        amount: -data.costCredits,
        tokenUsageId: tokenUsage.id
      }
    });

    await tx.user.update({
      where: { id: userId },
      data: {
        currentCredits: {
          decrement: data.costCredits
        }
      }
    });

    return tokenUsage;
  });
};
