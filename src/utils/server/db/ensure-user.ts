"use server";

import { prisma } from "@/utils/prisma/prisma";

import { type User, auth } from "@clerk/nextjs/server";

export const ensureUser = async (clerkUser: User | null) => {
  const { userId } = await auth();

  if (!userId) return null;

  const existing = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (existing) return existing;

  return prisma.user.create({
    data: {
      id: userId,
      email: clerkUser?.emailAddresses[0]?.emailAddress,
      displayName: clerkUser?.username ?? clerkUser?.firstName ?? null,
      imageUrl: clerkUser?.imageUrl ?? null,
      currentCredits: 0
    }
  });
};
