"use client";

import { cn } from "@/shared/libs/tw/cn";
import { useGlobalConfigStore } from "@/shared/libs/zustand/use-global-config-store";
import { Button } from "@/shared/ui/button";

import { Plus } from "lucide-react";
import Link from "next/link";

export const Nav = () => {
  const { isSidebarOpen } = useGlobalConfigStore();

  return (
    <div className="space-y-2">
      <Button
        variant={isSidebarOpen ? "default" : "ghost"}
        className={cn("w-full", !isSidebarOpen && "h-12")}
        size="sm"
        asChild
      >
        <Link href="/">{isSidebarOpen ? <span>New chat</span> : <Plus />}</Link>
      </Button>
    </div>
  );
};
