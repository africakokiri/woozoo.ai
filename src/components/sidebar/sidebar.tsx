"use client";

import { SidebarHeader } from "@/components/sidebar/sidebar-header";
import { SidebarNav } from "@/components/sidebar/sidebar-nav";
import { SidebarUser } from "@/components/sidebar/sidebar-user";
import { cn } from "@/utils/tailwind/cn";

import { type Variants, motion } from "motion/react";
import { useState } from "react";

export const titleVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.1 } },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, delay: 0.1 }
  }
};

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isSidebarOpen ? 289 : 81 }}
      transition={{ type: "spring", stiffness: 350, damping: 40, bounce: 0 }}
      className="bg-sidebar sticky top-0 left-0 flex h-screen shrink-0 flex-col border-r"
    >
      <header className={cn("px-4 pt-4 pb-1", isSidebarOpen && "pb-4")}>
        <SidebarHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </header>

      <nav className="px-4">
        <SidebarNav isSidebarOpen={isSidebarOpen} />
      </nav>

      <footer className="mt-auto p-4">
        <SidebarUser isSidebarOpen={isSidebarOpen} />
      </footer>
    </motion.aside>
  );
}
