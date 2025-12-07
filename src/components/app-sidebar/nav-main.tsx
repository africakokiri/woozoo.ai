"use client";

import { TooltipButton } from "@/ui/tooltip-button";
import { cn } from "@/utils/shadcn/cn";

import { Search, SquarePen } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export const NavMain = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  return (
    <div className="space-y-4">
      <ul className="space-y-1">
        {["New chats", "Search chats"].map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="flex w-full items-center px-2 text-sm"
          >
            <TooltipButton
              tooltipMessage={item}
              aria-label={item}
              className="gap-2"
              disableTooltip={isSidebarOpen}
            >
              {i === 0 ? <SquarePen aria-hidden={true} /> : <Search aria-hidden={true} />}

              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span
                    key="nav-main-tools-text-out"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-normal"
                  >
                    {item}
                  </motion.span>
                )}
              </AnimatePresence>
            </TooltipButton>
          </li>
        ))}
      </ul>

      <div className={cn("px-4", !isSidebarOpen && "hidden")}>
        <h2 className="text-muted-foreground/70 px-4 text-sm font-normal">Chat histories</h2>
      </div>
    </div>
  );
};
