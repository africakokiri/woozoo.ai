"use client";

import { AssistantCloud, AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";

export function RuntimeProvider({ children }: { children: React.ReactNode }) {
  const cloud = new AssistantCloud({
    baseUrl: process.env.NEXT_PUBLIC_ASSISTANT_BASE_URL!,
    anonymous: true
  });

  const runtime = useChatRuntime({ cloud });

  return <AssistantRuntimeProvider runtime={runtime}>{children}</AssistantRuntimeProvider>;
}
