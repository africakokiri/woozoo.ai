"use client";

import { AppSidebarHeader } from "@/components/app-sidebar/app-sidebar-header";
import { ThreadList } from "@/components/thread-list/_thread-list";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/ui/sidebar";

export default function AppSidebar() {
  return (
    <Sidebar className="z-20">
      <SidebarHeader>
        <AppSidebarHeader />
      </SidebarHeader>

      <SidebarContent className="border-y">
        <ThreadList />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
