"use client";

import { Button } from "@/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { cn } from "@/utils/shadcn/cn";

import { ChevronsLeft, ChevronsRight, Search, SquarePen } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

export default function AppSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.aside
      initial={{ width: "288" }}
      animate={{
        width: isSidebarOpen ? 288 : 64
      }}
      transition={{ type: "spring", stiffness: 350, damping: 40, bounce: 0 }}
      className="bg-sidebar border-r"
    >
      <header className="flex w-full items-center justify-between p-4">
        <div className="flex items-center gap-2">
          {isHover ? (
            <TooltipButton
              onClick={() => {
                setIsSidebarOpen(!isSidebarOpen);
                setIsHover(false);
              }}
              className="flex h-8 w-8 items-center justify-center"
              onMouseLeave={() => setIsHover(false)}
              aria-label="Open sidebar"
              tooltipMessage="Open sidebar"
            >
              <ChevronsRight aria-hidden={true} />
            </TooltipButton>
          ) : (
            <Image
              src="/icons/woozoo.svg"
              alt="WooZoo logo"
              width={32}
              height={32}
              onMouseEnter={() => !isSidebarOpen && setIsHover(true)}
              className="h-8! w-8! dark:invert"
            />
          )}

          <span className={cn("text-lg font-light", !isSidebarOpen && "hidden")}>WooZoo</span>
        </div>

        {isSidebarOpen && (
          <TooltipButton
            aria-label="Close sidebar"
            tooltipMessage="Close sidebar"
            className="flex h-8 w-8 items-center justify-center"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <ChevronsLeft />
          </TooltipButton>
        )}
      </header>

      <nav aria-label="chat menu">
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
                  {item}
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

        <ul></ul>
      </nav>

      <footer></footer>
    </motion.aside>
  );
}

type TooltipButtonProps = {
  children: string | React.ReactNode;
  tooltipMessage: string;
  className?: string;
} & React.ComponentProps<typeof Button>;

const TooltipButton = ({ children, tooltipMessage, className, ...props }: TooltipButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn("flex w-full justify-start px-4!", className)}
          {...props}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{tooltipMessage}</p>
      </TooltipContent>
    </Tooltip>
  );
};
