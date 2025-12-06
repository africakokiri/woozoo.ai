"use client";

import { Button } from "@/ui/button";
import { useSidebar } from "@/ui/sidebar";

import { ChevronsLeft, ChevronsRight } from "lucide-react";

export const NavTrigger = () => {
  const { open, setOpen } = useSidebar();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-3">
        <Button
          variant="ghost"
          className="z-20 h-10 w-10"
          onClick={() => setOpen(!open)}
        >
          {!open ? <ChevronsRight strokeWidth={1.5} /> : <ChevronsLeft strokeWidth={1.5} />}
        </Button>
      </div>
    </header>
  );
};
