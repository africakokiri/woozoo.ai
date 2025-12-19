"use client";

import { cn } from "@/utils/shadcn/cn";
import { useGlobalDataStore } from "@/utils/zustand/store";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect } from "react";

export const Conversation = () => {
  const { prompt } = useGlobalDataStore();
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat" // 기본값도 /api/chat
    })
  });

  useEffect(() => {
    sendMessage({ text: prompt });
  }, [prompt]);

  return (
    <div className="space-y-10">
      {messages.map((m) => {
        return (
          <div key={m.id}>
            {m.parts.map((part, index) =>
              part.type === "text" && part.text !== "" ? (
                <div
                  key={index}
                  className={cn("flex w-full", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  {part.text}
                </div>
              ) : null
            )}
          </div>
        );
      })}
    </div>
  );
};
