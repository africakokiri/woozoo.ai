"use client";

/**
 * Route: /
 * Description: 로그인하지 않은 사용자가 보는 세션
 */
import { Thread } from "@/components/assistant-ui/thread";
import { Button } from "@/ui/button";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { AssistantChatTransport, useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { SignInButton } from "@clerk/nextjs";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function SignedOutSession() {
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
        </header>
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
}

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
