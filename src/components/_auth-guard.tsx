"use client";

import { Thread } from "@/components/thread/_thread";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/ui/dialog";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { AssistantChatTransport, useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { SignIn, useUser } from "@clerk/nextjs";

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
        <header className="fixed z-10 flex w-full justify-end gap-4 p-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">Sign in</Button>
            </DialogTrigger>

            <DialogContent className="max-w-[402px]! border-none bg-transparent p-0 shadow-none">
              <DialogHeader className="sr-only">
                <DialogTitle>Sign In</DialogTitle>
              </DialogHeader>

              <SignIn />
            </DialogContent>
          </Dialog>
        </header>

        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
};
