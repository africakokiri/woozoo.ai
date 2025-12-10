"use client";

import { Thread } from "@/components/assistant-ui/thread";
import { useChatRuntimeInstance } from "@/context/chat-runtime-provider";
import { useGlobalConfigStore } from "@/context/store";

import { AssistantRuntimeProvider, useAssistantState } from "@assistant-ui/react";
import { useEffect } from "react";

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

const ThreadDetector = () => {
  const isRunning = useAssistantState(({ thread }) => thread.isRunning);

  useEffect(() => {
    if (isRunning) console.log("!");
  }, [isRunning]);
};
