/**
 * Route: /
 * Description: 로그인 여부에 따라 세션 이동
 */
import InitialSession from "@/app/(sessions)/_initial-session";
import SignedOutSession from "@/app/(sessions)/_signed-out-session";

import { auth } from "@clerk/nextjs/server";

export default async function mainPage() {
  const { isAuthenticated } = await auth();

  return <>{isAuthenticated ? <InitialSession /> : <SignedOutSession />}</>;
}
