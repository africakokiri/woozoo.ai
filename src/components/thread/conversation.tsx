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
  }, [prompt, sendMessage]);

  return (
    <div className="space-y-10">
      {messages.map((m) => {
        return (
          <div key={m.id}>
            {m.parts.map((part, index) =>
              part.type === "text" && part.text !== "" ? (
                <div
                  key={index}
                  className="flex"
                >
                  {m.role === "user" && <div className="min-w-1/4 flex-1 bg-white" />}

                  <div
                    className={cn(
                      "flex w-full pb-24 whitespace-pre-wrap",
                      m.role === "user" &&
                        "bg-muted border-muted-foreground ml-auto w-fit rounded-lg px-3 py-1.5"
                    )}
                  >
                    {part.text}
                  </div>
                </div>
              ) : null
            )}
          </div>
        );
      })}
    </div>
  );
};
