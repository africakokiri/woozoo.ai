"use client";

import { NavContent } from "@/components/app-sidebar/nav-content";
import { NavHeader } from "@/components/app-sidebar/nav-header";

import { motion } from "motion/react";
import { useState } from "react";

export default function AppSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <motion.aside
      initial={{ width: "288" }}
      animate={{
        width: isSidebarOpen ? 288 : 64
      }}
      transition={{ type: "spring", stiffness: 350, damping: 40, bounce: 0 }}
      className="bg-sidebar border-r"
    >
      <header className="flex w-full items-center justify-between p-4">
        <NavHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </header>

      <nav aria-label="chat menu">
        <NavContent
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </nav>

      <footer></footer>
    </motion.aside>
  );
}
