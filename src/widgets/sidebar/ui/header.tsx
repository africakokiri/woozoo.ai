"use client";

import { useGlobalConfigStore } from "@/shared/libs/zustand/use-global-config-store";
import { Button } from "@/shared/ui/button";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Image from "next/image";

export const Header = () => {
  const { isSidebarOpen, toggleSidebar } = useGlobalConfigStore();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <Image
          className="size-12"
          src="/icons/main.svg"
          alt="WooZoo main logo"
          width={48}
          height={48}
        />

        <span className="text-3xl font-light tracking-tight">WooZoo</span>
      </div>

      <Button
        variant="ghost"
        className="size-12"
        onClick={() => toggleSidebar()}
      >
        {isSidebarOpen ? <ChevronsLeft /> : <ChevronsRight />}
      </Button>
    </div>
  );
};
