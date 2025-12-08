"use client";

import Thread from "@/components/thread/_thread";

import { AssistantRuntimeProvider, type ThreadMessageLike } from "@assistant-ui/react";
import { useDataStreamRuntime } from "@assistant-ui/react-data-stream";

type ClientChatPageProps = {
  publicId: string;
  model: string;
  initialMessages: {
    id: string;
    role: "USER" | "ASSISTANT" | "SYSTEM";
    content: string;
  }[];
};

export default function ClientChatPage({ publicId, model, initialMessages }: ClientChatPageProps) {
  const formattedMessages: ThreadMessageLike[] = initialMessages.map((m) => ({
    id: m.id,
    role: m.role.toLowerCase() as ThreadMessageLike["role"],
    content: [
      {
        type: "text",
        text: m.content
      }
    ]
  }));

  const runtime = useDataStreamRuntime({
    initialMessages: formattedMessages,
    api: "/api/chat",
    body: {
      model,
      sessionId: publicId
    }
  });
  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <Thread />
    </AssistantRuntimeProvider>
  );
}
