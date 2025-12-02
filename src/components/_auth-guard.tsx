"use client";

import { Thread } from "@/components/thread/_thread";
import { Button } from "@/ui/button";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { AssistantChatTransport, useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { useUser } from "@clerk/nextjs";

export default function AuthGuard() {
  const { isSignedIn } = useUser();

  return <>{isSignedIn ? <div></div> : <NotSignedIn />}</>;
}

const NotSignedIn = () => {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({
      api: "/api/chat"
    })
  });
  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="h-dvh">
        <header className="fixed flex w-full justify-end gap-4 p-4">
          <Button
            size="sm"
            variant="outline"
          >
            Sign in
          </Button>
          <Button size="sm">Sign up</Button>
        </header>

        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
};
