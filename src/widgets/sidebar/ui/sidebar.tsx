"use client";

import { useGlobalConfigStore } from "@/shared/libs/zustand/use-global-config-store";
import { Header } from "@/widgets/sidebar/ui/header";
import { Nav } from "@/widgets/sidebar/ui/nav";

import { motion } from "motion/react";

const MIN_SIDEBAR_WIDTH = "81px"; // 5rem + 1px(border)
const MAX_SIDEBAR_WIDTH = "289px"; // 18rem + 1px(border)

export default function Sidebar() {
  const { isSidebarOpen, isHydrated } = useGlobalConfigStore();

  if (!isHydrated) return null;

  return (
    <motion.aside
      initial={false}
      animate={isSidebarOpen ? { width: MAX_SIDEBAR_WIDTH } : { width: MIN_SIDEBAR_WIDTH }}
      transition={{ type: "spring", stiffness: 350, damping: 40, bounce: 0 }}
      className="bg-sidebar sticky top-0 left-0 h-dvh space-y-4 border-r p-4"
    >
      {/* 페이지 로고 */}
      <header>
        <Header />
      </header>

      {/* 새로운 채팅, 채팅 검색, 채팅 기록 등*/}
      <nav>
        <Nav />
      </nav>

      {/* 프로필 */}
      <footer></footer>
    </motion.aside>
  );
}
