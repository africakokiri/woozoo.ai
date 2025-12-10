"use client";

import Sidebar from "@/components/sidebar/sidebar";
import { useGlobalConfigStore } from "@/libs/zustand/store";
import { useChatRuntimeInstance } from "@/providers/chat-runtime-provider";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import React from "react";

const Session = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const SignedInSession = () => {
  const { isSidebarRendered } = useGlobalConfigStore();

  const runtime = useChatRuntimeInstance();

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <Sidebar />

      <div className="flex h-dvh w-dvw items-end">{isSidebarRendered && <Composer />}</div>
    </AssistantRuntimeProvider>
  );
};

export default Session;
