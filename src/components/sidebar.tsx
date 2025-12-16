"use client";

import { useSidebarStore } from "@/utils/zustand/use-sidebar-store";

import * as m from "motion/react-m";
import Image from "next/image";

const Sidebar = () => {
  const { isOpen, toggle } = useSidebarStore();

  return <m.aside></m.aside>;
};

const Header = () => {};

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
