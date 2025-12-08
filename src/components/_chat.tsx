"use client";

import AppSidebar from "@/components/app-sidebar/_app-sidebar";
import { Thread } from "@/components/thread/_thread";
import { SidebarInset, SidebarProvider } from "@/ui/sidebar";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { AssistantChatTransport, useChatRuntime } from "@assistant-ui/react-ai-sdk";

export default function Chat() {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({
      api: "/api/chat",
      body: () => ({
        model: "modelRef.current,  // 동적으로 모델 전달",
        temperature: 0.7,
        max_tokens: 100
      })
    })
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset>
          <Thread />
        </SidebarInset>
      </SidebarProvider>
    </AssistantRuntimeProvider>
  );
}
