"use client";

import { useGlobalConfigStore } from "@/shared/libs/zustand/use-global-config-store";
import { Button } from "@/shared/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { motionVars } from "@/widgets/sidebar/model/motion";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  const { isSidebarOpen, toggleSidebar } = useGlobalConfigStore();

  const MotionButton = motion.create(Button);

  return (
    <div className="flex items-center justify-between">
      <motion.div
        initial={false}
        animate={{ marginTop: isSidebarOpen ? "0rem" : "4rem" }}
      >
        <Link
          href="/"
          className="flex items-center gap-1"
        >
          {isSidebarOpen ? (
            <Image
              className="min-h-12 min-w-12"
              src="/icons/main.svg"
              alt="WooZoo main logo"
              width={48}
              height={48}
            />
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Image
                  className="min-h-12 min-w-12"
                  src="/icons/main.svg"
                  alt="WooZoo main logo"
                  width={48}
                  height={48}
                />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Go home</p>
              </TooltipContent>
            </Tooltip>
          )}

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
        </Link>
      </motion.div>

      <Tooltip>
        <TooltipTrigger asChild>
          <MotionButton
            variant="ghost"
            className="absolute top-4 right-4 size-12"
            onClick={() => toggleSidebar()}
          >
            {isSidebarOpen ? <ChevronsLeft /> : <ChevronsRight />}
          </MotionButton>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{isSidebarOpen ? "Close sidebar" : "Open sidebar"}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
