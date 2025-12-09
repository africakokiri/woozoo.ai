"use client";

import { SidebarHeader } from "@/components/sidebar/sidebar-header";
import { SidebarNav } from "@/components/sidebar/sidebar-nav";

import { motion } from "motion/react";
import { useState } from "react";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isSidebarOpen ? 289 : 81 }}
      transition={{ type: "spring", stiffness: 350, damping: 40, bounce: 0 }}
      className="bg-sidebar sticky top-0 left-0 h-screen shrink-0 border-r"
    >
      <header className="p-4">
        <SidebarHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </header>

      <nav className="px-4">
        <SidebarNav isSidebarOpen={isSidebarOpen} />
      </nav>
      <footer></footer>
    </motion.aside>
  );
}
