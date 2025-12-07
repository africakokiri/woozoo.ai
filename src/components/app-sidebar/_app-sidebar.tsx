"use client";

import { Button } from "@/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { cn } from "@/utils/shadcn/cn";

import { ChevronsLeft, ChevronsRight, Search, SquarePen } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AppSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    console.log(isHover);
  }, [isHover]);

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
            <Button
              variant="ghost"
              className="flex h-8 w-8 items-center justify-center"
              onMouseLeave={() => setIsHover(false)}
              onClick={() => {
                setIsSidebarOpen(!isSidebarOpen);
                setIsHover(false);
              }}
            >
              <ChevronsRight />
            </Button>
          ) : (
            <Image
              src="/icons/woozoo.svg"
              alt=""
              width={32}
              height={32}
              onMouseEnter={() => !isSidebarOpen && setIsHover(true)}
              className="h-8! w-8! dark:invert"
            />
          )}

          <span className={cn("text-lg font-light", !isSidebarOpen && "hidden")}>WooZoo</span>
        </div>

        {isSidebarOpen && (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={cn("h-8 w-8", !isSidebarOpen && "hidden")}
              >
                {isSidebarOpen && <ChevronsLeft />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Close sidebar</p>
            </TooltipContent>
          </Tooltip>
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
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex w-full justify-start px-4!"
                    >
                      {i === 0 ? <SquarePen /> : <Search />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item}</p>
                  </TooltipContent>
                </Tooltip>
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
