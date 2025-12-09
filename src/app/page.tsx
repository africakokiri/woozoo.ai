/**
 * Route: /
 * Description: 로그인 여부에 따라 세션 이동
 */
import InitialSession from "@/app/(sessions)/initial-session";
import SignedOutSession from "@/app/(sessions)/signed-out-session";
import { createUserIfNotExist } from "@/server/prisma";

import { auth } from "@clerk/nextjs/server";

export default async function mainPage() {
  const { isAuthenticated } = await auth();
  await createUserIfNotExist();

  return <div className="flex">{isAuthenticated ? <InitialSession /> : <SignedOutSession />}</div>;
}
