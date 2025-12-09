"use client";

/**
 * Route: /
 * Description: 로그인 한 사용자가 보는 세션
 */
import { Thread } from "@/components/assistant-ui/thread";
import Sidebar from "@/components/sidebar/sidebar";
import { useGlobalConfigStore } from "@/libs/zustand/store";
import { useChatRuntimeInstance } from "@/providers/chat-runtime-provider";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useEffect } from "react";

export default function InitialSession() {
  const { isSidebarRendered } = useGlobalConfigStore();

  const runtime = useChatRuntimeInstance();

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <Sidebar />

      <div className="h-dvh w-dvw">{isSidebarRendered && <Thread />}</div>
    </AssistantRuntimeProvider>
  );
}
