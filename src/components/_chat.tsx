"use client";

import AppSidebar from "@/components/app-sidebar/_app-sidebar";
import { Thread } from "@/components/thread/_thread";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { AssistantChatTransport, useChatRuntime } from "@assistant-ui/react-ai-sdk";

export default function Chat() {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({
      api: "/api/chat",
      body: () => ({
        model: "gemini-2.5-pro"
      })
    })
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="flex">
        <AppSidebar />

        <div className="h-dvh w-dvw">
          <Thread />
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
}
