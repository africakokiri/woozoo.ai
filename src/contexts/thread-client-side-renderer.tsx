"use client";

import { Thread } from "@/components/assistant-ui/thread";
import { useChatRuntimeInstance } from "@/contexts/chat-runtime-context";
import { useGlobalConfigStore } from "@/utils/zustand/use-global-config";

import { AssistantRuntimeProvider, useAssistantApi } from "@assistant-ui/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ThreadClientSideRenderer() {
  const { isSidebarRendered } = useGlobalConfigStore();
  const runtime = useChatRuntimeInstance();

  if (!isSidebarRendered) return null;

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <Thread />
      <ThreadClientSideRendererSwitchThread />
    </AssistantRuntimeProvider>
  );
}

const ThreadClientSideRendererSwitchThread = () => {
  const pathname = usePathname();
  const api = useAssistantApi();

  useEffect(() => {
    if (pathname === "/") {
      setTimeout(() => {
        api.threads().switchToNewThread();
      }, 0);
    }
  }, [pathname, api]);

  return null;
};
