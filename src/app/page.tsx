import Session from "@/components/session";
import { prisma } from "@/utils/prisma/prisma";

import { auth, currentUser } from "@clerk/nextjs/server";

export default async function mainPage() {
  const { isAuthenticated } = await auth();

  await createUserIfNotExist();

  return <Session isAuthenticated={isAuthenticated} />;
}

const createUserIfNotExist = async () => {
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
