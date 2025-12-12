"use client";

import { Thread } from "@/components/assistant-ui/thread";
import { useChatRuntimeInstance } from "@/contexts/chat-runtime-context";
import { useGlobalConfigStore } from "@/utils/zustand/use-global-config";

import { AssistantRuntimeProvider } from "@assistant-ui/react";

export default function ThreadClientSideRenderer() {
  const { isSidebarRendered } = useGlobalConfigStore();
  const runtime = useChatRuntimeInstance();

  if (!isSidebarRendered) return null;

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <Thread />
    </AssistantRuntimeProvider>
  );
}
