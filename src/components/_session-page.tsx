"use client";

import Thread from "@/components/thread/_thread";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useAssistantApi } from "@assistant-ui/react";
import { AssistantChatTransport, useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SessionPage() {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({
      api: "/api/chat",
      body: () => ({
        model: "gemini-2.5-flash"
      })
    })
  });

  return (
    <div>
      <AssistantRuntimeProvider runtime={runtime}>
        <FirstPromptInit />

        <div className="h-dvh">
          <Thread />
        </div>
      </AssistantRuntimeProvider>
    </div>
  );
}

const FirstPromptInit = () => {
  const api = useAssistantApi();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams<{ publicId: string }>();
  const sentRef = useRef(false);

  useEffect(() => {
    const prompt = searchParams.get("p");
    if (!prompt || sentRef.current) return;

    sentRef.current = true;

    // 1. composer 텍스트 세팅
    api.composer().setText(prompt);

    // 2. 보내기 (실질적인 sendMessage 역할)
    api.composer().send();

    // 3. URL 정리 (쿼리 제거)
    router.replace(`/chat/${params.publicId}`);
  }, [api, searchParams, router, params.publicId]);

  return null;
};
