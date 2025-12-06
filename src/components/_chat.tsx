"use client";

import { AppSidebar } from "@/components/app-sidebar/_app-sidebar";
import { NavTrigger } from "@/components/app-sidebar/nav-trigger";
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
        <AppSidebar />

        <SidebarInset>
          <NavTrigger />
          <Thread />
        </SidebarInset>
      </SidebarProvider>
    </AssistantRuntimeProvider>
  );
}
