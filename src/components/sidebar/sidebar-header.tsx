import { titleVariants } from "@/components/sidebar/sidebar";
import { useFirstRenderStore, useGlobalConfigStore } from "@/libs/zustand/store";
import { Button } from "@/ui/button";
import { cn } from "@/utils/tailwind/cn";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export const SidebarHeader = () => {
  const { isFirstRender } = useFirstRenderStore();

  const { isSidebarOpen, setIsSidebarOpen } = useGlobalConfigStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="fvis flex items-center gap-2"
        >
          <motion.div
            initial={isFirstRender ? false : true}
            animate={{
              height: isSidebarOpen ? "auto" : "100px",
              marginTop: isSidebarOpen ? 0 : 64
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            data-open={isSidebarOpen}
            className={cn(
              "flex h-12 items-center gap-2",
              isSidebarOpen ? "mt-0" : "my-4 mt-16 h-full border-y!"
            )}
          >
            <Image
              src="/icons/main.svg"
              alt="WooZoo logo"
              width={48}
              height={48}
              className="min-w-12! shrink-0 dark:invert"
            />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.h1
                  key="sidebar-header"
                  variants={titleVariants}
                  initial={isFirstRender ? false : "hidden"}
                  animate="visible"
                  exit="hidden"
                  aria-hidden={!isSidebarOpen}
                  className="text-sidebar-foreground top-6 left-[72px] text-2xl font-light
tracking-tight"
                >
                  WooZoo
                </motion.h1>
              )}
            </AnimatePresence>
          </motion.div>
        </Link>

        <motion.div
          initial={isFirstRender ? false : { x: 0 }}
          animate={{ x: isSidebarOpen ? 208 : 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 40, bounce: 0 }}
          className="absolute top-4 left-4"
        >
          <Button
            aria-label="Close sidebar"
            variant="ghost"
            className="flex h-12 w-12 items-center justify-center"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <ChevronsLeft /> : <ChevronsRight />}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
