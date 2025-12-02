"use client";

import { ThreadList } from "@/components/thread-list/_thread-list";
import { Thread } from "@/components/thread/_thread";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { AssistantChatTransport, useChatRuntime } from "@assistant-ui/react-ai-sdk";

export default function Chat() {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({
      api: "/api/chat"
    })
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="flex h-dvh w-full flex-col">
        <ThreadList />
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
}
