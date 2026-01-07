"use client";

import { motion } from "motion/react";

const MIN_SIDEBAR_WIDTH = "81px"; // 5rem + 1px(border)
const MAX_SIDEBAR_WIDTH = "289px"; // 18rem + 1px(border)

export default function Sidebar() {
  return (
    <motion.aside
      initial={false}
      className="bg-sidebar border-r"
    >
      {/* 페이지 로고 */}
      <header></header>

      {/* 새로운 채팅, 채팅 검색, 채팅 기록 등*/}
      <nav></nav>

      {/* 프로필 */}
      <footer></footer>
    </motion.aside>
  );
}
