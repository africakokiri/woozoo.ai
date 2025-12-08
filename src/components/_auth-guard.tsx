"use client";

import Chat from "@/components/_chat";
import Thread from "@/components/thread/_thread";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/ui/dialog";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { AssistantChatTransport, useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function AuthGuard() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  return <>{isSignedIn ? <Chat /> : <NotSignedIn />}</>;
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
          <DarkmodeSwitch />

          <Dialog>
            <DialogTrigger asChild>
              <SignInButton
                mode="modal"
                appearance={{
                  elements: {
                    modalBackdrop: "flex items-center!",
                    modalCloseButton: "ring-0!"
                  }
                }}
                forceRedirectUrl="/"
              >
                <Button>Sign in</Button>
              </SignInButton>
            </DialogTrigger>

            <DialogContent className="max-w-[402px]! border-none bg-transparent p-0 shadow-none">
              <DialogHeader className="sr-only">
                <DialogTitle>Sign in</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </header>

        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
};

const DarkmodeSwitch = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
};
