/**
 * Route: /
 * Description: 로그인 여부에 따라 세션 이동
 */
import InitialSession from "@/app/(sessions)/initial-session";
import SignedOutSession from "@/app/(sessions)/signed-out-session";
import Sidebar from "@/components/sidebar/sidebar";

import { auth } from "@clerk/nextjs/server";

export default async function mainPage() {
  const { isAuthenticated } = await auth();

  return (
    <div className="flex">
      <Sidebar />

      {isAuthenticated ? <InitialSession /> : <SignedOutSession />}
    </div>
  );
}
