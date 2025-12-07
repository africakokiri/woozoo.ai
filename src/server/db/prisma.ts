"use server";

import { prisma } from "@/libs/prisma/prisma";

export const createUser = async ({ clerkUserId, email }: { clerkUserId: string; email: string }) => {
  return await prisma.user.create({
    data: {
      id: clerkUserId,
      email
    }
  });
};
