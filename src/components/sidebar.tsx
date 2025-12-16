"use client";

import { Button } from "@/ui/button";
import { cn } from "@/utils/tailwind/cn";
import { useSidebarStore } from "@/utils/zustand/use-sidebar-store";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import * as m from "motion/react-m";
import Image from "next/image";

const Sidebar = () => {
  const { isOpen } = useSidebarStore();

  return (
    <m.aside
      layout
      className={cn(
        "bg-sidebar sticky top-0 left-0 h-screen border-r",
        isOpen ? "w-[289px]" : "w-[81px]"
      )}
    >
      <Sidebar.Header />
    </m.aside>
  );
};

const Header = () => {
  const { isOpen, toggle } = useSidebarStore();

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image
          className="dark:invert"
          src="/icons/main.svg"
          alt="Main logo"
          width={48}
          height={48}
        />
        <h1 className="text-sidebar-foreground text-2xl font-light tracking-tight">WooZoo</h1>
      </div>

      <Button
        variant="ghost"
        className="size-12"
        onClick={() => toggle()}
      >
        {isOpen ? <ChevronsLeft /> : <ChevronsRight />}
      </Button>
    </header>
  );
};

const Nav = () => {};

const User = () => {};

Sidebar.Header = Header;
Sidebar.Nav = Nav;
Sidebar.User = User;

export default Sidebar as typeof Sidebar & {
  Header: typeof Header;
  Nav: typeof Nav;
  User: typeof User;
};
