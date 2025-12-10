"use client";

import { Thread } from "@/components/assistant-ui/thread";
import Sidebar from "@/components/sidebar/sidebar";
import { useChatRuntimeInstance } from "@/providers/chat-runtime-provider";

import { AssistantRuntimeProvider } from "@assistant-ui/react";

export default function ChatSession() {
  const runtime = useChatRuntimeInstance();

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <ChatSessionCore />
    </AssistantRuntimeProvider>
  );
}

const ChatSessionCore = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="h-dvh w-dvw">
        <Thread />
      </div>
    </div>
  );
};
