"use client";

import { createChatSession } from "@/utils/db/session";

import { useAssistantState } from "@assistant-ui/react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainPageClientSideRenderer() {
  const { userId } = useAuth();
  const router = useRouter();
  const isRunning = useAssistantState(({ thread }) => thread.isRunning);

  useEffect(() => {
    if (!userId || !isRunning) return;

    createChatSession({
      userId,
      title: "새 대화",
      model: "gemini-2.5-flash-lite"
    }).then((session) => {
      router.push(`/chat/${session.id}`);
    });
  }, [userId, router, isRunning]);

  return null;
}
