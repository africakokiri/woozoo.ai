"use client";

import { useGlobalConfigStore } from "@/shared/libs/zustand/use-global-config-store";
import { Button } from "@/shared/ui/button";
import { motionVars } from "@/widgets/sidebar/model/motion";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

export const Header = () => {
  const { isSidebarOpen, toggleSidebar } = useGlobalConfigStore();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <Image
          className="min-h-12 min-w-12"
          src="/icons/main.svg"
          alt="WooZoo main logo"
          width={48}
          height={48}
        />

        <AnimatePresence initial={false}>
          {isSidebarOpen && (
            <motion.span
              variants={motionVars}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="text-3xl font-light tracking-tight"
            >
              WooZoo
            </motion.span>
          )}
        </AnimatePresence>
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
