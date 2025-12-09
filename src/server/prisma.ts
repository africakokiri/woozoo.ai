"use server";

import { prisma } from "@/libs/prisma/prisma";

import { currentUser } from "@clerk/nextjs/server";

export const upsertUser = async () => {
  const user = await currentUser();

  if (!user) return null;

  await prisma.user.upsert({
    where: { id: user.id },
    create: {
      id: user.id,
      email: user.emailAddresses[0].emailAddress
    },
    update: {}
  });
};
