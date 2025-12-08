"use client";

import { NavHeader } from "@/components/app-sidebar/nav-header";
import { NavMain } from "@/components/app-sidebar/nav-main";
import { NavUser } from "@/components/app-sidebar/nav-user";

import { motion } from "motion/react";
import { useEffect, useLayoutEffect, useState } from "react";

export default function AppSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const localStorageIsSidebarOpen = localStorage.getItem("open-sidebar") === "true";

      if (isSidebarOpen !== localStorageIsSidebarOpen) setIsSidebarOpen(localStorageIsSidebarOpen);
    }
  }, []);

  useEffect(() => {
    if (isSidebarOpen !== null) localStorage.setItem("open-sidebar", String(isSidebarOpen));
  }, [isSidebarOpen]);

  if (isSidebarOpen === null) return null;

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isSidebarOpen ? 288 : 64
      }}
      transition={{ type: "spring", stiffness: 350, damping: 40, bounce: 0 }}
      className="bg-sidebar sticky top-0 left-0 flex h-screen flex-col border-r"
    >
      <header className="flex w-full items-center justify-between p-4">
        <NavHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </header>

      <nav aria-label="Sidebar menu">
        <NavMain isSidebarOpen={isSidebarOpen} />
      </nav>

      <footer className="mt-auto px-2 py-4">
        <NavUser isSidebarOpen={isSidebarOpen} />
      </footer>
    </motion.aside>
  );
}
