"use client";

import { createChatSession } from "@/utils/db/session";

import { useAuth } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ChatPageClientSideRenderer() {
  const { userId } = useAuth();
  const router = useRouter();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (!userId || params.id) return;

    (async () => {
      const session = await createChatSession({
        userId,
        title: "새 대화",
        model: "gemini-2.5-flash-lite"
      });

      router.push(`/chat/${session.id}`);
    })();
  }, [userId, router, params]);

  return null;
}
