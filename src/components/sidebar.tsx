"use client";

import { Button } from "@/ui/button";
import { cn } from "@/utils/tailwind/cn";
import { useGlobalConfigStore } from "@/utils/zustand/use-global-config-store";
import { useSidebarStore } from "@/utils/zustand/use-sidebar-store";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { AnimatePresence, type Variants, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const motionVars: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.1 } },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, delay: 0.1 }
  }
};

const Sidebar = () => {
  const { isOpen } = useSidebarStore();
  const { isHydrated, finishFirstRender } = useGlobalConfigStore();

  useEffect(() => {
    requestAnimationFrame(() => finishFirstRender());
  }, []);

  if (!isHydrated) return null;

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 289 : 81 }}
      transition={{ type: "spring", stiffness: 350, damping: 40, bounce: 0 }}
      className="bg-sidebar sticky top-0 left-0 h-screen border-r"
    >
      <header className={cn("px-4 pt-4 pb-1", isOpen && "pb-4")}>
        <Sidebar.Header />
      </header>
    </motion.aside>
  );
};

const Header = () => {
  const { isOpen, toggle } = useSidebarStore();
  const { isFirstRender } = useGlobalConfigStore();

  return (
    <div className="flex justify-between">
      <motion.div
        initial={isFirstRender ? false : true}
        animate={{
          height: isOpen ? "auto" : "100px",
          marginTop: isOpen ? 0 : 64
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30, bounce: 0 }}
        className={cn("flex h-12 items-center gap-2", !isOpen && "border-y")}
      >
        <Link
          href="/"
          className="focus-visible flex items-center gap-2"
        >
          <Image
            className="min-size-icon shrink-0 dark:invert"
            src="/icons/main.svg"
            alt="Main logo"
            width={48}
            height={48}
          />
          <AnimatePresence>
            {isOpen && (
              <motion.h1
                key="sidebar-header-h1"
                variants={motionVars}
                initial={isFirstRender ? false : "hidden"}
                animate="visible"
                exit="hidden"
                className="text-sidebar-foreground text-2xl font-light tracking-tight"
                aria-hidden={!isOpen}
              >
                WooZoo
              </motion.h1>
            )}
          </AnimatePresence>
        </Link>
      </motion.div>

      <motion.div
        initial={isFirstRender ? false : { x: 0 }}
        animate={{ x: isOpen ? 208 : 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 40, bounce: 0 }}
        className="absolute top-4 left-4"
      >
        <Button
          variant="ghost"
          className="min-size-icon"
          onClick={() => toggle()}
        >
          {isOpen ? <ChevronsLeft /> : <ChevronsRight />}
        </Button>
      </motion.div>
    </div>
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
