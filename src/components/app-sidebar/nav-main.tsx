"use client";

import { Button } from "@/ui/button";
import { TooltipButton } from "@/ui/tooltip-button";
import { cn } from "@/utils/shadcn/cn";

import { Search, SquarePen } from "lucide-react";

export const NavMain = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  return (
    <div className="space-y-4">
      <ul className="space-y-1">
        {["New chats", "Search chats"].map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="flex w-full items-center gap-2 px-2 text-sm"
          >
            {isSidebarOpen ? (
              <Button
                variant="ghost"
                size="sm"
                className="flex w-full justify-start px-4!"
              >
                {i === 0 ? <SquarePen /> : <Search />}
                <span className="font-normal">{item}</span>
              </Button>
            ) : (
              <TooltipButton
                tooltipMessage={item}
                aria-label={item}
              >
                {i === 0 ? <SquarePen aria-hidden={true} /> : <Search aria-hidden={true} />}
              </TooltipButton>
            )}
          </li>
        ))}
      </ul>

      <div className={cn("px-4", !isSidebarOpen && "hidden")}>
        <h2 className="text-muted-foreground/70 px-4 text-sm font-normal">Chat histories</h2>
      </div>
    </div>
  );
};
