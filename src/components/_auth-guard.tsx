"use client";

import { useUser } from "@clerk/nextjs";

export default function AuthGuard() {
  const { isSignedIn } = useUser();

  return <>{isSignedIn ? <div></div> : <div></div>}</>;
}
