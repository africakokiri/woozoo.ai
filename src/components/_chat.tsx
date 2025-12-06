"use client";

import TokenHeader from "@/components/_token-header";
import AppSidebar from "@/components/app-sidebar/_app-sidebar";
import { Thread } from "@/components/thread/_thread";
import { SidebarInset, SidebarProvider } from "@/ui/sidebar";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { AssistantChatTransport, useChatRuntime } from "@assistant-ui/react-ai-sdk";

export default function Chat() {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({
      api: "/api/chat"
    })
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <SidebarProvider>
        <div className="flex h-dvh w-full flex-col">
          <AppSidebar />

          <SidebarInset>
            <TokenHeader />
            <Thread />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AssistantRuntimeProvider>
  );
}
