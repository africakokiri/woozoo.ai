"use client";

import { cn } from "@/shared/libs/tw/cn";
import { useGlobalConfigStore } from "@/shared/libs/zustand/use-global-config-store";
import { Button } from "@/shared/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

import { Plus } from "lucide-react";
import Link from "next/link";

export const Nav = () => {
  const { isSidebarOpen } = useGlobalConfigStore();

  return (
    <div className="space-y-2">
      {isSidebarOpen ? (
        <Button
          variant={isSidebarOpen ? "default" : "ghost"}
          className={cn("w-full", !isSidebarOpen && "h-12")}
          size="sm"
          asChild
        >
          <span>New chat</span>
        </Button>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isSidebarOpen ? "default" : "ghost"}
              className={cn("w-full", !isSidebarOpen && "h-12")}
              size="sm"
              asChild
            >
              <Link href="/">
                <Plus />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>New chat</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};
