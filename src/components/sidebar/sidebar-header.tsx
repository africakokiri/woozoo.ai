import { Button } from "@/ui/button";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { AnimatePresence, type Variants, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { type Dispatch, type SetStateAction } from "react";

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
  return (
    <div className="space-y-4">
      <div className="flex h-12 flex-1 items-center justify-between">
        <Link
          href="/"
          className="fvis flex items-center gap-2"
        >
          <Image
            src="/icons/main.svg"
            alt="WooZoo logo"
            width={48}
            height={48}
            className="size-12 dark:invert"
          />
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.h1
                key="sidebar-title"
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                aria-hidden={!isSidebarOpen}
                className="text-sidebar-foreground text-2xl font-light tracking-tight"
              >
                WooZoo
              </motion.h1>
            )}
          </AnimatePresence>
        </Link>

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

      {!isSidebarOpen && (
        <Button
          aria-label="Close sidebar"
          variant="ghost"
          className="flex h-12 w-12 items-center justify-center"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <ChevronsRight />
        </Button>
      )}
    </div>
  );
};
