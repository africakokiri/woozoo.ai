"use client";

import { useAssistantApi } from "@assistant-ui/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ChatThreadPage() {
  return <ChatThreadClient />;
}

function ChatThreadClient() {
  const params = useParams<{ threadId: string }>();
  const api = useAssistantApi();

  useEffect(() => {
    api.threads().switchToThread("thread_0lhDFEaT33j0ZRQJebuZuQK0");
    api.threads().getState().threadIds;
  }, [params.threadId, api]);

  return null;
}
