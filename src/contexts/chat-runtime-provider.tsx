"use client";

import { createChatMessage } from "@/utils/db/message";
import { getSessionId } from "@/utils/db/session";

import {
  AssistantRuntimeProvider,
  type ChatModelAdapter,
  type ThreadHistoryAdapter,
  useLocalRuntime
} from "@assistant-ui/react";
import { useParams } from "next/navigation";
import { useMemo } from "react";

// ModelAdapter는 서버 API 호출만 담당
const MyModelAdapter: ChatModelAdapter = {
  async *run({ messages, abortSignal }) {
    // 서버 API 호출
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content
            .filter((c) => c.type === "text")
            .map((c) => c.text)
            .join("\n")
        }))
      }),
      signal: abortSignal
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let text = "";

    while (reader) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      text += chunk;

      yield {
        content: [{ type: "text", text }]
      };
    }
  }
};

export default function ChatRuntimeProvider({ children }: { children: React.ReactNode }) {
  const params = useParams<{ id?: string }>();
  const sessionId = params.id;

  const historyAdapter = useMemo<ThreadHistoryAdapter>(
    () => ({
      async load() {
        if (!sessionId) return { messages: [] };

        const session = await getSessionId(sessionId);
        if (!session?.messages) return { messages: [] };

        return {
          messages: session.messages.map((msg) => ({
            message: {
              id: msg.id,
              role: msg.role.toLowerCase() as "user" | "assistant" | "system",
              content: msg.content as any
            },
            parentId: null
          }))
        };
      },

      async append({ message }) {
        if (!sessionId) return;

        await createChatMessage({
          sessionId,
          role: message.role.toUpperCase() as "USER" | "ASSISTANT" | "SYSTEM",
          content: message.content
        });
      }
    }),
    [sessionId]
  );

  // Runtime 생성
  const runtime = useLocalRuntime(MyModelAdapter, {
    adapters: {
      history: historyAdapter
    }
  });

  return <AssistantRuntimeProvider runtime={runtime}>{children}</AssistantRuntimeProvider>;
}
