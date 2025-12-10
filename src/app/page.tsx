import { createUserIfNotExist } from "@/utils/server/prisma";

import { auth } from "@clerk/nextjs/server";

export default async function mainPage() {
  const { isAuthenticated } = await auth();

  await createUserIfNotExist();
}
