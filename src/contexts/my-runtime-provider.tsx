"use client";

import { createChatMessage } from "@/utils/db/message";
import {
  archiveChatSession,
  createChatSession,
  deleteChatSession,
  getChatMessages,
  listChatSessions,
  renameChatSession,
  unarchiveChatSession
} from "@/utils/db/session";

import {
  AssistantRuntimeProvider,
  type ChatModelAdapter,
  type unstable_RemoteThreadListAdapter as RemoteThreadListAdapter,
  RuntimeAdapterProvider,
  type ThreadHistoryAdapter,
  useLocalRuntime,
  unstable_useRemoteThreadListRuntime as useRemoteThreadListRuntime,
  useThreadListItem
} from "@assistant-ui/react";
import { useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { useMemo } from "react";

// Model Adapter - API 호출
const MyModelAdapter: ChatModelAdapter = {
  async *run({ messages, abortSignal }) {
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

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let text = "";

    if (!reader) throw new Error("No response body");

    while (true) {
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

// Thread List Adapter
const myThreadListAdapter: RemoteThreadListAdapter = {
  async list() {
    const sessions = await listChatSessions();
    return {
      threads: sessions.map((s) => ({
        status: s.isArchived ? ("archived" as const) : ("regular" as const),
        remoteId: s.id,
        title: s.title || "새 대화"
      }))
    };
  },

  async initialize(threadId) {
    const { user } = await useUser();

    if (!user) throw new Error("Unauthorized");

    const session = await createChatSession({
      userId: user.id,
      title: "새 대화",
      model: "gemini-2.5-flash-lite"
    });

    return { remoteId: session.id };
  },

  async rename(remoteId, newTitle) {
    await renameChatSession(remoteId, newTitle);
  },

  async archive(remoteId) {
    await archiveChatSession(remoteId);
  },

  async unarchive(remoteId) {
    await unarchiveChatSession(remoteId);
  },

  async delete(remoteId) {
    await deleteChatSession(remoteId);
  },

  // Provider 패턴 - 각 thread별 adapters
  unstable_Provider: ({ children }) => {
    const threadListItem = useThreadListItem();
    const remoteId = threadListItem.remoteId;

    const history = useMemo<ThreadHistoryAdapter>(
      () => ({
        async load() {
          if (!remoteId) return { messages: [] };

          const messages = await getChatMessages(remoteId);

          return {
            messages: messages.map((msg) => {
              const role = msg.role.toLowerCase() as "user" | "assistant" | "system";

              return {
                message: {
                  id: msg.id,
                  role,
                  content: (msg.content as any[]).map((item: any) => ({
                    type: "text" as const,
                    text: String(item.text || "")
                  })),
                  createdAt: new Date(msg.createdAt),
                  metadata: { custom: {} },
                  ...(role === "assistant" && {
                    status: { type: "done" as const }
                  })
                },
                parentId: null
              };
            })
          };
        },

        async append({ message }) {
          if (!remoteId) {
            console.warn("Cannot save message - thread not initialized");
            return;
          }

          await createChatMessage({
            sessionId: remoteId,
            role: message.role.toUpperCase() as "USER" | "ASSISTANT" | "SYSTEM",
            content: message.content
          });
        }
      }),
      [remoteId]
    );

    const adapters = useMemo(() => ({ history }), [history]);

    return <RuntimeAdapterProvider adapters={adapters}>{children}</RuntimeAdapterProvider>;
  }
};

export default function ChatRuntimeProvider({ children }: { children: React.ReactNode }) {
  const runtime = useRemoteThreadListRuntime({
    runtimeHook: () => useLocalRuntime(MyModelAdapter),
    adapter: myThreadListAdapter
  });

  return <AssistantRuntimeProvider runtime={runtime}>{children}</AssistantRuntimeProvider>;
}
