"use client";

import { Button } from "@/ui/button";
import { cn } from "@/utils/shadcn/cn";

import { ChevronsLeft, ChevronsRight, Search, SquarePen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function AppSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <aside className={cn("bg-sidebar border-r", isSidebarOpen ? "w-72" : "w-16")}>
      <header
        className={cn(
          "flex w-full items-center justify-between p-4",
          !isSidebarOpen && "justify-center"
        )}
      >
        <div className={cn("flex items-center gap-2", !isSidebarOpen && "hidden")}>
          <Image
            src="/icons/woozoo.svg"
            alt=""
            width={32}
            height={32}
            className="dark:invert"
          />

          <span className="text-lg font-light">WooZoo</span>
        </div>

        <Button
          variant="ghost"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <ChevronsRight strokeWidth={1.5} /> : <ChevronsLeft strokeWidth={1.5} />}
        </Button>
      </header>

      <nav aria-label="chat menu">
        <ul className="space-y-1">
          {["New chats", "Search chats"].map((item, i) => (
            <li
              key={`${item}-${i}`}
              className="flex w-full items-center gap-2 px-2 text-sm [&_svg]:h-5 [&_svg]:w-5
[&_svg]:stroke-[1.5]"
            >
              <Button
                variant="ghost"
                size="sm"
                className="flex w-full justify-start px-4!"
              >
                {i === 0 ? <SquarePen /> : <Search />}
                <span className={cn("font-normal", !isSidebarOpen && "sr-only")}>{item}</span>
              </Button>
            </li>
          ))}
        </ul>

        <ul></ul>
      </nav>

      <footer></footer>
    </aside>
  );
}
