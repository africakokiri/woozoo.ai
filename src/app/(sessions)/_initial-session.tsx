// Route: /
// Description: 로그인 한 사용자가 보는 세션

"use client";

import { Thread } from "@/components/assistant-ui/thread";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { AssistantChatTransport, useChatRuntime } from "@assistant-ui/react-ai-sdk";

// Route: /
// Description: 로그인 한 사용자가 보는 세션

export default function InitialSession() {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({
      api: "/api/chat"
    })
  });
  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <Thread />
    </AssistantRuntimeProvider>
  );
}
