"use client";

import { useAssistantApi, useAssistantRuntime } from "@assistant-ui/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ChatPage() {
  const params = useParams<{ id: string }>();
  const threadId = params.id;
  const api = useAssistantApi();

  useEffect(() => {
    if (!threadId) return;

    console.log("Switching to thread:", threadId);

    // URL의 threadId로 runtime 전환
    api.threads().switchToThread(threadId);
  }, [threadId, api]);

  return null;
}
