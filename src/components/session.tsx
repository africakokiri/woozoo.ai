"use client";

import { Thread } from "@/components/assistant-ui/thread";
import { useChatRuntimeInstance } from "@/context/chat-runtime-provider";
import { useGlobalConfigStore } from "@/context/store";
import { Button } from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { SignInButton } from "@clerk/nextjs";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Session = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const runtime = useChatRuntimeInstance();

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {isAuthenticated ? <Session.SignedIn /> : <Session.SignedOut />}
    </AssistantRuntimeProvider>
  );
};

const SignedIn = () => {
  const { isSidebarRendered } = useGlobalConfigStore();

  return <div className="h-dvh">{isSidebarRendered && <Thread />}</div>;
};

const SignedOut = () => {
  return (
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
  );
};

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

Session.SignedIn = SignedIn;
Session.SignedOut = SignedOut;

export default Session as typeof Session & {
  SignedIn: typeof SignedIn;
  SignedOut: typeof SignedOut;
};
