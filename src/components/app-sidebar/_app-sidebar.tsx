"use client";

import { NavHeader } from "@/components/app-sidebar/nav-header";
import { Button } from "@/ui/button";

import { Search, SquarePen } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function AppSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <motion.aside
      initial={{ width: "288" }}
      animate={{
        width: isSidebarOpen ? 288 : 64
      }}
      transition={{ type: "spring", stiffness: 350, damping: 40, bounce: 0 }}
      className="bg-sidebar border-r"
    >
      <NavHeader
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

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
