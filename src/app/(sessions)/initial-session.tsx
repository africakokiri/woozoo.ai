"use client";

import { Composer } from "@/components/assistant-ui/composer";
import { useGlobalConfigStore } from "@/libs/zustand/store";
import { useChatRuntimeInstance } from "@/providers/chat-runtime-provider";

import { AssistantRuntimeProvider } from "@assistant-ui/react";

export default function InitialSession() {
  const { isSidebarRendered } = useGlobalConfigStore();

  const runtime = useChatRuntimeInstance();

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="flex h-dvh w-dvw items-end">{isSidebarRendered && <Composer />}</div>
    </AssistantRuntimeProvider>
  );
}
