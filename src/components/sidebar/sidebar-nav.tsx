import { titleVariants } from "@/components/sidebar/sidebar";
import { Button } from "@/ui/button";
import { cn } from "@/utils/tailwind/cn";

import { Search, SquarePen } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export const SidebarNav = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  return (
    <ul className="flex w-full flex-col items-center space-y-1">
      {["New chats", "Search chats"].map((item, i) => (
        <li
          key={`${item}-${i}`}
          className="flex w-full items-center text-sm"
        >
          <Button
            variant="ghost"
            aria-label={!isSidebarOpen ? item : undefined}
            className={cn(
              "flex h-12 w-12 flex-1 items-center justify-start gap-2",
              isSidebarOpen && "h-8"
            )}
          >
            <div>{i === 0 ? <SquarePen aria-hidden={true} /> : <Search aria-hidden={true} />}</div>

            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span
                  key="sidebar-nav"
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="font-normal"
                >
                  {item}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </li>
      ))}
    </ul>
  );
};
