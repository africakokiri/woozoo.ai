import Session from "@/components/session";
import { createUserIfNotExist } from "@/server/prisma";

import { auth } from "@clerk/nextjs/server";

export default async function mainPage() {
  const { isAuthenticated } = await auth();
  await createUserIfNotExist();

  return <Session isAuthenticated={isAuthenticated} />;
}
