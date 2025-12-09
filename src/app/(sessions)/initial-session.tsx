"use client";

/**
 * Route: /
 * Description: 로그인 한 사용자가 보는 세션
 */
import { Thread } from "@/components/assistant-ui/thread";
import { useChatRuntimeInstance } from "@/providers/chat-runtime-provider";

import { AssistantRuntimeProvider } from "@assistant-ui/react";

export default function InitialSession() {
  const runtime = useChatRuntimeInstance();

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="h-dvh w-dvw">
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
}
