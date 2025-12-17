"use client";

import { createChatMessage } from "@/utils/db/message";
import { getSessionId } from "@/utils/db/session";

import { google } from "@ai-sdk/google";
import {
  AssistantRuntimeProvider,
  type ChatModelAdapter,
  type ThreadHistoryAdapter,
  useLocalRuntime
} from "@assistant-ui/react";
import { streamText } from "ai";
import { useParams } from "next/navigation";
import { useMemo } from "react";

// ModelAdapter 정의
const MyModelAdapter: ChatModelAdapter = {
  async *run({ messages, abortSignal }) {
    const result = streamText({
      model: google("gemini-2.5-flash-lite"),
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content
          .filter((c) => c.type === "text")
          .map((c) => c.text)
          .join("\n")
      })),
      abortSignal
    });

    let text = "";
    for await (const chunk of result.textStream) {
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
