"use client";

import { Thread } from "@/components/assistant-ui/thread";
import { useChatRuntimeInstance } from "@/contexts/chat-runtime-context";
import { logger } from "@/utils/debug/logger";

import { type AssistantRuntime, AssistantRuntimeProvider, useAssistantApi } from "@assistant-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PromptSender() {
  const runtime = useChatRuntimeInstance();

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <Thread />
      <PromptSenderCore runtime={runtime} />
    </AssistantRuntimeProvider>
  );
}

const PromptSenderCore = ({ runtime }: { runtime: AssistantRuntime }) => {
  const api = useAssistantApi();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [hasSentPrompt, setHasSentPrompt] = useState(false);

  useEffect(() => {
    if (!runtime || hasSentPrompt) return;

    const promptParam = searchParams.get("p") as string;

    logger.str("PromptSender UseEffect 실행됨");
    logger.str(`전송할 메시지: ${decodeURIComponent(promptParam)}`);

    api.composer().setText(decodeURIComponent(promptParam));
    api.composer().send();

    setHasSentPrompt(true);
  }, [searchParams, api, router, hasSentPrompt]);

  return null;
};
