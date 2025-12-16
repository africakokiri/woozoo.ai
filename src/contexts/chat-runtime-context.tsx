"use client";

import { type AssistantRuntime } from "@assistant-ui/react";
import { AssistantChatTransport, useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { createContext, useContext } from "react";

const ChatRuntimeContext = createContext<AssistantRuntime | null>(null);

export default function ChatRuntimeProvider({ children }: { children: React.ReactNode }) {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({
      api: "/api/chat"
    })
  });

  return <ChatRuntimeContext.Provider value={runtime}>{children}</ChatRuntimeContext.Provider>;
}

export function useChatRuntimeInstance() {
  const ctx = useContext(ChatRuntimeContext);

  if (!ctx) {
    throw new Error("Undefined: ChatRuntimeProvider");
  }

  return ctx;
}
