"use client";

/**
 * Route: /
 * Description: 로그인하지 않은 사용자가 보는 세션
 */
import { Thread } from "@/components/assistant-ui/thread";
import { useChatRuntimeInstance } from "@/providers/chat-runtime-provider";
import { Button } from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { SignInButton } from "@clerk/nextjs";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SignedOutSession() {
  const runtime = useChatRuntimeInstance();

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
  const [isMount, setIsMount] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMount(true);
  }, []);

  if (!isMount)
    return (
      <Button size="icon">
        <Skeleton />
      </Button>
    );

  return (
    <Button
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
};
