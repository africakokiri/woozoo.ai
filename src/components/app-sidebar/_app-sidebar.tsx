"use client";

import { NavHeader } from "@/components/app-sidebar/nav-header";
import { NavMain } from "@/components/app-sidebar/nav-main";
import { NavUser } from "@/components/app-sidebar/nav-user";
import { useSidebarStore } from "@/libs/zustand/store";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function AppSidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <motion.aside
      initial={false}
      animate={{ width: isSidebarOpen ? 288 : 80 }}
      transition={{ type: "spring", stiffness: 350, damping: 40, bounce: 0 }}
      className="bg-sidebar sticky top-0 left-0 flex h-screen shrink-0 flex-col border-r"
    >
      <header className="flex w-full items-center justify-between px-3.5 py-4">
        <NavHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </header>

      <nav aria-label="Sidebar menu">
        <NavMain isSidebarOpen={isSidebarOpen} />
      </nav>

      <footer className="mt-auto px-3.5 py-4">
        <NavUser isSidebarOpen={isSidebarOpen} />{" "}
      </footer>
    </motion.aside>
  );
}
