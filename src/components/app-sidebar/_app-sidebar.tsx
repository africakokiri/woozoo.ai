"use client";

import { AppSidebarHeader } from "@/components/app-sidebar/app-sidebar-header";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/ui/sidebar";

export default function AppSidebar() {
  return (
    <Sidebar className="z-20 transition-none *:transition-none">
      <SidebarHeader>
        <AppSidebarHeader />
      </SidebarHeader>

      <SidebarContent className="border-y"></SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
