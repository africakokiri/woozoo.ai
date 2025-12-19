"use client";

import { Thread } from "@/components/assistant-ui/thread";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/ui/dialog";
import { cn } from "@/utils/tailwind/cn";
import { useSidebarStore } from "@/utils/zustand/use-sidebar-store";

import { SignInButton } from "@clerk/nextjs";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThreadClientSideRenderer({ isAuthenticated }: { isAuthenticated: boolean }) {
  const { isSidebarRendered } = useSidebarStore();

  const { theme, setTheme } = useTheme();

  if (!isSidebarRendered) return null;

  return (
    <div className="h-dvh">
      <header
        className={cn("fixed z-10 flex w-full justify-end gap-4 p-4", isAuthenticated && "hidden")}
      >
        <Button
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
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

          <DialogContent>
            <DialogHeader className="sr-only">
              <DialogTitle>Sign in</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </header>

      <Thread />
    </div>
  );
}
