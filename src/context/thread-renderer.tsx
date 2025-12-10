"use client";

import { Thread } from "@/components/assistant-ui/thread";
import { useChatRuntimeInstance } from "@/context/chat-runtime-provider";
import { useGlobalConfigStore } from "@/context/store";

import { AssistantRuntimeProvider } from "@assistant-ui/react";

export default function ThreadRenderer() {
  const { isSidebarRendered } = useGlobalConfigStore();

  const runtime = useChatRuntimeInstance();

  if (!isSidebarRendered) return null;

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <Thread />
    </AssistantRuntimeProvider>
  );
}
