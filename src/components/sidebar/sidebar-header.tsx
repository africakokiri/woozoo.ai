import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
import { Button } from "@/ui/button";
import { cn } from "@/utils/tailwind/cn";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { AnimatePresence, type Variants, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { type Dispatch, type SetStateAction, useState } from "react";

const titleVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, delay: 0.1 }
  }
};

export const SidebarHeader = ({
  isSidebarOpen,
  setIsSidebarOpen
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="flex h-16 items-center">
      <div className="flex h-12 flex-1 items-center justify-between">
        {isHover ? (
          <Button
            aria-label="Open sidebar"
            variant="ghost"
            onMouseLeave={() => setIsHover(false)}
            className="flex h-12 w-12 items-center justify-center"
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
              setIsHover(false);
            }}
          >
            <ChevronsRight aria-hidden={true} />
          </Button>
        ) : (
          <Link
            href="/"
            className="flex h-12 min-w-fit items-center gap-2 p-0"
          >
            <Image
              src="/icons/main.svg"
              alt="WooZoo logo"
              width={48}
              height={48}
              onMouseEnter={() => !isSidebarOpen && setIsHover(true)}
              className="size-12 dark:invert"
            />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span
                  key="sidebar-title"
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  aria-hidden={!isSidebarOpen}
                  className="text-sidebar-foreground text-2xl font-light tracking-tight"
                >
                  WooZoo
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        )}

        {isSidebarOpen && (
          <Button
            aria-label="Close sidebar"
            variant="ghost"
            className="flex h-12 w-12 items-center justify-center"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <ChevronsLeft />
          </Button>
        )}
      </div>
    </div>
  );
};
