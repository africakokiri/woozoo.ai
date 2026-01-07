"use client";

import { useGlobalConfigStore } from "@/shared/libs/zustand/use-global-config-store";
import { Button } from "@/shared/ui/button";
import { motionVars } from "@/widgets/sidebar/model/motion";

import { Search, SquarePen } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export const Nav = () => {
  const { isSidebarOpen } = useGlobalConfigStore();

  return (
    <div className="">
      {["New chat", "Search chats"].map((item, i) => {
        return (
          <Button
            key={item}
            variant="ghost"
            className="flex items-center gap-1 *:stroke-[1.5] [&>svg]:size-5"
          >
            {i === 0 ? <SquarePen /> : <Search />}
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span
                  variants={motionVars}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {item}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        );
      })}
    </div>
  );
};
