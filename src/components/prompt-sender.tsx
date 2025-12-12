"use client";

import { useChatRuntimeInstance } from "@/context/chat-runtime-provider";
import { usePromptStore } from "@/context/store";
import logger from "@/utils/debug/logger";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useAssistantApi } from "@assistant-ui/react";
import { useEffect, useRef } from "react";

export default function PromptSender({ children }: { children: React.ReactNode }) {
  const runtime = useChatRuntimeInstance();

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
      <PromptSenderCore />
    </AssistantRuntimeProvider>
  );
}

const PromptSenderCore = () => {
  const { prompt } = usePromptStore();
  const sent = useRef(false);
  const api = useAssistantApi();

  useEffect(() => {
    if (sent.current) return;

    logger({
      message: "heo"
    });

    sent.current = true;

    api.composer().setText(prompt);
    api.composer().send();
  }, [api]);

  return null;
};
