"use client";

import { TooltipButton } from "@/ui/tooltip-button";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { type Dispatch, type SetStateAction, useState } from "react";

export const NavHeader = ({
  isSidebarOpen,
  setIsSidebarOpen
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean | null>>;
}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <div className="flex items-center gap-3">
        {isHover ? (
          <TooltipButton
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
              setIsHover(false);
            }}
            className="flex h-12 w-12 items-center justify-center"
            onMouseLeave={() => setIsHover(false)}
            aria-label="Open sidebar"
            tooltipMessage="Open sidebar"
          >
            <ChevronsRight aria-hidden={true} />
          </TooltipButton>
        ) : (
          <Link href="/">
            <Image
              src="/icons/woozoo.svg"
              alt="WooZoo logo"
              width={32}
              height={32}
              onMouseEnter={() => !isSidebarOpen && setIsHover(true)}
              className="min-h-12! min-w-12! dark:invert"
            />
          </Link>
        )}

        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              key="nav-header-logo-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/"
                className="text-lg font-light"
              >
                WooZoo
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isSidebarOpen && (
        <TooltipButton
          aria-label="Close sidebar"
          tooltipMessage="Close sidebar"
          className="flex h-12 w-12 items-center justify-center"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <ChevronsLeft />
        </TooltipButton>
      )}
    </>
  );
};
