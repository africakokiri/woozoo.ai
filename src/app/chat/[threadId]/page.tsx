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
    api.threads().switchToThread(params.threadId);
  }, [params.threadId, api]);

  return null;
}
